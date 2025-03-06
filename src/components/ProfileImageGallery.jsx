import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const ProfileImageGallery = ({
  images = [],
  onAddImage,
  onRemoveImage,
  onEditImage,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);

  // Reset activeSlide when images change to prevent out-of-bounds index
  useEffect(() => {
    if (activeSlide >= images.length) {
      setActiveSlide(Math.max(0, images.length - 1));
    }
  }, [images, activeSlide]);

  // Slider settings with auto-scroll enabled
  const settings = {
    dots: true,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: Math.min(3, Math.max(1, images.length)),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    beforeChange: (current, next) => setActiveSlide(next),
    centerMode: images.length > 1,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, Math.max(1, images.length)),
          centerMode: images.length > 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: images.length > 1,
          centerPadding: "30px",
        },
      },
    ],
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file && onAddImage) {
      onAddImage(file);
    }
    // Reset file input
    e.target.value = null;
  };

  return (
    <div className="container mx-auto px-2 py-6 bg-white rounded-lg shadow-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Photos</h2>
        <label className="cursor-pointer px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg flex items-center">
          <FaPlus className="mr-2" /> Add Photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInputChange}
          />
        </label>
      </div>

      {images.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          <Slider ref={sliderRef} {...settings}>
            {images.map((image, index) => (
              <div key={index} className="px-2">
                <div className="relative group h-[280px] mx-auto w-[220px] overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt={`Profile image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => onEditImage && onEditImage(index)}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onRemoveImage && onRemoveImage(index)}
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

          {/* Navigation controls for more control */}
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

          {/* Image count indicator */}
          {images.length > 0 && (
            <div className="text-center mt-4 text-gray-500 text-sm">
              {Math.min(activeSlide + 1, images.length)} of {images.length}{" "}
              photos
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
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ProfileImageGallery;
