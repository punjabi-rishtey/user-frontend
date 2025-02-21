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
      backgroundColor: "#FFB6C1", // Darker pink on hover
      transition: { duration: 0.2 }, // Quicker transition for better responsiveness
    },
  };

  return (
    <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
      <Header />

      {/* Profile Slider */}
      <ProfileSlider />

      {/* Search Bar */}
      <div className="container mx-auto px-8 my-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-[#FFE5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3D57] bg-white"
          style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
        />
      </div>

      <div className="flex flex-grow">
        {/* Sidebar for Filters */}
        <div className="w-1/4 p-8 bg-[#FEEAEA] shadow-lg sticky top-0 h-screen overflow-y-auto ml-8 rounded-lg border border-[#FFE5E5]">
          <h2
            className="text-2xl mb-6 text-[#111111]"
            style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
          >
            Filters
          </h2>
          {[
            {
              label: "Gender",
              name: "gender",
              options: uniqueValues("gender"),
            },
            { label: "Caste", name: "caste", options: uniqueValues("caste") },
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
          ].map(({ label, name, options }, index) => (
            <div className="mb-4" key={index}>
              <label 
                className="block text-[#333333] mb-2"
                style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
              >
                {label}
              </label>
              <select
                name={name}
                value={filters[name]}
                onChange={handleChange}
                className="w-full p-3 border border-[#FFE5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3D57] bg-white"
                style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
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
            className="bg-[#FF3D57] hover:bg-[#FF6B80] text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>

        {/* Profile List */}
        <div className="w-3/4 p-8">
          <div className="grid grid-cols-2 gap-8">
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="bg-[#FEEAEA] p-6 rounded-lg shadow-lg cursor-pointer border border-[#FFE5E5]"
                onClick={() => handleProfileClick(item)}
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-full mr-6"
                  />
                  <div>
                    <h3
                      className="text-xl mb-2 text-[#111111]"
                      style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
                    >
                      {item.name}
                    </h3>
                    <p 
                      className="text-[#333333] mb-1"
                      style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                    >
                      <strong>Age:</strong> {item.age}
                    </p>
                    <p 
                      className="text-[#333333] mb-1"
                      style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                    >
                      <strong>Religion:</strong> {item.religion}
                    </p>
                    <p 
                      className="text-[#333333] mb-1"
                      style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
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
