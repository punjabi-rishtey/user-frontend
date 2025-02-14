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
  const { isAuthenticated, showLoginModal, toggleLoginModal, login } =
    useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      toggleLoginModal();
    }
  }, [isAuthenticated]);

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

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-[#f2e6d9] to-[#b3d9ea] relative">
      <Header />

      {/* Profile Slider */}
      <ProfileSlider />

      {/* Search Bar */}
      <div className="container mx-auto px-8 my-4 ">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000] mb-6"
        />
      </div>

      <div className="flex flex-grow">
        {/* Sidebar for Filters */}
        <div className="w-1/4 p-8 bg-white shadow-lg sticky top-0 h-screen overflow-y-auto ml-8 rounded-lg">
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#4F2F1D",
            }}
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
              <label className="block text-[#4F2F1D] mb-2 font-semibold">
                {label}
              </label>
              <select
                name={name}
                value={filters[name]}
                onChange={handleChange}
                className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
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
            className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded-md transition duration-300"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>

        {/* Profile List */}
        <div className="w-3/4 p-8">
          <div className="grid grid-cols-2 gap-8">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-102 cursor-pointer"
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
                      className="text-xl font-bold mb-2"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#4F2F1D",
                      }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-[#4F2F1D] mb-1">
                      <strong>Age:</strong> {item.age}
                    </p>
                    <p className="text-[#4F2F1D] mb-1">
                      <strong>Religion:</strong> {item.religion}
                    </p>
                    <p className="text-[#4F2F1D] mb-1">
                      <strong>Marital Status:</strong> {item.maritalStatus}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FindPartner;
