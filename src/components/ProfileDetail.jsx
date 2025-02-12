import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import dummyData from "./dummyData";
import Footer from "./Footer"; // Importing the footer component
import logoSrc from '../assets/logo.png'; // Logo path
import profileIcon from '../assets/profile.png'; // Profile icon path
import {
  FaHeart, FaUser, FaGraduationCap, FaPhone, FaUsers, FaTimes, FaArrowLeft,
} from "react-icons/fa";
import Slider from "react-slick"; // Importing react-slick for the slideshow
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from '../context/AuthContext'; // Importing AuthContext

// Custom Arrow Components
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
};

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const profile = dummyData.find((item) => item.id === parseInt(id));
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [popupImage, setPopupImage] = useState(null);
  const { scrollYProgress } = useScroll();
  const { isAuthenticated, toggleLoginModal, login } = useAuth();

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Profile not found
      </div>
    );
  }

  const { basicDetails, horoscopeDetails, educationAndWorking, contactDetails, familyDetails } = profile;

  // Profile Image Fallback (Random Image if Missing)
  const profileImage = profile.image || "https://randomuser.me/api/portraits/men/1.jpg";

  // Dynamic Scroll Effects for Boxes
  const imageSize = useTransform(scrollYProgress, [0, 0.3], ["180px", "90px"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);
  const boxScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]); // Minimizing effect

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handleImageClick = (image) => {
    setPopupImage(image);
    setIsImagePopupOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-[#f7f2e9] to-[#dbeaf2] relative">
      
      {/* Header */}
      <div className="w-full p-4 bg-[#4F2F1D] shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <img src={logoSrc} alt="Punjabi Matrimony Logo" className="h-16" />
          </div>
          {/* Navigation Links */}
          <nav className="flex space-x-4">
            <button onClick={() => navigate('/')} className="text-white hover:text-gray-400 transition duration-300">Home</button>
            <button onClick={() => navigate('/about')} className="text-white hover:text-gray-400 transition duration-300">About Us</button>
            <button onClick={() => navigate('/services')} className="text-white hover:text-gray-400 transition duration-300">Services</button>
            <button onClick={() => navigate('/contact')} className="text-white hover:text-gray-400 transition duration-300">Contact</button>
          </nav>
          {/* Buttons */}
          <div>
            {isAuthenticated ? (
              <img
                src={profileIcon}
                alt="Profile"
                className="h-10 w-10 rounded-full cursor-pointer"
                onClick={() => navigate('/profile')}
              />
            ) : (
              <>
                <button className="bg-transparent border-2 border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300" onClick={() => toggleLoginModal()}>Login</button>
                <button className="ml-4 bg-transparent border-2 border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300" onClick={() => toggleLoginModal()}>Sign Up</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button
        className="absolute top-26 left-4 bg-[#D4AF37] hover:bg-[#c8a236] text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-lg"
        onClick={() => navigate("/findpartner")}
      >
        <FaArrowLeft />
      </button>

      {/* Profile Picture */}
      <motion.img
        src={profileImage}
        alt={profile.name}
        className="rounded-full border-4 border-[#D4AF37] cursor-pointer mx-auto mt-20 mb-8 shadow-xl" // Reduced margin-top
        style={{
          width: imageSize,
          height: imageSize,
          opacity: imageOpacity,
          transition: "all 0.3s ease-in-out",
        }}
        onClick={() => handleImageClick(profileImage)}
      />

      {/* Enlarged Image Popup */}
      {isImagePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-2xl border border-gray-300 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 text-xl"
              onClick={() => setIsImagePopupOpen(false)}
            >
              <FaTimes />
            </button>
            <img 
              src={popupImage} 
              alt="Enlarged" 
              className="rounded-lg w-[400px] h-auto shadow-lg" 
            />
          </div>
        </div>
      )}

      {/* Profile Name & About */}
      <h2 className="text-5xl font-bold text-center text-[#4F2F1D] mb-4 drop-shadow-md">
        {profile.name}
      </h2>
      <p className="text-center text-[#D4AF37] italic text-xl mb-16 px-6">
        "{profile.aboutMe}"
      </p>

      {/* Slideshow of Images */}
      <div className="flex justify-center mb-8">
        {profile.images && profile.images.length > 0 ? (
          <div className="w-3/5">
            <Slider {...settings}>
              {profile.images.map((image, index) => (
                <div key={index} className="px-2">
                  <img
                    src={image}
                    alt={`Profile ${index + 1}`}
                    className="w-48 h-48 rounded-lg shadow-md cursor-pointer"
                    onClick={() => handleImageClick(image)}
                  />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <p className="text-gray-500">No additional images available</p>
        )}
      </div>

      {/* Profile Details Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full px-16 mb-20">
        
        {/* Universal Box Component for Sections */}
        {[
          { title: "Basic Details", icon: FaUser, data: basicDetails, bg: "bg-[#ffe8b3]" },
          { title: "Horoscope", icon: FaHeart, data: horoscopeDetails, bg: "bg-[#c3e6cb]" },
          { title: "Education & Work", icon: FaGraduationCap, data: educationAndWorking, bg: "bg-[#e0f7fa]" },
          { title: "Contact Details", icon: FaPhone, data: contactDetails, bg: "bg-[#dbeaf2]" },
          { title: "Family Details", icon: FaUsers, data: familyDetails, bg: "bg-[#f3e5f5]" },
        ].map(({ title, icon: Icon, data, bg }, index) => (
          <motion.div 
            key={index} 
            className={`p-8 ${bg} rounded-xl shadow-lg border border-gray-200 transition-all`}
            style={{ scale: boxScale }} // Apply scrolling minimization effect
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center text-[#4F2F1D]">
              <Icon className="mr-2 text-[#D4AF37]" /> {title}
            </h3>
            <div className="space-y-2">
              {Object.entries(data).map(([key, value]) => (
                key !== "referenceId" && (
                  <p key={key} className="text-lg">
                    <strong className="text-[#4F2F1D] capitalize">
                      {key.replace(/([A-Z])/g, " $1")}:
                    </strong> 
                    <span className="text-gray-700 ml-2">
                      {value || "N/A"}
                    </span>
                  </p>
                )
              ))}
            </div>
          </motion.div>
        ))}

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default ProfileDetail;