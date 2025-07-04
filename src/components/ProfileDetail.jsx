import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "./Footer";
import Header from "./Header";
import ProfilePhotosLayout from "./ProfilePhotosLayout"; // Import the new component
import {
  FaHeart,
  FaUser,
  FaGraduationCap,
  FaPhone,
  FaUsers,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import profileIcon from "../assets/profile.png";

// Define a vibrant color palette for different card types
const cardColorSchemes = {
  basicDetails: {
    bg: "#E3F2FD", // Light blue
    border: "#90CAF9",
    title: "#1565C0",
    icon: "#1565C0",
    label: "#0D47A1",
    value: "#1976D2",
  },
  lifestyle: {
    bg: "#F3E5F5", // Light purple
    border: "#CE93D8",
    title: "#7B1FA2",
    icon: "#7B1FA2",
    label: "#4A148C",
    value: "#8E24AA",
  },
  horoscope: {
    bg: "#FFF3E0", // Light orange
    border: "#FFCC80",
    title: "#E65100",
    icon: "#E65100",
    label: "#BF360C",
    value: "#EF6C00",
  },
  education: {
    bg: "#E8F5E9", // Light green
    border: "#A5D6A7",
    title: "#2E7D32",
    icon: "#2E7D32",
    label: "#1B5E20",
    value: "#388E3C",
  },
  profession: {
    bg: "#E0F7FA", // Light cyan
    border: "#80DEEA",
    title: "#00838F",
    icon: "#00838F",
    label: "#006064",
    value: "#0097A7",
  },
  family: {
    bg: "#FFF8E1", // Light amber
    border: "#FFE082",
    title: "#FF8F00",
    icon: "#FF8F00",
    label: "#FF6F00",
    value: "#FFA000",
  },
};

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { scrollYProgress } = useScroll();

  // Dynamic Scroll Effects for Boxes
  const imageSize = useTransform(scrollYProgress, [0, 0.3], ["180px", "90px"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        const response = await axios.get(
          `https://backend-nm1z.onrender.com/api/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfileData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile data. Please try again later.");
        if (err.message === "Authentication required") {
          navigate("/login", { replace: true });
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

  // Format values for better display
  const formatValue = (value) => {
    if (value === undefined || value === null) return "Not specified";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (value === "") return "Not specified";

    // Format snake_case to Title Case
    if (typeof value === "string" && value.includes("_")) {
      return value
        .split("_")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }

    return value;
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
                  navigate("/");
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
    if (!dob) return "Not specified";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Organize profile data into sections for display
  const basicDetails = {
    Age: calculateAge(profileData.dob),
    "Date of Birth": formatDate(profileData.dob),
    Gender: formatValue(profileData.gender),
    Religion: formatValue(profileData.religion),
    "Marital Status": formatValue(profileData.marital_status),
    Email: profileData.email || "Not specified",
    Mobile: profileData.mobile || "Not specified",
  };

  // Physical and lifestyle information
  const lifestyleDetails = {
    "Physical Disability": profileData.physical_attributes?.physical_disability
      ? "Yes"
      : "No",
    Smoke: profileData.lifestyle?.smoke ? profileData.lifestyle.smoke : "No",
    Drink: profileData.lifestyle?.drink ? profileData.lifestyle.drink : "No",
    "NRI Status": profileData.lifestyle?.nri_status
      ? profileData.lifestyle.nri_status
      : "No",
  };

  // Astrology details
  const astrologyDetails = {
    Manglik: profileData.manglik ? "Yes" : "No",
    ...profileData.astrology_details,
  };

  // Education and profession details
  const educationDetails = {};
  if (profileData.education_details) {
    if (profileData.education_details.education_level) {
      educationDetails["Education Level"] =
        profileData.education_details.education_level;
    }
    if (profileData.education_details.education_field) {
      educationDetails["Field of Study"] =
        profileData.education_details.education_field;
    }
    if (profileData.education_details.college_details?.name) {
      educationDetails["College"] =
        profileData.education_details.college_details.name;
    }
    if (profileData.education_details.college_details?.city) {
      educationDetails["College City"] =
        profileData.education_details.college_details.city;
    }
    if (profileData.education_details.school_details?.name) {
      educationDetails["School"] =
        profileData.education_details.school_details.name;
    }
  }

  // Profession details
  const professionDetails = {};
  if (profileData.profession_details) {
    if (profileData.profession_details.occupation) {
      professionDetails["Occupation"] =
        profileData.profession_details.occupation;
    }
    if (profileData.profession_details.annual_income) {
      professionDetails["Annual Income"] =
        profileData.profession_details.annual_income;
    }
    if (profileData.profession_details.company) {
      professionDetails["Company"] = profileData.profession_details.company;
    }
    if (profileData.profession_details.work_address?.city) {
      professionDetails["Work City"] =
        profileData.profession_details.work_address.city;
    }
  }

  // Family details
  const familyDetails = {};
  if (profileData.family_details) {
    if (profileData.family_details.family_type) {
      familyDetails["Family Type"] = profileData.family_details.family_type;
    }
    if (profileData.family_details.family_value) {
      familyDetails["Family Values"] = profileData.family_details.family_value;
    }
    if (profileData.family_details.father?.name) {
      familyDetails["Father"] = profileData.family_details.father.name;
    }
    if (profileData.family_details.father?.occupation) {
      familyDetails["Father's Occupation"] =
        profileData.family_details.father.occupation;
    }
    if (profileData.family_details.mother?.name) {
      familyDetails["Mother"] = profileData.family_details.mother.name;
    }
    if (profileData.family_details.mother?.occupation) {
      familyDetails["Mother's Occupation"] =
        profileData.family_details.mother.occupation;
    }
    if (profileData.family_details.siblings) {
      const brothers = profileData.family_details.siblings.brother_count || 0;
      const sisters = profileData.family_details.siblings.sister_count || 0;
      familyDetails[
        "Siblings"
      ] = `${brothers} Brother(s), ${sisters} Sister(s)`;
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

      {/* Profile Name */}
      <h2
        className="text-5xl font-bold text-center text-[#4F2F1D] mt-10 mb-6"
        style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
      >
        {profileData.name}
      </h2>

      {/* ProfilePhotosLayout Component - Replaces previous slideshow implementation */}
      <ProfilePhotosLayout photos={profileData.profile_pictures} />

      {/* Profile Details Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-8 md:px-16 mb-20 mt-8">
        {/* Basic Details */}
        <motion.div
          variants={getCardVariants("basicDetails")}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="p-8 rounded-xl shadow-lg transition-all"
          style={{
            backgroundColor: cardColorSchemes.basicDetails.bg,
            borderColor: cardColorSchemes.basicDetails.border,
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        >
          <h3
            className="text-2xl mb-4 flex items-center"
            style={{
              fontFamily: "'Tiempos Headline', serif",
              fontWeight: 400,
              color: cardColorSchemes.basicDetails.title,
            }}
          >
            <FaUser
              className="mr-2"
              style={{ color: cardColorSchemes.basicDetails.icon }}
            />{" "}
            Basic Details
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
                <span
                  style={{ color: cardColorSchemes.basicDetails.value }}
                  className="ml-2"
                >
                  {value}
                </span>
              </p>
            ))}
          </div>
        </motion.div>

        {/* Lifestyle Details */}
        <motion.div
          variants={getCardVariants("lifestyle")}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="p-8 rounded-xl shadow-lg transition-all"
          style={{
            backgroundColor: cardColorSchemes.lifestyle.bg,
            borderColor: cardColorSchemes.lifestyle.border,
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        >
          <h3
            className="text-2xl mb-4 flex items-center"
            style={{
              fontFamily: "'Tiempos Headline', serif",
              fontWeight: 400,
              color: cardColorSchemes.lifestyle.title,
            }}
          >
            <FaHeart
              className="mr-2"
              style={{ color: cardColorSchemes.lifestyle.icon }}
            />{" "}
            Lifestyle
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
                <span
                  style={{ color: cardColorSchemes.lifestyle.value }}
                  className="ml-2"
                >
                  {value}
                </span>
              </p>
            ))}
            <p
              className="text-lg"
              style={{
                fontFamily: "'Modern Era', sans-serif",
                fontWeight: 400,
              }}
            >
              <strong style={{ color: cardColorSchemes.lifestyle.label }}>
                Registration Date:
              </strong>
              <span
                style={{ color: cardColorSchemes.lifestyle.value }}
                className="ml-2"
              >
                {formatDate(profileData.metadata?.register_date)}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Horoscope Details */}
        <motion.div
          variants={getCardVariants("horoscope")}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="p-8 rounded-xl shadow-lg transition-all"
          style={{
            backgroundColor: cardColorSchemes.horoscope.bg,
            borderColor: cardColorSchemes.horoscope.border,
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        >
          <h3
            className="text-2xl mb-4 flex items-center"
            style={{
              fontFamily: "'Tiempos Headline', serif",
              fontWeight: 400,
              color: cardColorSchemes.horoscope.title,
            }}
          >
            <FaHeart
              className="mr-2"
              style={{ color: cardColorSchemes.horoscope.icon }}
            />{" "}
            Horoscope
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
              <span
                style={{ color: cardColorSchemes.horoscope.value }}
                className="ml-2"
              >
                {profileData.manglik ? profileData.manglik : "No"}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Education Details */}
        {Object.keys(educationDetails).length > 0 && (
          <motion.div
            variants={getCardVariants("education")}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="p-8 rounded-xl shadow-lg transition-all"
            style={{
              backgroundColor: cardColorSchemes.education.bg,
              borderColor: cardColorSchemes.education.border,
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            <h3
              className="text-2xl mb-4 flex items-center"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
                color: cardColorSchemes.education.title,
              }}
            >
              <FaGraduationCap
                className="mr-2"
                style={{ color: cardColorSchemes.education.icon }}
              />{" "}
              Education
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
                  <span
                    style={{ color: cardColorSchemes.education.value }}
                    className="ml-2"
                  >
                    {value || "Not specified"}
                  </span>
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {/* Profession Details */}
        {Object.keys(professionDetails).length > 0 && (
          <motion.div
            variants={getCardVariants("profession")}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="p-8 rounded-xl shadow-lg transition-all"
            style={{
              backgroundColor: cardColorSchemes.profession.bg,
              borderColor: cardColorSchemes.profession.border,
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            <h3
              className="text-2xl mb-4 flex items-center"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
                color: cardColorSchemes.profession.title,
              }}
            >
              <FaGraduationCap
                className="mr-2"
                style={{ color: cardColorSchemes.profession.icon }}
              />{" "}
              Profession
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
                  <span
                    style={{ color: cardColorSchemes.profession.value }}
                    className="ml-2"
                  >
                    {value || "Not specified"}
                  </span>
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {/* Family Details */}
        {Object.keys(familyDetails).length > 0 && (
          <motion.div
            variants={getCardVariants("family")}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="p-8 rounded-xl shadow-lg transition-all"
            style={{
              backgroundColor: cardColorSchemes.family.bg,
              borderColor: cardColorSchemes.family.border,
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            <h3
              className="text-2xl mb-4 flex items-center"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
                color: cardColorSchemes.family.title,
              }}
            >
              <FaUsers
                className="mr-2"
                style={{ color: cardColorSchemes.family.icon }}
              />{" "}
              Family
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
                  <span
                    style={{ color: cardColorSchemes.family.value }}
                    className="ml-2"
                  >
                    {value || "Not specified"}
                  </span>
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Contact Actions */}
      <div className="flex justify-center mb-20">
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
