import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import profileIcon from "../assets/profile.png";

const ProfilePhotosLayout = ({ photos }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [popupImage, setPopupImage] = useState(null);

  // Set default photo if no photos available
  const photoArray = photos && photos.length > 0 ? photos : [profileIcon];

  const handleThumbnailClick = (index) => {
    setCurrentPhoto(index);
  };

  const handleImageClick = (image) => {
    setPopupImage(image);
    setIsImagePopupOpen(true);
  };
  
  const handleNextPhoto = () => {
    setCurrentPhoto((prev) => (prev === photoArray.length - 1 ? 0 : prev + 1));
  };
  
  const handlePrevPhoto = () => {
    setCurrentPhoto((prev) => (prev === 0 ? photoArray.length - 1 : prev - 1));
  };
  
  const handlePopupNavigation = (direction) => {
    const currentIndex = photoArray.findIndex(photo => photo === popupImage);
    if (currentIndex !== -1) {
      const newIndex = direction === 'next'
        ? (currentIndex === photoArray.length - 1 ? 0 : currentIndex + 1)
        : (currentIndex === 0 ? photoArray.length - 1 : currentIndex - 1);
      setPopupImage(photoArray[newIndex]);
    }
  };

  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-lg">
        {/* Main large photo on the left - MODIFIED TO SHOW ENTIRE IMAGE */}
        <div className="w-full md:w-3/5 relative group flex items-center justify-center bg-gray-100 rounded-xl" style={{ height: "400px" }}>
          <motion.img
            src={photoArray[currentPhoto]}
            alt="Profile"
            className="max-w-full max-h-full object-contain rounded-xl shadow-lg cursor-pointer"
            key={currentPhoto}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleImageClick(photoArray[currentPhoto])}
          />
          
          {/* Navigation arrows */}
          {photoArray.length > 1 && (
            <>
              <button 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPhoto();
                }}
              >
                <FaChevronLeft size={20} />
              </button>
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPhoto();
                }}
              >
                <FaChevronRight size={20} />
              </button>
            </>
          )}
          
          {/* Photo counter */}
          {photoArray.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
              {currentPhoto + 1} / {photoArray.length}
            </div>
          )}
        </div>

        {/* Grid of smaller photos on the right */}
        <div className="w-full md:w-2/5">
          <h3 className="text-[#4F2F1D] font-medium mb-2 text-lg">Photo Gallery</h3>
          <div className="grid grid-cols-2 gap-2">
            {photoArray.map((photo, index) => (
              <div
                key={index}
                className={`relative rounded-lg overflow-hidden cursor-pointer transform transition-all duration-200 ${
                  index === currentPhoto ? "ring-2 ring-[#990000]" : "hover:brightness-90"
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <div className="bg-gray-100 h-[120px] flex items-center justify-center">
                  <img
                    src={photo}
                    alt={`Profile ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                {index === currentPhoto && (
                  <div className="absolute inset-0 bg-[#990000]/10 pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SIMPLIFIED POPUP FOR GUARANTEED FULL IMAGE VISIBILITY */}
      {isImagePopupOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setIsImagePopupOpen(false)}
        >
          <div className="relative flex items-center justify-center h-screen w-screen">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full z-50"
              onClick={() => setIsImagePopupOpen(false)}
            >
              <FaTimes size={20} />
            </button>
            
            {/* Simple image display - guaranteed to show the full image */}
            <img
              src={popupImage}
              alt="Full view"
              className="max-h-[85vh] max-w-[85vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Navigation buttons */}
            {photoArray.length > 1 && (
              <>
                <button 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePopupNavigation('prev');
                  }}
                >
                  <FaChevronLeft size={20} />
                </button>
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePopupNavigation('next');
                  }}
                >
                  <FaChevronRight size={20} />
                </button>
              </>
            )}
            
            {/* Photo indicator dots */}
            {photoArray.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/50 rounded-full p-2 px-3 z-50">
                {photoArray.map((photo, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${popupImage === photo ? 'bg-white' : 'bg-white/50'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPopupImage(photo);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotosLayout;