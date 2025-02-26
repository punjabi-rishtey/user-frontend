import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoSrc from "../assets/logo.png";
import profileIcon from "../assets/profile.png";
import LoginModal from "./LoginModal";
import dummyData from "./dummyData";
import Footer from "./Footer";
import Header from "./Header";
import ProfileSlider from "./ProfileSlider";
import { motion } from "framer-motion";

const FindPartner = () => {
  const [filters, setFilters] = useState({
    gender: "",
    caste: "",
    manglik: "",
    maritalStatus: "",
    religion: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      gender: "",
      caste: "",
      manglik: "",
      maritalStatus: "",
      religion: "",
    });
    setSearchTerm("");
  };

  const handleProfileClick = (profile) => {
    navigate(`/profile/${profile.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredData = dummyData.filter((item) => {
    return (
      (filters.gender === "" || item.gender === filters.gender) &&
      (filters.caste === "" || item.caste === filters.caste) &&
      (filters.manglik === "" || item.manglik === filters.manglik) &&
      (filters.maritalStatus === "" ||
        item.maritalStatus === filters.maritalStatus) &&
      (filters.religion === "" || item.religion === filters.religion) &&
      (searchTerm === "" ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Extract unique values for each filter category
  const uniqueValues = (key) => [
    ...new Set(dummyData.map((item) => item[key])),
  ];

  // Format options for better readability
  const formatOption = (option) => {
    return option
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Add cardVariants for consistent hover animation
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      backgroundColor: "#E5D3C8", // Brown/beige on hover (matches membership page)
      transition: { duration: 0.3 }, // Match transition from membership page
    },
  };

  // Filter options configuration for reuse
  const filterOptions = [
    {
      label: "Gender",
      name: "gender",
      options: uniqueValues("gender"),
    },
    {
      label: "Caste",
      name: "caste",
      options: uniqueValues("caste"),
    },
    {
      label: "Manglik",
      name: "manglik",
      options: uniqueValues("manglik"),
    },
    {
      label: "Marital Status",
      name: "maritalStatus",
      options: uniqueValues("maritalStatus"),
    },
    {
      label: "Religion",
      name: "religion",
      options: uniqueValues("religion"),
    },
  ];

  return (
    <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
      <Header />

      {/* Profile Slider */}
      <ProfileSlider />

      {/* Search Bar and Filter Toggle for Mobile */}
      <div className="container mx-auto px-4 sm:px-8 my-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-[#E5D3C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
          />
          <button
            className="md:hidden bg-[#4F2F1D] text-[#E5D3C8] px-4 py-2 rounded-lg"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-grow">
        {/* Mobile Filter Overlay */}
        <div
          className={`fixed inset-0 z-50 md:hidden bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            showFilters ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setShowFilters(false)}
        />

        {/* Mobile Filters Sidebar */}
        <div
          className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-[#4F2F1D] to-[#6B4132] p-4 shadow-lg z-50 md:hidden transition-transform duration-300 overflow-y-auto ${
            showFilters ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-2xl text-[#E5D3C8]"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
              }}
            >
              Filters
            </h2>
            <button
              className="text-[#E5D3C8] p-2"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          {/* Mobile Filter options */}
          <div className="space-y-4">
            {filterOptions.map(({ label, name, options }, index) => (
              <div className="mb-4" key={index}>
                <label
                  className="block text-[#E5D3C8] mb-2"
                  style={{
                    fontFamily: "'Modern Era', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {label}
                </label>
                <select
                  name={name}
                  value={filters[name]}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#E5D3C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
                  style={{
                    fontFamily: "'Modern Era', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  <option value="">Select {label}</option>
                  {options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {formatOption(option)}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <button
              className="w-full bg-[#4F2F1D] hover:bg-[#6B4132] text-[#E5D3C8] font-bold py-2 px-4 rounded-lg transition duration-300 mt-4"
              style={{
                fontFamily: "'Modern Era', sans-serif",
                fontWeight: 400,
              }}
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Desktop Filters Sidebar - Updated to match Membership style */}
        <div className="hidden md:block w-1/4 p-6 bg-[#F5EDE7] shadow-lg md:sticky md:top-0 md:h-screen md:overflow-y-auto ml-8 rounded-lg border border-[#E5D3C8]">
          <h2
            className="text-2xl mb-6 text-[#4F2F1D]"
            style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
          >
            Filters
          </h2>

          {filterOptions.map(({ label, name, options }, index) => (
            <div className="mb-4" key={index}>
              <label
                className="block text-[#6B4132] mb-2"
                style={{
                  fontFamily: "'Modern Era', sans-serif",
                  fontWeight: 400,
                }}
              >
                {label}
              </label>
              <select
                name={name}
                value={filters[name]}
                onChange={handleChange}
                className="w-full p-3 border border-[#E5D3C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
                style={{
                  fontFamily: "'Modern Era', sans-serif",
                  fontWeight: 400,
                }}
              >
                <option value="">Select {label}</option>
                {options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {formatOption(option)}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>

        {/* Profile List - Updated to match Membership style */}
        <div className="w-full md:w-3/4 p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="bg-[#F5EDE7] p-4 sm:p-6 rounded-lg shadow-lg cursor-pointer border border-[#E5D3C8]"
                onClick={() => handleProfileClick(item)}
              >
                <div className="flex items-center flex-col sm:flex-row">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 sm:mb-0 sm:mr-6"
                  />
                  <div className="text-center sm:text-left">
                    <h3
                      className="text-lg sm:text-xl mb-2 text-[#4F2F1D]"
                      style={{
                        fontFamily: "'Tiempos Headline', serif",
                        fontWeight: 400,
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="text-sm sm:text-base text-[#6B4132] mb-1"
                      style={{
                        fontFamily: "'Modern Era', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      <strong>Age:</strong> {item.age}
                    </p>
                    <p
                      className="text-sm sm:text-base text-[#6B4132] mb-1"
                      style={{
                        fontFamily: "'Modern Era', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      <strong>Religion:</strong> {item.religion}
                    </p>
                    <p
                      className="text-sm sm:text-base text-[#6B4132] mb-1"
                      style={{
                        fontFamily: "'Modern Era', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      <strong>Marital Status:</strong> {item.maritalStatus}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FindPartner;
