import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
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
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import profileIcon from "../assets/profile.png";


// Custom Arrow Components for the slider
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

// Define a vibrant color palette for different card types
const cardColorSchemes = {
  basicDetails: {
    bg: "#E3F2FD", // Light blue
    border: "#90CAF9",
    title: "#1565C0",
    icon: "#1565C0",
    label: "#0D47A1",
    value: "#1976D2"
  },
  lifestyle: {
    bg: "#F3E5F5", // Light purple
    border: "#CE93D8",
    title: "#7B1FA2",
    icon: "#7B1FA2",
    label: "#4A148C",
    value: "#8E24AA"
  },
  horoscope: {
    bg: "#FFF3E0", // Light orange
    border: "#FFCC80",
    title: "#E65100",
    icon: "#E65100",
    label: "#BF360C",
    value: "#EF6C00"
  },
  education: {
    bg: "#E8F5E9", // Light green
    border: "#A5D6A7",
    title: "#2E7D32",
    icon: "#2E7D32",
    label: "#1B5E20",
    value: "#388E3C"
  },
  profession: {
    bg: "#E0F7FA", // Light cyan
    border: "#80DEEA",
    title: "#00838F",
    icon: "#00838F",
    label: "#006064",
    value: "#0097A7"
  },
  family: {
    bg: "#FFF8E1", // Light amber
    border: "#FFE082",
    title: "#FF8F00",
    icon: "#FF8F00",
    label: "#FF6F00",
    value: "#FFA000"
  }
};

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [popupImage, setPopupImage] = useState(null);
  const { scrollYProgress } = useScroll();

  // Dynamic Scroll Effects for Boxes
  const imageSize = useTransform(scrollYProgress, [0, 0.3], ["180px", "90px"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication required');
        }

        const response = await axios.get(`https://backend-nm1z.onrender.com/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setProfileData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data. Please try again later.');
        if (err.message === 'Authentication required') {
          navigate('/login', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfileData();
    }
  }, [id, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleImageClick = (image) => {
    setPopupImage(image);
    setIsImagePopupOpen(true);
  };

  // Format values for better display
  const formatValue = (value) => {
    if (value === undefined || value === null) return 'Not specified';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (value === '') return 'Not specified';
    
    // Format snake_case to Title Case
    if (typeof value === 'string' && value.includes('_')) {
      return value.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    
    return value;
  };

  // Get slides to show based on image count
  const getSlidesToShow = (imageCount) => {
    if (imageCount >= 3) return 3;
    if (imageCount === 2) return 2;
    return 1;
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: profileData?.profile_pictures ? getSlidesToShow(profileData.profile_pictures.length) : 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCF9F2] flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-[#4F2F1D] text-xl">Loading profile data...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FCF9F2] flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-[#990000]">Error</h2>
            <p className="mb-6">{error}</p>
            <div className="flex gap-4">
              <button
                className="bg-[#4F2F1D] hover:bg-[#6B4132] text-white font-bold py-2 px-4 rounded-md transition duration-300"
                onClick={handleGoBack}
              >
                Go Back
              </button>
              <button
                className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded-md transition duration-300"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-[#FCF9F2] flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-[#4F2F1D] text-xl">No profile data found.</div>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return 'Not specified';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Organize profile data into sections for display
  const basicDetails = {
    'Age': calculateAge(profileData.dob),
    'Date of Birth': formatDate(profileData.dob),
    'Gender': formatValue(profileData.gender),
    'Religion': formatValue(profileData.religion),
    'Marital Status': formatValue(profileData.marital_status),
    'Email': profileData.email || 'Not specified',
    'Mobile': profileData.mobile || 'Not specified'
  };

  // Physical and lifestyle information
  const lifestyleDetails = {
    'Physical Disability': profileData.physical_attributes?.physical_disability ? 'Yes' : 'No',
    'Smoke': profileData.lifestyle?.smoke ? 'Yes' : 'No',
    'Drink': profileData.lifestyle?.drink ? 'Yes' : 'No',
    'NRI Status': profileData.lifestyle?.nri_status ? 'Yes' : 'No'
  };

  // Astrology details
  const astrologyDetails = {
    'Manglik': profileData.mangalik ? 'Yes' : 'No',
    ...profileData.astrology_details
  };
  
  // Education and profession details
  const educationDetails = {};
  if (profileData.education_details) {
    if (profileData.education_details.education_level) {
      educationDetails['Education Level'] = profileData.education_details.education_level;
    }
    if (profileData.education_details.education_field) {
      educationDetails['Field of Study'] = profileData.education_details.education_field;
    }
    if (profileData.education_details.college_details?.name) {
      educationDetails['College'] = profileData.education_details.college_details.name;
    }
    if (profileData.education_details.college_details?.city) {
      educationDetails['College City'] = profileData.education_details.college_details.city;
    }
    if (profileData.education_details.school_details?.name) {
      educationDetails['School'] = profileData.education_details.school_details.name;
    }
  }

  // Profession details
  const professionDetails = {};
  if (profileData.profession_details) {
    if (profileData.profession_details.occupation) {
      professionDetails['Occupation'] = profileData.profession_details.occupation;
    }
    if (profileData.profession_details.annual_income) {
      professionDetails['Annual Income'] = profileData.profession_details.annual_income;
    }
    if (profileData.profession_details.company) {
      professionDetails['Company'] = profileData.profession_details.company;
    }
    if (profileData.profession_details.work_address?.city) {
      professionDetails['Work City'] = profileData.profession_details.work_address.city;
    }
  }

  // Family details
  const familyDetails = {};
  if (profileData.family_details) {
    if (profileData.family_details.family_type) {
      familyDetails['Family Type'] = profileData.family_details.family_type;
    }
    if (profileData.family_details.family_value) {
      familyDetails['Family Values'] = profileData.family_details.family_value;
    }
    if (profileData.family_details.father?.name) {
      familyDetails['Father'] = profileData.family_details.father.name;
    }
    if (profileData.family_details.father?.occupation) {
      familyDetails["Father's Occupation"] = profileData.family_details.father.occupation;
    }
    if (profileData.family_details.mother?.name) {
      familyDetails['Mother'] = profileData.family_details.mother.name;
    }
    if (profileData.family_details.mother?.occupation) {
      familyDetails["Mother's Occupation"] = profileData.family_details.mother.occupation;
    }
    if (profileData.family_details.siblings) {
      const brothers = profileData.family_details.siblings.brother_count || 0;
      const sisters = profileData.family_details.siblings.sister_count || 0;
      familyDetails['Siblings'] = `${brothers} Brother(s), ${sisters} Sister(s)`;
    }
  }

  // Card variants for animation
  const getCardVariants = (cardType) => {
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      hover: {
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        transition: { duration: 0.3 },
      },
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F2]">
      <Header />

      {/* Back Button */}
      <div className="container mx-auto px-6 mt-8">
        <button
          className="bg-[#4F2F1D] hover:bg-[#6B4132] text-[#E5D3C8] font-bold py-2 px-4 rounded-full transition duration-300 shadow-lg flex items-center"
          onClick={handleGoBack}
          style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
        >
          <FaArrowLeft className="mr-2" /> Back to Search
        </button>
      </div>

      {/* Profile Picture */}
      <motion.img
        src={(profileData.profile_pictures && profileData.profile_pictures.length > 0) 
          ? profileData.profile_pictures[0] 
          : profileIcon}
        alt={profileData.name}
        className="rounded-full border-4 border-[#4F2F1D] cursor-pointer mx-auto mt-12 mb-8 shadow-xl object-cover"
        style={{
          width: imageSize,
          height: imageSize,
          opacity: imageOpacity,
          transition: "all 0.3s ease-in-out",
        }}
        onClick={() => handleImageClick((profileData.profile_pictures && profileData.profile_pictures.length > 0) 
          ? profileData.profile_pictures[0] 
          : profileIcon)}
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
              className="rounded-lg max-w-[90vw] max-h-[80vh] shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Profile Name & About */}
      <h2
        className="text-5xl font-bold text-center text-[#4F2F1D] mb-4"
        style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
      >
        {profileData.name}
      </h2>
      
      {/* Slideshow for profile pictures - show whenever there's at least one image */}
      {profileData.profile_pictures && profileData.profile_pictures.length > 0 && (
        <div className="flex justify-center mb-8 mt-8">
          <div className="w-4/5 lg:w-3/4">
            <Slider {...settings}>
              {profileData.profile_pictures.map((image, index) => (
                <div key={index} className="px-2">
                  <div className="mx-2">
                    <img
                      src={image}
                      alt={`Profile ${index + 1}`}
                      className="w-64 h-64 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300 mx-auto object-cover"
                      onClick={() => handleImageClick(image)}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      {/* Profile Details Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-8 md:px-16 mb-20 mt-8">
        {/* Basic Details */}
        <motion.div
          variants={getCardVariants('basicDetails')}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="p-8 rounded-xl shadow-lg transition-all"
          style={{
            backgroundColor: cardColorSchemes.basicDetails.bg,
            borderColor: cardColorSchemes.basicDetails.border,
            borderWidth: "2px",
            borderStyle: "solid"
          }}
        >
          <h3
            className="text-2xl mb-4 flex items-center"
            style={{
              fontFamily: "'Tiempos Headline', serif",
              fontWeight: 400,
              color: cardColorSchemes.basicDetails.title
            }}
          >
            <FaUser className="mr-2" style={{ color: cardColorSchemes.basicDetails.icon }} /> Basic Details
          </h3>
          <div className="space-y-2">
            {Object.entries(basicDetails).map(([key, value]) => (
              <p
                key={key}
                className="text-lg"
                style={{
                  fontFamily: "'Modern Era', sans-serif",
                  fontWeight: 400,
                }}
              >
                <strong style={{ color: cardColorSchemes.basicDetails.label }}>
                  {key}:
                </strong>
                <span style={{ color: cardColorSchemes.basicDetails.value }} className="ml-2">
                  {value}
                </span>
              </p>
            ))}
          </div>
        </motion.div>

        {/* Lifestyle Details */}
        <motion.div
          variants={getCardVariants('lifestyle')}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="p-8 rounded-xl shadow-lg transition-all"
          style={{
            backgroundColor: cardColorSchemes.lifestyle.bg,
            borderColor: cardColorSchemes.lifestyle.border,
            borderWidth: "2px",
            borderStyle: "solid"
          }}
        >
          <h3
            className="text-2xl mb-4 flex items-center"
            style={{
              fontFamily: "'Tiempos Headline', serif",
              fontWeight: 400,
              color: cardColorSchemes.lifestyle.title
            }}
          >
            <FaHeart className="mr-2" style={{ color: cardColorSchemes.lifestyle.icon }} /> Lifestyle
          </h3>
          <div className="space-y-2">
            {Object.entries(lifestyleDetails).map(([key, value]) => (
              <p
                key={key}
                className="text-lg"
                style={{
                  fontFamily: "'Modern Era', sans-serif",
                  fontWeight: 400,
                }}
              >
                <strong style={{ color: cardColorSchemes.lifestyle.label }}>
                  {key}:
                </strong>
                <span style={{ color: cardColorSchemes.lifestyle.value }} className="ml-2">
                  {value}
                </span>
              </p>
            ))}
            <p 
              className="text-lg" 
              style={{ 
                fontFamily: "'Modern Era', sans-serif", 
                fontWeight: 400 
              }}
            >
              <strong style={{ color: cardColorSchemes.lifestyle.label }}>
                Registration Date:
              </strong>
              <span style={{ color: cardColorSchemes.lifestyle.value }} className="ml-2">
                {formatDate(profileData.metadata?.register_date)}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Horoscope Details */}
        <motion.div
          variants={getCardVariants('horoscope')}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="p-8 rounded-xl shadow-lg transition-all"
          style={{
            backgroundColor: cardColorSchemes.horoscope.bg,
            borderColor: cardColorSchemes.horoscope.border,
            borderWidth: "2px",
            borderStyle: "solid"
          }}
        >
          <h3
            className="text-2xl mb-4 flex items-center"
            style={{
              fontFamily: "'Tiempos Headline', serif",
              fontWeight: 400,
              color: cardColorSchemes.horoscope.title
            }}
          >
            <FaHeart className="mr-2" style={{ color: cardColorSchemes.horoscope.icon }} /> Horoscope
          </h3>
          <div className="space-y-2">
            <p
              className="text-lg"
              style={{
                fontFamily: "'Modern Era', sans-serif",
                fontWeight: 400,
              }}
            >
              <strong style={{ color: cardColorSchemes.horoscope.label }}>
                Manglik Status:
              </strong>
              <span style={{ color: cardColorSchemes.horoscope.value }} className="ml-2">
                {profileData.mangalik ? 'Yes' : 'No'}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Education Details */}
        {Object.keys(educationDetails).length > 0 && (
          <motion.div
            variants={getCardVariants('education')}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="p-8 rounded-xl shadow-lg transition-all"
            style={{
              backgroundColor: cardColorSchemes.education.bg,
              borderColor: cardColorSchemes.education.border,
              borderWidth: "2px",
              borderStyle: "solid"
            }}
          >
            <h3
              className="text-2xl mb-4 flex items-center"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
                color: cardColorSchemes.education.title
              }}
            >
              <FaGraduationCap className="mr-2" style={{ color: cardColorSchemes.education.icon }} /> Education
            </h3>
            <div className="space-y-2">
              {Object.entries(educationDetails).map(([key, value]) => (
                <p
                  key={key}
                  className="text-lg"
                  style={{
                    fontFamily: "'Modern Era', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  <strong style={{ color: cardColorSchemes.education.label }}>
                    {key}:
                  </strong>
                  <span style={{ color: cardColorSchemes.education.value }} className="ml-2">
                    {value || 'Not specified'}
                  </span>
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {/* Profession Details */}
        {Object.keys(professionDetails).length > 0 && (
          <motion.div
            variants={getCardVariants('profession')}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="p-8 rounded-xl shadow-lg transition-all"
            style={{
              backgroundColor: cardColorSchemes.profession.bg,
              borderColor: cardColorSchemes.profession.border,
              borderWidth: "2px",
              borderStyle: "solid"
            }}
          >
            <h3
              className="text-2xl mb-4 flex items-center"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
                color: cardColorSchemes.profession.title
              }}
            >
              <FaGraduationCap className="mr-2" style={{ color: cardColorSchemes.profession.icon }} /> Profession
            </h3>
            <div className="space-y-2">
              {Object.entries(professionDetails).map(([key, value]) => (
                <p
                  key={key}
                  className="text-lg"
                  style={{
                    fontFamily: "'Modern Era', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  <strong style={{ color: cardColorSchemes.profession.label }}>
                    {key}:
                  </strong>
                  <span style={{ color: cardColorSchemes.profession.value }} className="ml-2">
                    {value || 'Not specified'}
                  </span>
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {/* Family Details */}
        {Object.keys(familyDetails).length > 0 && (
          <motion.div
            variants={getCardVariants('family')}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="p-8 rounded-xl shadow-lg transition-all"
            style={{
              backgroundColor: cardColorSchemes.family.bg,
              borderColor: cardColorSchemes.family.border,
              borderWidth: "2px",
              borderStyle: "solid"
            }}
          >
            <h3
              className="text-2xl mb-4 flex items-center"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
                color: cardColorSchemes.family.title
              }}
            >
              <FaUsers className="mr-2" style={{ color: cardColorSchemes.family.icon }} /> Family
            </h3>
            <div className="space-y-2">
              {Object.entries(familyDetails).map(([key, value]) => (
                <p
                  key={key}
                  className="text-lg"
                  style={{
                    fontFamily: "'Modern Era', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  <strong style={{ color: cardColorSchemes.family.label }}>
                    {key}:
                  </strong>
                  <span style={{ color: cardColorSchemes.family.value }} className="ml-2">
                    {value || 'Not specified'}
                  </span>
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Contact Actions */}
      <div className="flex justify-center mb-20">
        <button
          className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-3 px-8 rounded-lg transition duration-300 mr-6 shadow-lg"
          style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
        >
          Express Interest
        </button>
        {user && user._id === profileData._id && (
          <button
            className="bg-[#4F2F1D] hover:bg-[#6B4132] text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg"
            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
          >
            Edit Profile
          </button>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProfileDetail;