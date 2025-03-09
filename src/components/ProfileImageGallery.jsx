import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ Import AuthContext
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlus, FaTrash } from "react-icons/fa";

const API_URL = "https://backend-nm1z.onrender.com/api/users"; // Backend API base URL

const ProfileImageGallery = () => {
  const { user, isAuthenticated } = useAuth(); // ✅ Get user info from AuthContext
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (user && isAuthenticated) {
      fetchImages();
    }
  }, [user, isAuthenticated]);

  const fetchImages = async () => {
    if (!user?._id) return; // Wait until user ID is available

    try {
      const response = await fetch(`${API_URL}/${user._id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
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

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user?._id) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("profile_pictures", file);

    try {
      const response = await fetch(`${API_URL}/${user._id}/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (data.profile_pictures) {
        setImages(data.profile_pictures);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = async (index) => {
    if (!window.confirm("Are you sure you want to delete this image?") || !user?._id) return;

    const imageToDelete = images[index];
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/${user._id}/delete-profile-picture`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ imagePath: imageToDelete }),
      });

      if (response.ok) {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-2 py-6 bg-white rounded-lg shadow-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Photos</h2>
        <label className="cursor-pointer px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg flex items-center">
          <FaPlus className="mr-2" /> {loading ? "Uploading..." : "Add Photo"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInputChange}
            disabled={loading}
          />
        </label>
      </div>

      {images.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          <Slider ref={sliderRef} {...{
            dots: true,
            infinite: images.length > 1,
            speed: 500,
            slidesToShow: Math.min(3, Math.max(1, images.length)),
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true,
            centerMode: images.length > 1,
            centerPadding: "0px",
            responsive: [
              { breakpoint: 1024, settings: { slidesToShow: Math.min(2, Math.max(1, images.length)), centerMode: images.length > 1 } },
              { breakpoint: 640, settings: { slidesToShow: 1, centerMode: images.length > 1, centerPadding: "30px" } },
            ],
          }}>
            {images.map((image, index) => (
              <div key={index} className="px-2">
                <div className="relative group h-[280px] mx-auto w-[220px] overflow-hidden rounded-md border border-gray-200">
                  <img src={image} alt={`Profile image ${index + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
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
              <button onClick={() => sliderRef.current?.slickPrev()} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-sm">
                Previous
              </button>
              <button onClick={() => sliderRef.current?.slickNext()} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-sm">
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
          <label className="cursor-pointer px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg flex items-center">
            <FaPlus className="mr-2" /> Upload First Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
              disabled={loading}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ProfileImageGallery;
