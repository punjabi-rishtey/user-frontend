import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoSrc from "../assets/logo.png";
import profileIcon from "../assets/profile.png";
import Footer from "./Footer";
import Header from "./Header";
import ProfileSlider from "./ProfileSlider";
import { motion } from "framer-motion";
import axios from "axios"; // Make sure axios is installed

const FindPartner = () => {
  const [filters, setFilters] = useState({
    caste: "",
    manglik: "",
    maritalStatus: "",
    religion: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, user, refreshUser } = useAuth(); // Add refreshUser from context
  const [showFilters, setShowFilters] = useState(false);
  const [currentUserGender, setCurrentUserGender] = useState(null);

  // Refresh user data when component mounts to get latest gender
  useEffect(() => {
    if (isAuthenticated) {
      refreshUser();
    }
  }, [isAuthenticated, refreshUser]);

  // Update currentUserGender when user changes
  useEffect(() => {
    if (user && user.gender) {
      setCurrentUserGender(user.gender.toLowerCase());
      console.log("Current user gender set to:", user.gender.toLowerCase());
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://backend-nm1z.onrender.com/api/users/all-basic");
        setUsers(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      caste: "",
      manglik: "",
      maritalStatus: "",
      religion: "",
    });
    setSearchTerm("");
  };

  const handleProfileClick = (profile) => {
    navigate(`/profile/${profile.preferences?.user || profile._id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Normalize API response fields to match filter structure
  const normalizeMaritalStatus = (status) => {
    if (!status) return "";
    
    // Map various API values to our standardized options
    const statusMap = {
      'never_married': 'Never Married',
      'divorced': 'Divorced',
      'widow_widower': 'Widowed',
      'separated': 'Separated',
      'single': 'Never Married',
      'unmarried': 'Never Married',
      'maried': 'Never Married', // Assuming this is a typo for "married"
      'married': 'Never Married'
    };
    
    // Check if it's in our map
    const lowerCaseStatus = status.toLowerCase();
    if (statusMap[lowerCaseStatus]) {
      return statusMap[lowerCaseStatus];
    }
    
    // Convert snake_case to title case as fallback
    if (status.includes('_')) {
      return status.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  // Get opposite gender of the logged in user using the currentUserGender state
  const getOppositeGender = () => {
    if (!currentUserGender) return null;
    
    return currentUserGender === 'male' ? 'female' : 'male';
  };

  const filteredData = users.filter((item) => {
    const normalizedMaritalStatus = normalizeMaritalStatus(item.marital_status);
    const isManglik = item.mangalik === true || item.mangalik === "true";
    const oppositeGender = getOppositeGender();
    
    // Only show profiles of opposite gender based on currentUserGender
    if (oppositeGender && item.gender?.toLowerCase() !== oppositeGender) {
      return false;
    }
    
    return (
      (filters.caste === "" || 
       item.caste?.toLowerCase() === filters.caste.toLowerCase()) &&
      (filters.manglik === "" || 
       (filters.manglik === "true" && isManglik) || 
       (filters.manglik === "false" && !isManglik)) &&
      (filters.maritalStatus === "" || 
       normalizedMaritalStatus === filters.maritalStatus) &&
      (filters.religion === "" || 
       item.religion?.toLowerCase() === filters.religion.toLowerCase()) &&
      (searchTerm === "" || 
       item.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
  
  // Sort filtered data by name alphabetically for better user experience
  const sortedFilteredData = [...filteredData].sort((a, b) => 
    a.name?.toLowerCase() > b.name?.toLowerCase() ? 1 : -1
  );

  // Extract unique values for each filter category
  const uniqueValues = (key) => {
    const values = [];
    users.forEach(user => {
      let value;
      
      if (key === "maritalStatus") {
        value = normalizeMaritalStatus(user.marital_status);
      } else if (key === "manglik") {
        value = user.mangalik?.toString();
      } else if (key === "caste") {
        value = user.caste;
      } else if (key === "gender") {
        value = user.gender?.charAt(0).toUpperCase() + user.gender?.slice(1).toLowerCase();
      } else if (key === "religion") {
        value = user.religion?.charAt(0).toUpperCase() + user.religion?.slice(1).toLowerCase();
      } else {
        value = user[key === "maritalStatus" ? "marital_status" : key];
      }
      
      if (value && !values.includes(value) && value !== "undefined" && value !== "null") {
        values.push(value);
      }
    });
    
    // Sort values alphabetically
    return values.sort();
  };

  // Format options for better readability
  const formatOption = (option) => {
    // Check if option is undefined, null, or not a string
    if (option === undefined || option === null) return "";
    
    // Convert to string if it's not already
    const optionStr = String(option);
    
    return optionStr
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

  // Predefined options for more consistent filtering
  const predefinedOptions = {
    manglik: ["true", "false"],
    // Standardized list of marital statuses
    maritalStatus: ["Never Married", "Divorced", "Widowed", "Separated"],
    // Major religions in India for matrimony context
    religion: ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "Parsi"],
  };

  // Filter options configuration for reuse
  const filterOptions = [
    {
      label: "Religion",
      name: "religion",
      // Use only predefined religions for consistency
      options: predefinedOptions.religion,
    },
    {
      label: "Caste",
      name: "caste",
      options: uniqueValues("caste"),
    },
    {
      label: "Marital Status",
      name: "maritalStatus",
      // Use only the standardized list
      options: predefinedOptions.maritalStatus,
    },
    {
      label: "Manglik",
      name: "manglik",
      options: [
        { value: "", label: "Any" },
        { value: "true", label: "Yes" },
        { value: "false", label: "No" }
      ],
    },
  ];

  if (loading) {
    return (
      <div className="bg-[#FCF9F2] min-h-screen flex items-center justify-center">
        <div className="text-[#4F2F1D] text-xl">Loading profiles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#FCF9F2] min-h-screen flex items-center justify-center">
        <div className="text-[#990000] text-xl">{error}</div>
      </div>
    );
  }

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
                <option value="">Any {label}</option>
                {Array.isArray(options) ? options.map((option, idx) => {
                  // Handle both object options and string options
                  if (option && typeof option === 'object' && 'value' in option) {
                    return (
                      <option key={idx} value={option.value}>
                        {option.label || formatOption(option.value)}
                      </option>
                    );
                  } else {
                    return (
                      <option key={idx} value={option}>
                        {formatOption(option)}
                      </option>
                    );
                  }
                }) : null}
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
            {sortedFilteredData.length === 0 ? (
              <div className="col-span-2 text-center py-8 text-[#4F2F1D]">
                No profiles match your search criteria.
              </div>
            ) : (
              sortedFilteredData.map((item) => (
                <motion.div
                  key={item._id}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className="bg-[#F5EDE7] p-4 sm:p-6 rounded-lg shadow-lg cursor-pointer border border-[#E5D3C8]"
                  onClick={() => handleProfileClick(item)}
                >
                  <div className="flex items-center flex-col sm:flex-row">
                    <img
                      src={item.profile_picture || profileIcon}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 sm:mb-0 sm:mr-6 object-cover"
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
                        <strong>Age:</strong> {item.age || "Not specified"}
                      </p>
                      <p
                        className="text-sm sm:text-base text-[#6B4132] mb-1"
                        style={{
                          fontFamily: "'Modern Era', sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        <strong>Religion:</strong> {formatOption(item.religion) || "Not specified"}
                      </p>
                      <p
                        className="text-sm sm:text-base text-[#6B4132] mb-1"
                        style={{
                          fontFamily: "'Modern Era', sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        <strong>Marital Status:</strong> {normalizeMaritalStatus(item.marital_status) || "Not specified"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FindPartner;