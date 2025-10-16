import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlus, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { apiUrl } from "../config/constants";
const API_URL = apiUrl("/api/users");

const ProfileImageGallery = () => {
  const { user, isAuthenticated, refreshUser } = useAuth();
  const [operation, setOperation] = useState(null);
  const [images, setImages] = useState([]);
  const sliderRef = useRef(null);

  // Image refs
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const previewCanvasRef = useRef(null);

  // Cropping states
  const [showCropper, setShowCropper] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [scale, setScale] = useState(1);
  const [minScale, setMinScale] = useState(0.1);
  const [translatePosition, setTranslatePosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Constants for the crop area
  const CROP_WIDTH = 280;
  const CROP_HEIGHT = 370;

  useEffect(() => {
    if (user?._id && isAuthenticated) {
      fetchImages();
    }
  }, [user, isAuthenticated]);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (originalImage && originalImage.startsWith("blob:")) {
        URL.revokeObjectURL(originalImage);
      }
    };
  }, [originalImage]);

  // Update preview whenever scale or position changes
  useEffect(() => {
    updatePreview();
  }, [scale, translatePosition, originalImage]);

  // Mouse and touch event handlers
  useEffect(() => {
    if (!showCropper) return;

    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - startPosition.x;
        const deltaY = e.clientY - startPosition.y;

        setTranslatePosition((prev) => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));

        setStartPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, startPosition, showCropper]);

  const updatePreview = () => {
    if (!previewCanvasRef.current || !imageRef.current || !originalImage)
      return;

    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the center of the crop area
    const cropAreaCenterX = CROP_WIDTH / 2;
    const cropAreaCenterY = CROP_HEIGHT / 2;

    // Calculate how to position the image relative to the center of the crop area
    ctx.save();
    ctx.translate(cropAreaCenterX, cropAreaCenterY);
    ctx.scale(scale, scale);
    ctx.translate(translatePosition.x / scale, translatePosition.y / scale);
    ctx.translate(-imageRef.current.width / 2, -imageRef.current.height / 2);

    // Draw the image
    ctx.drawImage(imageRef.current, 0, 0);
    ctx.restore();
  };

  const fetchImages = async () => {
    if (!user?._id) return;
    try {
      const response = await fetch(`${API_URL}/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.profile_pictures) {
        setImages(data.profile_pictures);
      }
    } catch (error) {
      console.error("Error fetching profile images:", error);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file || !user?._id) return;

    // Validate file type
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Only JPG, JPEG, or PNG files are allowed!");
      return;
    }

    // Store original file
    setOriginalFile(file);

    // Create object URL
    const objectUrl = URL.createObjectURL(file);
    setOriginalImage(objectUrl);

    // Reset transform values - we'll set proper scale when image loads
    setTranslatePosition({ x: 0, y: 0 });

    // Show cropper
    setShowCropper(true);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    setStartPosition({
      x: touch.clientX,
      y: touch.clientY,
    });
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      const touch = e.touches[0];

      const deltaX = touch.clientX - startPosition.x;
      const deltaY = touch.clientY - startPosition.y;

      setTranslatePosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      setStartPosition({
        x: touch.clientX,
        y: touch.clientY,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleZoomChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };

  const handleCancelCrop = () => {
    if (originalImage && originalImage.startsWith("blob:")) {
      URL.revokeObjectURL(originalImage);
    }
    setShowCropper(false);
    setOriginalImage(null);
    setOriginalFile(null);
    setScale(1);
    setMinScale(0.1);
    setTranslatePosition({ x: 0, y: 0 });
  };

  const getCroppedImageBlob = () => {
    return new Promise((resolve, reject) => {
      try {
        if (!imageRef.current || !originalImage) {
          reject(new Error("Image not loaded"));
          return;
        }

        // Create an offscreen canvas for the final cropped image
        const canvas = document.createElement("canvas");
        canvas.width = CROP_WIDTH;
        canvas.height = CROP_HEIGHT;

        const ctx = canvas.getContext("2d");

        // Calculate the center of the crop area
        const cropAreaCenterX = CROP_WIDTH / 2;
        const cropAreaCenterY = CROP_HEIGHT / 2;

        // Position the image exactly like in the preview
        ctx.save();
        ctx.translate(cropAreaCenterX, cropAreaCenterY);
        ctx.scale(scale, scale);
        ctx.translate(translatePosition.x / scale, translatePosition.y / scale);
        ctx.translate(
          -imageRef.current.width / 2,
          -imageRef.current.height / 2
        );

        // Draw the image
        ctx.drawImage(imageRef.current, 0, 0);
        ctx.restore();

        // Convert canvas to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to create blob"));
              return;
            }
            resolve(blob);
          },
          "image/jpeg",
          0.95
        );
      } catch (error) {
        reject(error);
      }
    });
  };

  const uploadCroppedImage = async () => {
    if (!originalFile || !user?._id) return;

    setIsSaving(true);
    setOperation("uploading");
    try {
      // Get cropped image blob
      const croppedImageBlob = await getCroppedImageBlob();

      // Create file from blob
      const croppedFile = new File([croppedImageBlob], originalFile.name, {
        type: originalFile.type,
      });

      // Upload using FormData
      const formData = new FormData();
      formData.append("profile_pictures", croppedFile);

      const response = await fetch(`${API_URL}/${user._id}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (data.profile_pictures) {
        setImages(
          data.profile_pictures.map((img) =>
            img.startsWith("http") ? img : `https://${img}`
          )
        );
        // Refresh user data
        await refreshUser();
      }
    } catch (error) {
      console.error("Error uploading cropped image:", error);
    } finally {
      // Clean up
      if (originalImage && originalImage.startsWith("blob:")) {
        URL.revokeObjectURL(originalImage);
      }
      setOperation(null);
      setShowCropper(false);
      setOriginalImage(null);
      setOriginalFile(null);
      setScale(1);
      setMinScale(0.1);
      setTranslatePosition({ x: 0, y: 0 });
      setIsSaving(false);
    }
  };

  const handleRemoveImage = async (index) => {
    if (
      !window.confirm("Are you sure you want to delete this image?") ||
      !user?._id
    )
      return;

    setOperation("deleting");
    const imageToDelete = images[index];

    try {
      const response = await fetch(`${API_URL}/${user._id}/delete-picture`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ imagePath: imageToDelete }),
      });

      if (response.ok) {
        setImages((prev) => prev.filter((_, i) => i !== index));
        await refreshUser();
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setOperation(null);
    }
  };

  let addPhotoText = "Add Photo";
  if (operation === "uploading") addPhotoText = "Uploading...";
  else if (operation === "deleting") addPhotoText = "Deleting...";

  return (
    <div className="container mx-auto px-2 py-6 bg-white rounded-lg shadow-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Photos</h2>

        <label className="cursor-pointer px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg flex items-center">
          <FaPlus className="mr-2" />
          {addPhotoText}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInputChange}
            disabled={
              operation === "uploading" ||
              operation === "deleting" ||
              showCropper
            }
          />
        </label>
      </div>

      {/* Image Cropping Modal */}
      {showCropper && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 md:p-6 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Crop Your Photo</h3>
              <button
                onClick={handleCancelCrop}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            {/* Cropper Layout */}
            <div className="flex flex-col md:flex-row gap-6 mb-4 flex-1 overflow-auto min-h-0">
              {/* Main crop area */}
              <div className="relative flex-1 flex items-center justify-center bg-gray-600">
                {/* Invisible image for calculations */}
                {originalImage && (
                  <img
                    ref={imageRef}
                    src={originalImage}
                    alt=""
                    className="hidden"
                    onLoad={() => {
                      // Calculate the initial scale to fit the entire image
                      if (imageRef.current) {
                        const imgWidth = imageRef.current.width;
                        const imgHeight = imageRef.current.height;

                        // Calculate scale to fit image within crop area
                        // while maintaining aspect ratio
                        const scaleX = CROP_WIDTH / imgWidth;
                        const scaleY = CROP_HEIGHT / imgHeight;

                        // Use the smaller scale to ensure the entire image fits
                        const initialScale = Math.min(scaleX, scaleY) * 0.95; // 95% to add a small margin

                        // Set as minimum scale
                        setMinScale(initialScale);

                        // Start with this scale
                        setScale(initialScale);

                        // Update preview after setting initial scale
                        updatePreview();
                      }
                    }}
                  />
                )}

                {/* Visible crop area */}
                <div
                  className="relative w-[280px] h-[370px] overflow-hidden bg-gray-800 border-2 border-white"
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                >
                  {/* Custom canvas preview inside the crop area */}
                  <canvas
                    ref={previewCanvasRef}
                    width={CROP_WIDTH}
                    height={CROP_HEIGHT}
                    className="w-full h-full cursor-move"
                  />

                  {/* Grid overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Rule of thirds */}
                    <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white opacity-30"></div>
                    <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white opacity-30"></div>
                    <div className="absolute top-1/3 left-0 right-0 h-px bg-white opacity-30"></div>
                    <div className="absolute top-2/3 left-0 right-0 h-px bg-white opacity-30"></div>

                    {/* Border */}
                    <div className="absolute inset-0 border border-white opacity-50"></div>
                  </div>
                </div>

                {/* Zoom control */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow flex items-center space-x-2 z-10">
                  <span className="text-sm">-</span>
                  <input
                    type="range"
                    min={minScale}
                    max="3"
                    step="0.01"
                    value={scale}
                    onChange={handleZoomChange}
                    className="w-32"
                  />
                  <span className="text-sm">+</span>
                </div>
              </div>

              {/* Preview */}
              <div className="flex flex-col">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                <div className="bg-gray-100 p-2 rounded flex justify-center items-center h-[280px] w-[220px] overflow-hidden">
                  <div className="w-full h-full overflow-hidden">
                    <canvas
                      width={CROP_WIDTH}
                      height={CROP_HEIGHT}
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url(${previewCanvasRef.current?.toDataURL()})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Drag to adjust or use the slider to zoom
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-auto">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                onClick={handleCancelCrop}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg flex items-center"
                onClick={uploadCroppedImage}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaCheck className="mr-2" />
                    Save Photo
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Gallery */}
      {images.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          <Slider
            ref={sliderRef}
            dots={true}
            infinite={images.length > 1}
            speed={500}
            slidesToShow={Math.min(3, Math.max(1, images.length))}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={3000}
            pauseOnHover={true}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: Math.min(2, Math.max(1, images.length)),
                  centerMode: images.length > 1,
                  centerPadding: "0px",
                },
              },
              {
                breakpoint: 640,
                settings: {
                  slidesToShow: 1,
                  centerMode: false,
                  centerPadding: "0px",
                },
              },
            ]}
          >
            {images.map((image, index) => (
              <div key={index} className="px-2">
                <div className="relative group h-[280px] mx-auto w-[220px] overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={image}
                    alt={`Profile image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        disabled={
                          operation === "uploading" || operation === "deleting"
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 bg-[#B31312] text-white text-xs px-2 py-1 rounded-full">
                      Profile Photo
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Slider>

          {images.length > 1 && (
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => sliderRef.current?.slickPrev()}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-sm"
              >
                Previous
              </button>
              <button
                onClick={() => sliderRef.current?.slickNext()}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-sm"
              >
                Next
              </button>
            </div>
          )}

          {images.length > 0 && (
            <div className="text-center mt-4 text-gray-500 text-sm">
              {images.length} photos
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
          <p className="text-gray-600 mb-4">No photos uploaded yet</p>
        </div>
      )}
    </div>
  );
};

export default ProfileImageGallery;
