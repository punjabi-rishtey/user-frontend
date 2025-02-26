import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import dummyData from "./dummyData";
import Footer from "./Footer";
import Header from "./Header";
import {
  FaHeart,
  FaUser,
  FaGraduationCap,
  FaPhone,
  FaUsers,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import Slider from "react-slick"; // Importing react-slick for the slideshow
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "../context/AuthContext"; // Importing AuthContext

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Profile not found
      </div>
    );
  }

  const {
    basicDetails,
    horoscopeDetails,
    educationAndWorking,
    contactDetails,
    familyDetails,
  } = profile;

  // Profile Image Fallback (Random Image if Missing)
  const profileImage =
    profile.image || "https://randomuser.me/api/portraits/men/1.jpg";

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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleImageClick = (image) => {
    setPopupImage(image);
    setIsImagePopupOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F2]">
      <Header />

      {/* Back Button */}
      <div className="container mx-auto px-6 mt-8">
        <button
          className="bg-[#4F2F1D] hover:bg-[#6B4132] text-[#E5D3C8] font-bold py-2 px-4 rounded-full transition duration-300 shadow-lg flex items-center"
          onClick={() => navigate("/findpartner")}
          style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
        >
          <FaArrowLeft className="mr-2" /> Back to Search
        </button>
      </div>

      {/* Profile Picture */}
      <motion.img
        src={profileImage}
        alt={profile.name}
        className="rounded-full border-4 border-[#4F2F1D] cursor-pointer mx-auto mt-12 mb-8 shadow-xl"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#F5EDE7] p-4 rounded-lg shadow-2xl border border-[#E5D3C8] relative">
            <button
              className="absolute top-2 right-2 text-[#4F2F1D] text-xl hover:text-[#6B4132] transition-colors duration-300"
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
      <h2
        className="text-5xl font-bold text-center text-[#4F2F1D] mb-4"
        style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
      >
        {profile.name}
      </h2>
      <p
        className="text-center text-[#6B4132] italic text-xl mb-16 px-6"
        style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
      >
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
                    className="w-48 h-48 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300"
                    onClick={() => handleImageClick(image)}
                  />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <p
            className="text-[#6B4132]"
            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
          >
            No additional images available
          </p>
        )}
      </div>

      {/* Profile Details Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full px-16 mb-20">
        {[
          {
            title: "Basic Details",
            icon: FaUser,
            data: basicDetails,
            bg: "bg-[#F5EDE7]",
          },
          {
            title: "Horoscope",
            icon: FaHeart,
            data: horoscopeDetails,
            bg: "bg-[#F5EDE7]",
          },
          {
            title: "Education & Work",
            icon: FaGraduationCap,
            data: educationAndWorking,
            bg: "bg-[#F5EDE7]",
          },
          {
            title: "Contact Details",
            icon: FaPhone,
            data: contactDetails,
            bg: "bg-[#F5EDE7]",
          },
          {
            title: "Family Details",
            icon: FaUsers,
            data: familyDetails,
            bg: "bg-[#F5EDE7]",
          },
        ].map(({ title, icon: Icon, data, bg }, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className={`p-8 ${bg} rounded-xl shadow-lg border border-[#E5D3C8] transition-all`}
          >
            <h3
              className="text-2xl mb-4 flex items-center text-[#4F2F1D]"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
              }}
            >
              <Icon className="mr-2 text-[#4F2F1D]" /> {title}
            </h3>
            <div className="space-y-2">
              {Object.entries(data).map(
                ([key, value]) =>
                  key !== "referenceId" && (
                    <p
                      key={key}
                      className="text-lg"
                      style={{
                        fontFamily: "'Modern Era', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      <strong className="text-[#4F2F1D] capitalize">
                        {key.replace(/([A-Z])/g, " $1")}:
                      </strong>
                      <span className="text-[#6B4132] ml-2">
                        {value || "N/A"}
                      </span>
                    </p>
                  )
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

// Add cardVariants for consistent hover animation
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: {
    scale: 1.05,
    backgroundColor: "#E5D3C8", // Updated to match membership page hover color
    transition: { duration: 0.3 }, // Updated to match membership page transition
  },
};

export default ProfileDetail;
