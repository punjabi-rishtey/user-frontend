import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoSrc from "../assets/logo.png";
import profileIcon from "../assets/profile.png";
import Footer from "./Footer";
import Header from "./Header";
import ProfileSlider from "./ProfileSlider";
import { motion } from "framer-motion";
import axios from "axios";

const FindPartner = () => {
  const [filters, setFilters] = useState({
    manglik: "",
    maritalStatus: "",
    nriStatus: "",
    occupation: "",
    ageMin: "",
    ageMax: "",
  });
  const [searchTerm, setSearchTerm] = windings("react");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, user, refreshUser } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [currentUserGender, setCurrentUserGender] = useState(null);
  const [profileComplete, setProfileComplete] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(10);
  // New state for sorting
  const [sortOption, setSortOption] = useState("newest"); // Default: newest first

  // Give auth context time to initialize before checking
  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthChecked(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  // Only redirect if we've confirmed the user is not authenticated
  useEffect(() => {
    if (!isAuthenticated && authChecked) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate, authChecked]);

  // Check profile completeness
  useEffect(() => {
    const checkProfileCompleteness = async () => {
      if (!isAuthenticated) return;

      try {
        await axios.get(
          "https://backend-nm1z.onrender.com/api/users/find-my-partner",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProfileComplete(true);
        fetchUsers();
      } catch (err) {
        console.error("Error checking profile completeness:", err);
        if (err.response && err.response.status === 403) {
          setProfileComplete(false);
          setError(
            "Your profile must be at least 70% complete to access this feature."
          );
        } else {
          setError(
            "Failed to check profile completeness. Please try again later."
          );
        }
        setLoading(false);
      }
    };

    if (isAuthenticated && authChecked) {
      checkProfileCompleteness();
    }
  }, [isAuthenticated, authChecked]);

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://backend-nm1z.onrender.com/api/users/all-basic"
      );
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (response.data && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else {
        console.warn(
          "API response data is not in expected format:",
          response.data
        );
        setUsers([]);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    setCurrentPage(1);
  };

  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      manglik: "",
      maritalStatus: "",
      nriStatus: "",
      occupation: "",
      ageMin: "",
      ageMax: "",
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleProfileClick = (profile) => {
    navigate(`/profile/${profile.preferences?.user || profile._id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Normalize marital status
  const normalizeMaritalStatus = (status) => {
    if (!status) return "";

    const statusMap = {
      never_married: "Never Married",
      divorced: "Divorced",
      widow_widower: "Widowed",
      separated: "Separated",
      single: "Never Married",
      unmarried: "Never Married",
      maried: "Never Married",
      married: "Never Married",
    };

    const lowerCaseStatus = status.toLowerCase();
    if (statusMap[lowerCaseStatus]) {
      return statusMap[lowerCaseStatus];
    }

    if (status.includes("_")) {
      return status
        .split("_")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }

    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  // Get opposite gender
  const getOppositeGender = () => {
    if (!currentUserGender) return null;
    return currentUserGender === "male" ? "female" : "male";
  };

  // Filter users
  const filteredData = Array.isArray(users)
    ? users.filter((item) => {
        if (!item) return false;

        const normalizedMaritalStatus = normalizeMaritalStatus(
          item.marital_status
        );
        const isManglik = item.manglik === true || item.manglik === "true";
        const oppositeGender = getOppositeGender();
        const age = parseInt(item.age);
        const isNRI =
          item.nri_status === true ||
          item.nri_status === "true" ||
          item.nri_status === "yes";
        const userOccupation = item.occupation || "";

        if (oppositeGender && item.gender?.toLowerCase() !== oppositeGender) {
          return false;
        }

        if (filters.ageMin && !isNaN(age) && age < parseInt(filters.ageMin)) {
          return false;
        }

        if (filters.ageMax && !isNaN(age) && age > parseInt(filters.ageMax)) {
          return false;
        }

        return (
          (filters.manglik === "" ||
            (filters.manglik === "true" && isManglik) ||
            (filters.manglik === "false" && !isManglik)) &&
          (filters.maritalStatus === "" ||
            normalizedMaritalStatus === filters.maritalStatus) &&
          (filters.nriStatus === "" ||
            (filters.nriStatus === "true" && isNRI) ||
            (filters.nriStatus === "false" && !isNRI)) &&
          (filters.occupation === "" ||
            userOccupation === filters.occupation) &&
          (searchTerm === "" ||
            item.name?.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      })
    : [];

  // Sort filtered data
  const sortedFilteredData = [...filteredData].sort((a, b) => {
    if (sortOption === "newest") {
      const dateA = a.metadata?.register_date
        ? new Date(a.metadata.register_date)
        : new Date(0);
      const dateB = b.metadata?.register_date
        ? new Date(b.metadata.register_date)
        : new Date(0);
      return dateB - dateA; // Newest first
    } else if (sortOption === "alphabetical-asc") {
      return a.name?.toLowerCase().localeCompare(b.name?.toLowerCase());
    } else if (sortOption === "alphabetical-desc") {
      return b.name?.toLowerCase().localeCompare(a.name?.toLowerCase());
    }
    return 0;
  });

  // Pagination
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = sortedFilteredData.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Extract unique values for filters
  const uniqueValues = (key) => {
    const values = [];
    if (!Array.isArray(users)) return values;

    users.forEach((user) => {
      if (!user) return;

      let value;
      if (key === "maritalStatus") {
        value = normalizeMaritalStatus(user.marital_status);
      } else if (key === "manglik") {
        value = user.manglik?.toString();
      } else if (key === "gender") {
        value =
          user.gender?.charAt(0).toUpperCase() +
          user.gender?.slice(1).toLowerCase();
      } else {
        value = user[key === "maritalStatus" ? "marital_status" : key];
      }

      if (
        value &&
        !values.includes(value) &&
        value !== "undefined" &&
        value !== "null"
      ) {
        values.push(value);
      }
    });

    return values.sort();
  };

  // Format options
  const formatOption = (option) => {
    if (option === undefined || option === null) return "";
    const optionStr = String(option);
    return optionStr
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Card variants for animation
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      backgroundColor: "#E5D3C8",
      transition: { duration: 0.3 },
    },
  };

  // Predefined filter options
  const predefinedOptions = {
    manglik: ["true", "false"],
    nriStatus: ["true", "false"],
    maritalStatus: ["Never Married", "Divorced", "Widowed", "Separated"],
  };

  const filterOptions = [
    {
      label: "Occupation",
      name: "occupation",
      options: [
        { value: "", label: "Any" },
        { value: "Private Job", label: "Private Job" },
        { value: "Government Job", label: "Government Job" },
        { value: "Business Owner", label: "Business Owner" },
      ],
    },
    {
      label: "NRI Status",
      name: "nriStatus",
      options: [
        { value: "", label: "Any" },
        { value: "false", label: "No" },
        { value: "true", label: "Yes" },
      ],
    },
    {
      label: "Marital Status / History",
      name: "maritalStatus",
      options: predefinedOptions.maritalStatus,
    },
    {
      label: "Manglik",
      name: "manglik",
      options: [
        { value: "", label: "Any" },
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
      ],
    },
  ];

  // Pagination component
  const Pagination = ({
    profilesPerPage,
    totalProfiles,
    currentPage,
    paginate,
  }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProfiles / profilesPerPage); i++) {
      pageNumbers.push(i);
    }

    let displayedPageNumbers = [];
    const totalPages = pageNumbers.length;

    if (totalPages <= 5) {
      displayedPageNumbers = pageNumbers;
    } else {
      displayedPageNumbers.push(currentPage);
      for (let i = 1; i <= 2; i++) {
        if (currentPage - i > 0) {
          displayedPageNumbers.unshift(currentPage - i);
        }
      }
      for (let i = 1; i <= 2; i++) {
        if (currentPage + i <= totalPages) {
          displayedPageNumbers.push(currentPage + i);
        }
      }
      while (displayedPageNumbers.length < 5 && displayedPageNumbers[0] > 1) {
        displayedPageNumbers.unshift(displayedPageNumbers[0] - 1);
      }
      while (
        displayedPageNumbers.length < 5 &&
        displayedPageNumbers[displayedPageNumbers.length - 1] < totalPages
      ) {
        displayedPageNumbers.push(
          displayedPageNumbers[displayedPageNumbers.length - 1] + 1
        );
      }
      if (displayedPageNumbers[0] > 1) {
        displayedPageNumbers = [
          1,
          "...",
          ...displayedPageNumbers.slice(displayedPageNumbers[0] === 2 ? 1 : 0),
        ];
      }
      if (displayedPageNumbers[displayedPageNumbers.length - 1] < totalPages) {
        displayedPageNumbers = [...displayedPageNumbers, "...", totalPages];
      }
    }

    return (
      <nav className="flex justify-center mt-8">
        <ul className="flex space-x-2">
          <li>
            <button
              onClick={() =>
                currentPage > 1 ? paginate(currentPage - 1) : null
              }
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#4F2F1D] text-white hover:bg-[#6B4132]"
              } transition duration-300`}
            >
              «
            </button>
          </li>
          {displayedPageNumbers.map((number, index) => (
            <li key={index}>
              {number === "..." ? (
                <span className="px-3 py-2">...</span>
              ) : (
                <button
                  onClick={() => paginate(number)}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === number
                      ? "bg-[#990000] text-white"
                      : "bg-[#F5EDE7] text-[#4F2F1D] hover:bg-[#E5D3C8]"
                  } transition duration-300`}
                >
                  {number}
                </button>
              )}
            </li>
          ))}
          <li>
            <button
              onClick={() =>
                currentPage < pageNumbers.length
                  ? paginate(currentPage + 1)
                  : null
              }
              disabled={
                currentPage === pageNumbers.length || pageNumbers.length === 0
              }
              className={`px-3 py-2 rounded-md ${
                currentPage === pageNumbers.length || pageNumbers.length === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#4F2F1D] text-white hover:bg-[#6B4132]"
              } transition duration-300`}
            >
              »
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  // Loading indicator
  if (!authChecked) {
    return (
      <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-[#4F2F1D] text-xl">
            Checking authentication...
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Incomplete profile message
  if (!profileComplete) {
    return (
      <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-[#F5EDE7] p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2
              className="text-2xl mb-4 text-[#4F2F1D] text-center"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
              }}
            >
              Profile Incomplete
            </h2>
            <p
              className="text-[#6B4132] mb-6 text-center"
              style={{
                fontFamily: "'Modern Era', sans-serif",
                fontWeight: 400,
              }}
            >
              Your profile must be at least 70% complete to access the partner
              search feature.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/profilepage")}
                className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                style={{
                  fontFamily: "'Modern Era', sans-serif",
                  fontWeight: 400,
                }}
              >
                Complete Your Profile
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-[#4F2F1D] text-xl">Loading profiles...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error && profileComplete) {
    return (
      <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-[#990000] text-xl">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
      <Header />
      {/* Search Bar, Sort Dropdown, and Filter Toggle */}
      <div className="container mx-auto px-4 sm:px-8 my-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full sm:w-1/2 p-3 border border-[#E5D3C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
          />
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full sm:w-1/4 p-3 border border-[#E5D3C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
          >
            <option value="newest">Newest First</option>
            <option value="alphabetical-asc">Alphabetical (A-Z)</option>
            <option value="alphabetical-desc">Alphabetical (Z-A)</option>
          </select>
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
          <div className="space-y-4">
            <div className="mb-4">
              <label
                className="block text-[#E5D3C8] mb-2"
                style={{
                  fontFamily: "'Modern Era', sans-serif",
                  fontWeight: 400,
                }}
              >
                Age Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="ageMin"
                  placeholder="Min"
                  value={filters.ageMin}
                  onChange={handleChange}
                  min="18"
                  max="100"
                  className="w-1/2 p-3 border border-[#E5D3C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
                  style={{
                    fontFamily: "'Modern Era', sans-serif",
                    fontWeight: 400,
                  }}
                />
                <input
                  type="number"
                  name="ageMax"
                  placeholder="Max"
                  value={filters.ageMax}
                  onChange={handleChange}
                  min="18"
                  max="100"
                  className="w-1/2 p-3 border border-[#E5D3C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
                  style={{
                    fontFamily: "'Modern Era', sans-serif",
                    fontWeight: 400,
                  }}
                />
              </div>
            </div>
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
                  {Array.isArray(options)
                    ? options.map((option, idx) => {
                        if (
                          option &&
                          typeof option === "object" &&
                          "value" in option
                        ) {
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
                      })
                    : null}
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

        {/* Desktop Filters Sidebar */}
        <div className="hidden md:block w-1/4 p-6 bg-[#F5EDE7] shadow-lg md:sticky md:top-0 md:h-screen md:overflow-y-auto ml-8 rounded-lg border border-[#E5D3C8]">
          <h2
            className="text-2xl mb-6 text-[#4F2F1D]"
            style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
          >
            Filters
          </h2>
          <div className="mb-6">
            <label
              className="block text-[#6B4132] mb-2"
              style={{
                fontFamily: "'Modern Era', sans-serif",
                fontWeight: 400,
              }}
            >
              Age Range
            </label>
            <div className="flex space-x-3 items-center">
              <input
                type="number"
                name="ageMin"
                placeholder="Min"
                value={filters.ageMin}
                onChange={handleChange}
                min="18"
                max="100"
                className="w-1/2 p-3 border border-[#E5D3C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
                style={{
                  fontFamily: "'Modern Era', sans-serif",
                  fontWeight: 400,
                }}
              />
              <span className="text-[#6B4132]">to</span>
              <input
                type="number"
                name="ageMax"
                placeholder="Max"
                value={filters.ageMax}
                onChange={handleChange}
                min="18"
                max="100"
                className="w-1/2 p-3 border border-[#E5D3C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
                style={{
                  fontFamily: "'Modern Era', sans-serif",
                  fontWeight: 400,
                }}
              />
            </div>
          </div>
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
                {Array.isArray(options)
                  ? options.map((option, idx) => {
                      if (
                        option &&
                        typeof option === "object" &&
                        "value" in option
                      ) {
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
                    })
                  : null}
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

        {/* Profile List */}
        <div className="w-full md:w-3/4 p-4 sm:p-8">
          <div className="mb-4 text-[#4F2F1D]">
            <p>
              Showing {currentProfiles.length} of {sortedFilteredData.length}{" "}
              profiles
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {sortedFilteredData.length === 0 ? (
              <div className="col-span-2 text-center py-8 text-[#4F2F1D]">
                No profiles match your search criteria.
              </div>
            ) : (
              currentProfiles.map((item) => (
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
                        <strong>Occupation:</strong>{" "}
                        {formatOption(item.occupation) || "Not specified"}
                      </p>
                      <p
                        className="text-sm sm:text-base text-[#6B4132] mb-1"
                        style={{
                          fontFamily: "'Modern Era', sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        <strong>NRI:</strong>{" "}
                        {item.nri_status === true ||
                        item.nri_status === "true" ||
                        item.nri_status === "yes"
                          ? "Yes"
                          : "No"}
                      </p>
                      <p
                        className="text-sm sm:text-base text-[#6B4132] mb-1"
                        style={{
                          fontFamily: "'Modern Era', sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        <strong>Marital Status:</strong>{" "}
                        {normalizeMaritalStatus(item.marital_status) ||
                          "Not specified"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
          {sortedFilteredData.length > 0 && (
            <Pagination
              profilesPerPage={profilesPerPage}
              totalProfiles={sortedFilteredData.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FindPartner;


// v1
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import logoSrc from "../assets/logo.png";
// import profileIcon from "../assets/profile.png";
// import Footer from "./Footer";
// import Header from "./Header";
// import ProfileSlider from "./ProfileSlider";
// import { motion } from "framer-motion";
// import axios from "axios"; // Make sure axios is installed

// const FindPartner = () => {
//   const [filters, setFilters] = useState({
//     manglik: "",
//     maritalStatus: "",
//     nriStatus: "", // Added NRI status filter
//     occupation: "", // Added occupation filter
//     ageMin: "",
//     ageMax: "",
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { isAuthenticated, user, refreshUser } = useAuth(); // Add refreshUser from context
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentUserGender, setCurrentUserGender] = useState(null);
//   const [profileComplete, setProfileComplete] = useState(true);
//   const [authChecked, setAuthChecked] = useState(false); // Add state to track if auth has been checked

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [profilesPerPage] = useState(10);

//   // Give auth context time to initialize before checking
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setAuthChecked(true);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   // Refresh user data when component mounts to get latest gender
//   useEffect(() => {
//     if (isAuthenticated) {
//       refreshUser();
//     }
//   }, [isAuthenticated, refreshUser]);

//   // Update currentUserGender when user changes
//   useEffect(() => {
//     if (user && user.gender) {
//       setCurrentUserGender(user.gender.toLowerCase());
//       console.log("Current user gender set to:", user.gender.toLowerCase());
//     }
//   }, [user]);

//   // Only redirect if we've confirmed the user is not authenticated
//   // and we've given auth context time to initialize
//   useEffect(() => {
//     if (!isAuthenticated && authChecked) {
//       navigate("/login", { replace: true });
//     }
//   }, [isAuthenticated, navigate, authChecked]);

//   // First check if profile is complete enough to access this feature
//   useEffect(() => {
//     const checkProfileCompleteness = async () => {
//       if (!isAuthenticated) return; // Don't check if not authenticated

//       try {
//         await axios.get(
//           "https://backend-nm1z.onrender.com/api/users/find-my-partner",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         // If we get here, the profile is complete enough (no 403 error)
//         setProfileComplete(true);
//         fetchUsers(); // Fetch users only if profile is complete
//       } catch (err) {
//         console.error("Error checking profile completeness:", err);
//         if (err.response && err.response.status === 403) {
//           setProfileComplete(false);
//           setError(
//             "Your profile must be at least 70% complete to access this feature."
//           );
//         } else {
//           setError(
//             "Failed to check profile completeness. Please try again later."
//           );
//         }
//         setLoading(false);
//       }
//     };

//     if (isAuthenticated && authChecked) {
//       checkProfileCompleteness();
//     }
//   }, [isAuthenticated, authChecked]);

//   // useEffect(() => {
//   //   // console.log("> user status: ", user?.status, user && user.status);
//   //   alert("No active membership.");
//   //   if (user && user.status != "Approved") {
//   //     navigate("/membership", { replace: true });
//   //   }
//   // }, []);

//   // Fetch users from API
//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "https://backend-nm1z.onrender.com/api/users/all-basic"
//       );
//       if (Array.isArray(response.data)) {
//         setUsers(response.data);
//       } else if (response.data && Array.isArray(response.data.users)) {
//         setUsers(response.data.users);
//       } else {
//         console.warn(
//           "API response data is not in expected format:",
//           response.data
//         );
//         setUsers([]);
//       }
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       setError("Failed to load users. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Rest of the component remains the same

//   // Handle all input changes including range inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({
//       ...filters,
//       [name]: value,
//     });
//     // Reset to first page when filters change
//     setCurrentPage(1);
//   };

//   const handleClearFilters = () => {
//     setFilters({
//       manglik: "",
//       maritalStatus: "",
//       nriStatus: "", // Clear NRI status
//       occupation: "", // Clear occupation filter
//       ageMin: "", // Clear min age
//       ageMax: "", // Clear max age
//     });
//     setSearchTerm("");
//     // Reset to first page when filters are cleared
//     setCurrentPage(1);
//   };

//   // Update search term and reset to first page
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   const handleProfileClick = (profile) => {
//     navigate(`/profile/${profile.preferences?.user || profile._id}`);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Normalize API response fields to match filter structure
//   const normalizeMaritalStatus = (status) => {
//     if (!status) return "";

//     // Map various API values to our standardized options
//     const statusMap = {
//       never_married: "Never Married",
//       divorced: "Divorced",
//       widow_widower: "Widowed",
//       separated: "Separated",
//       single: "Never Married",
//       unmarried: "Never Married",
//       maried: "Never Married", // Assuming this is a typo for "married"
//       married: "Never Married",
//     };

//     // Check if it's in our map
//     const lowerCaseStatus = status.toLowerCase();
//     if (statusMap[lowerCaseStatus]) {
//       return statusMap[lowerCaseStatus];
//     }

//     // Convert snake_case to title case as fallback
//     if (status.includes("_")) {
//       return status
//         .split("_")
//         .map(
//           (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//         )
//         .join(" ");
//     }

//     return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
//   };

//   // Get opposite gender of the logged in user using the currentUserGender state
//   const getOppositeGender = () => {
//     if (!currentUserGender) return null;

//     return currentUserGender === "male" ? "female" : "male";
//   };

//   const filteredData = Array.isArray(users)
//     ? users.filter((item) => {
//         if (!item) return false;

//         const normalizedMaritalStatus = normalizeMaritalStatus(
//           item.marital_status
//         );
//         const isManglik = item.manglik === true || item.manglik === "true";
//         const oppositeGender = getOppositeGender();
//         const age = parseInt(item.age);
//         const isNRI =
//           item.nri_status === true ||
//           item.nri_status === "true" ||
//           item.nri_status === "yes";
//         const userOccupation = item.occupation || "";

//         // Only show profiles of opposite gender based on currentUserGender
//         if (oppositeGender && item.gender?.toLowerCase() !== oppositeGender) {
//           return false;
//         }

//         // Apply age filter if values are set
//         if (filters.ageMin && !isNaN(age) && age < parseInt(filters.ageMin)) {
//           return false;
//         }

//         if (filters.ageMax && !isNaN(age) && age > parseInt(filters.ageMax)) {
//           return false;
//         }

//         return (
//           (filters.manglik === "" ||
//             (filters.manglik === "true" && isManglik) ||
//             (filters.manglik === "false" && !isManglik)) &&
//           (filters.maritalStatus === "" ||
//             normalizedMaritalStatus === filters.maritalStatus) &&
//           (filters.nriStatus === "" ||
//             (filters.nriStatus === "true" && isNRI) ||
//             (filters.nriStatus === "false" && !isNRI)) &&
//           (filters.occupation === "" ||
//             userOccupation === filters.occupation) &&
//           (searchTerm === "" ||
//             item.name?.toLowerCase().includes(searchTerm.toLowerCase()))
//         );
//       })
//     : [];

//   // Sort filtered data by name alphabetically for better user experience
//   const sortedFilteredData = [...filteredData].sort((a, b) =>
//     a.name?.toLowerCase() > b.name?.toLowerCase() ? 1 : -1
//   );

//   // Get current profiles for pagination
//   const indexOfLastProfile = currentPage * profilesPerPage;
//   const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
//   const currentProfiles = sortedFilteredData.slice(
//     indexOfFirstProfile,
//     indexOfLastProfile
//   );

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Extract unique values for each filter category
//   const uniqueValues = (key) => {
//     const values = [];
//     if (!Array.isArray(users)) return values;

//     users.forEach((user) => {
//       if (!user) return;

//       let value;

//       if (key === "maritalStatus") {
//         value = normalizeMaritalStatus(user.marital_status);
//       } else if (key === "manglik") {
//         value = user.manglik?.toString();
//       } else if (key === "gender") {
//         value =
//           user.gender?.charAt(0).toUpperCase() +
//           user.gender?.slice(1).toLowerCase();
//       } else {
//         value = user[key === "maritalStatus" ? "marital_status" : key];
//       }

//       if (
//         value &&
//         !values.includes(value) &&
//         value !== "undefined" &&
//         value !== "null"
//       ) {
//         values.push(value);
//       }
//     });

//     // Sort values alphabetically
//     return values.sort();
//   };

//   // Format options for better readability
//   const formatOption = (option) => {
//     // Check if option is undefined, null, or not a string
//     if (option === undefined || option === null) return "";

//     // Convert to string if it's not already
//     const optionStr = String(option);

//     return optionStr
//       .replace(/_/g, " ")
//       .replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   // Add cardVariants for consistent hover animation
//   const cardVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     hover: {
//       scale: 1.05,
//       backgroundColor: "#E5D3C8", // Brown/beige on hover (matches membership page)
//       transition: { duration: 0.3 }, // Match transition from membership page
//     },
//   };

//   // Predefined options for more consistent filtering
//   const predefinedOptions = {
//     manglik: ["true", "false"],
//     nriStatus: ["true", "false"],
//     // Standardized list of marital statuses
//     maritalStatus: ["Never Married", "Divorced", "Widowed", "Separated"],
//   };

//   // Filter options configuration for reuse
//   const filterOptions = [
//     {
//       label: "Occupation",
//       name: "occupation",
//       options: [
//         { value: "", label: "Any" },
//         { value: "Private Job", label: "Private Job" },
//         { value: "Government Job", label: "Government Job" },
//         { value: "Business Owner", label: "Business Owner" },
//       ],
//     },
//     {
//       label: "NRI Status",
//       name: "nriStatus",
//       options: [
//         { value: "", label: "Any" },
//         { value: "false", label: "No" },
//         { value: "true", label: "Yes" },
//       ],
//     },
//     {
//       label: "Marital Status / History",
//       name: "maritalStatus",
//       // Use only the standardized list
//       options: predefinedOptions.maritalStatus,
//     },
//     {
//       label: "Manglik",
//       name: "manglik",
//       options: [
//         { value: "", label: "Any" },
//         { value: "true", label: "Yes" },
//         { value: "false", label: "No" },
//       ],
//     },
//   ];

//   // Pagination component
//   const Pagination = ({
//     profilesPerPage,
//     totalProfiles,
//     currentPage,
//     paginate,
//   }) => {
//     const pageNumbers = [];

//     for (let i = 1; i <= Math.ceil(totalProfiles / profilesPerPage); i++) {
//       pageNumbers.push(i);
//     }

//     // Determine which page numbers to show
//     let displayedPageNumbers = [];
//     const totalPages = pageNumbers.length;

//     if (totalPages <= 5) {
//       // If 5 or fewer pages, show all
//       displayedPageNumbers = pageNumbers;
//     } else {
//       // Always include current page
//       displayedPageNumbers.push(currentPage);

//       // Add page numbers before current page
//       for (let i = 1; i <= 2; i++) {
//         if (currentPage - i > 0) {
//           displayedPageNumbers.unshift(currentPage - i);
//         }
//       }

//       // Add page numbers after current page
//       for (let i = 1; i <= 2; i++) {
//         if (currentPage + i <= totalPages) {
//           displayedPageNumbers.push(currentPage + i);
//         }
//       }

//       // If we have room to add more pages at the beginning
//       while (displayedPageNumbers.length < 5 && displayedPageNumbers[0] > 1) {
//         displayedPageNumbers.unshift(displayedPageNumbers[0] - 1);
//       }

//       // If we have room to add more pages at the end
//       while (
//         displayedPageNumbers.length < 5 &&
//         displayedPageNumbers[displayedPageNumbers.length - 1] < totalPages
//       ) {
//         displayedPageNumbers.push(
//           displayedPageNumbers[displayedPageNumbers.length - 1] + 1
//         );
//       }

//       // Add ellipsis indicators
//       if (displayedPageNumbers[0] > 1) {
//         displayedPageNumbers = [
//           1,
//           "...",
//           ...displayedPageNumbers.slice(displayedPageNumbers[0] === 2 ? 1 : 0),
//         ];
//       }

//       if (displayedPageNumbers[displayedPageNumbers.length - 1] < totalPages) {
//         displayedPageNumbers = [...displayedPageNumbers, "...", totalPages];
//       }
//     }

//     return (
//       <nav className="flex justify-center mt-8">
//         <ul className="flex space-x-2">
//           {/* Previous button */}
//           <li>
//             <button
//               onClick={() =>
//                 currentPage > 1 ? paginate(currentPage - 1) : null
//               }
//               disabled={currentPage === 1}
//               className={`px-3 py-2 rounded-md ${
//                 currentPage === 1
//                   ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   : "bg-[#4F2F1D] text-white hover:bg-[#6B4132]"
//               } transition duration-300`}
//             >
//               &laquo;
//             </button>
//           </li>

//           {/* Page numbers */}
//           {displayedPageNumbers.map((number, index) => (
//             <li key={index}>
//               {number === "..." ? (
//                 <span className="px-3 py-2">...</span>
//               ) : (
//                 <button
//                   onClick={() => paginate(number)}
//                   className={`px-3 py-2 rounded-md ${
//                     currentPage === number
//                       ? "bg-[#990000] text-white"
//                       : "bg-[#F5EDE7] text-[#4F2F1D] hover:bg-[#E5D3C8]"
//                   } transition duration-300`}
//                 >
//                   {number}
//                 </button>
//               )}
//             </li>
//           ))}

//           {/* Next button */}
//           <li>
//             <button
//               onClick={() =>
//                 currentPage < pageNumbers.length
//                   ? paginate(currentPage + 1)
//                   : null
//               }
//               disabled={
//                 currentPage === pageNumbers.length || pageNumbers.length === 0
//               }
//               className={`px-3 py-2 rounded-md ${
//                 currentPage === pageNumbers.length || pageNumbers.length === 0
//                   ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   : "bg-[#4F2F1D] text-white hover:bg-[#6B4132]"
//               } transition duration-300`}
//             >
//               &raquo;
//             </button>
//           </li>
//         </ul>
//       </nav>
//     );
//   };

//   // Loading indicator while authChecked is false
//   if (!authChecked) {
//     return (
//       <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
//         <Header />
//         <div className="flex-grow flex items-center justify-center">
//           <div className="text-[#4F2F1D] text-xl">
//             Checking authentication...
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   // Render incomplete profile message
//   if (!profileComplete) {
//     return (
//       <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
//         <Header />
//         <div className="flex-grow flex items-center justify-center">
//           <div className="bg-[#F5EDE7] p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
//             <h2
//               className="text-2xl mb-4 text-[#4F2F1D] text-center"
//               style={{
//                 fontFamily: "'Tiempos Headline', serif",
//                 fontWeight: 400,
//               }}
//             >
//               Profile Incomplete
//             </h2>
//             <p
//               className="text-[#6B4132] mb-6 text-center"
//               style={{
//                 fontFamily: "'Modern Era', sans-serif",
//                 fontWeight: 400,
//               }}
//             >
//               Your profile must be at least 70% complete to access the partner
//               search feature.
//             </p>
//             <div className="flex justify-center">
//               <button
//                 onClick={() => navigate("/profilepage")}
//                 className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-6 rounded-lg transition duration-300"
//                 style={{
//                   fontFamily: "'Modern Era', sans-serif",
//                   fontWeight: 400,
//                 }}
//               >
//                 Complete Your Profile
//               </button>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
//         <Header />
//         <div className="flex-grow flex items-center justify-center">
//           <div className="text-[#4F2F1D] text-xl">Loading profiles...</div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (error && profileComplete) {
//     return (
//       <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
//         <Header />
//         <div className="flex-grow flex items-center justify-center">
//           <div className="text-[#990000] text-xl">{error}</div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
//       <Header />

//       {/* Profile Slider */}
//       {/* <ProfileSlider /> */}

//       {/* Search Bar and Filter Toggle for Mobile */}
//       <div className="container mx-auto px-4 sm:px-8 my-4">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <input
//             type="text"
//             placeholder="Search by name..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className="w-full p-3 border border-[#E5D3C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
//             style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
//           />
//           <button
//             className="md:hidden bg-[#4F2F1D] text-[#E5D3C8] px-4 py-2 rounded-lg"
//             onClick={() => setShowFilters(!showFilters)}
//           >
//             {showFilters ? "Hide Filters" : "Show Filters"}
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row flex-grow">
//         {/* Mobile Filter Overlay */}
//         <div
//           className={`fixed inset-0 z-50 md:hidden bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
//             showFilters ? "opacity-100" : "opacity-0 pointer-events-none"
//           }`}
//           onClick={() => setShowFilters(false)}
//         />

//         {/* Mobile Filters Sidebar */}
//         <div
//           className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-[#4F2F1D] to-[#6B4132] p-4 shadow-lg z-50 md:hidden transition-transform duration-300 overflow-y-auto ${
//             showFilters ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <div className="flex justify-between items-center mb-6">
//             <h2
//               className="text-2xl text-[#E5D3C8]"
//               style={{
//                 fontFamily: "'Tiempos Headline', serif",
//                 fontWeight: 400,
//               }}
//             >
//               Filters
//             </h2>
//             <button
//               className="text-[#E5D3C8] p-2"
//               onClick={() => setShowFilters(false)}
//             >
//               ✕
//             </button>
//           </div>

//           {/* Mobile Filter options */}
//           <div className="space-y-4">
//             {/* Age Range Filter for Mobile */}
//             <div className="mb-4">
//               <label
//                 className="block text-[#E5D3C8] mb-2"
//                 style={{
//                   fontFamily: "'Modern Era', sans-serif",
//                   fontWeight: 400,
//                 }}
//               >
//                 Age Range
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="number"
//                   name="ageMin"
//                   placeholder="Min"
//                   value={filters.ageMin}
//                   onChange={handleChange}
//                   min="18"
//                   max="100"
//                   className="w-1/2 p-3 border border-[#E5D3C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
//                   style={{
//                     fontFamily: "'Modern Era', sans-serif",
//                     fontWeight: 400,
//                   }}
//                 />
//                 <input
//                   type="number"
//                   name="ageMax"
//                   placeholder="Max"
//                   value={filters.ageMax}
//                   onChange={handleChange}
//                   min="18"
//                   max="100"
//                   className="w-1/2 p-3 border border-[#E5D3C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
//                   style={{
//                     fontFamily: "'Modern Era', sans-serif",
//                     fontWeight: 400,
//                   }}
//                 />
//               </div>
//             </div>

//             {filterOptions.map(({ label, name, options }, index) => (
//               <div className="mb-4" key={index}>
//                 <label
//                   className="block text-[#E5D3C8] mb-2"
//                   style={{
//                     fontFamily: "'Modern Era', sans-serif",
//                     fontWeight: 400,
//                   }}
//                 >
//                   {label}
//                 </label>
//                 <select
//                   name={name}
//                   value={filters[name]}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-[#E5D3C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
//                   style={{
//                     fontFamily: "'Modern Era', sans-serif",
//                     fontWeight: 400,
//                   }}
//                 >
//                   <option value="">Select {label}</option>
//                   {Array.isArray(options)
//                     ? options.map((option, idx) => {
//                         if (
//                           option &&
//                           typeof option === "object" &&
//                           "value" in option
//                         ) {
//                           return (
//                             <option key={idx} value={option.value}>
//                               {option.label || formatOption(option.value)}
//                             </option>
//                           );
//                         } else {
//                           return (
//                             <option key={idx} value={option}>
//                               {formatOption(option)}
//                             </option>
//                           );
//                         }
//                       })
//                     : null}
//                 </select>
//               </div>
//             ))}

//             <button
//               className="w-full bg-[#4F2F1D] hover:bg-[#6B4132] text-[#E5D3C8] font-bold py-2 px-4 rounded-lg transition duration-300 mt-4"
//               style={{
//                 fontFamily: "'Modern Era', sans-serif",
//                 fontWeight: 400,
//               }}
//               onClick={handleClearFilters}
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>

//         {/* Desktop Filters Sidebar - Updated to match Membership style */}
//         <div className="hidden md:block w-1/4 p-6 bg-[#F5EDE7] shadow-lg md:sticky md:top-0 md:h-screen md:overflow-y-auto ml-8 rounded-lg border border-[#E5D3C8]">
//           <h2
//             className="text-2xl mb-6 text-[#4F2F1D]"
//             style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
//           >
//             Filters
//           </h2>

//           {/* Age Range Filter for Desktop */}
//           <div className="mb-6">
//             <label
//               className="block text-[#6B4132] mb-2"
//               style={{
//                 fontFamily: "'Modern Era', sans-serif",
//                 fontWeight: 400,
//               }}
//             >
//               Age Range
//             </label>
//             <div className="flex space-x-3 items-center">
//               <input
//                 type="number"
//                 name="ageMin"
//                 placeholder="Min"
//                 value={filters.ageMin}
//                 onChange={handleChange}
//                 min="18"
//                 max="100"
//                 className="w-1/2 p-3 border border-[#E5D3C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
//                 style={{
//                   fontFamily: "'Modern Era', sans-serif",
//                   fontWeight: 400,
//                 }}
//               />
//               <span className="text-[#6B4132]">to</span>
//               <input
//                 type="number"
//                 name="ageMax"
//                 placeholder="Max"
//                 value={filters.ageMax}
//                 onChange={handleChange}
//                 min="18"
//                 max="100"
//                 className="w-1/2 p-3 border border-[#E5D3C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
//                 style={{
//                   fontFamily: "'Modern Era', sans-serif",
//                   fontWeight: 400,
//                 }}
//               />
//             </div>
//           </div>

//           {filterOptions.map(({ label, name, options }, index) => (
//             <div className="mb-4" key={index}>
//               <label
//                 className="block text-[#6B4132] mb-2"
//                 style={{
//                   fontFamily: "'Modern Era', sans-serif",
//                   fontWeight: 400,
//                 }}
//               >
//                 {label}
//               </label>
//               <select
//                 name={name}
//                 value={filters[name]}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-[#E5D3C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
//                 style={{
//                   fontFamily: "'Modern Era', sans-serif",
//                   fontWeight: 400,
//                 }}
//               >
//                 <option value="">Any {label}</option>
//                 {Array.isArray(options)
//                   ? options.map((option, idx) => {
//                       // Handle both object options and string options
//                       if (
//                         option &&
//                         typeof option === "object" &&
//                         "value" in option
//                       ) {
//                         return (
//                           <option key={idx} value={option.value}>
//                             {option.label || formatOption(option.value)}
//                           </option>
//                         );
//                       } else {
//                         return (
//                           <option key={idx} value={option}>
//                             {formatOption(option)}
//                           </option>
//                         );
//                       }
//                     })
//                   : null}
//               </select>
//             </div>
//           ))}

//           <button
//             className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded-lg transition duration-300"
//             style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
//             onClick={handleClearFilters}
//           >
//             Clear Filters
//           </button>
//         </div>

//         {/* Profile List - Updated to match Membership style */}
//         <div className="w-full md:w-3/4 p-4 sm:p-8">
//           {/* Results count */}
//           <div className="mb-4 text-[#4F2F1D]">
//             <p>
//               Showing {currentProfiles.length} of {sortedFilteredData.length}{" "}
//               profiles
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
//             {sortedFilteredData.length === 0 ? (
//               <div className="col-span-2 text-center py-8 text-[#4F2F1D]">
//                 No profiles match your search criteria.
//               </div>
//             ) : (
//               currentProfiles.map((item) => (
//                 <motion.div
//                   key={item._id}
//                   variants={cardVariants}
//                   initial="initial"
//                   animate="animate"
//                   whileHover="hover"
//                   className="bg-[#F5EDE7] p-4 sm:p-6 rounded-lg shadow-lg cursor-pointer border border-[#E5D3C8]"
//                   onClick={() => handleProfileClick(item)}
//                 >
//                   <div className="flex items-center flex-col sm:flex-row">
//                     <img
//                       src={item.profile_picture || profileIcon}
//                       alt={item.name}
//                       className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 sm:mb-0 sm:mr-6 object-cover"
//                     />
//                     <div className="text-center sm:text-left">
//                       <h3
//                         className="text-lg sm:text-xl mb-2 text-[#4F2F1D]"
//                         style={{
//                           fontFamily: "'Tiempos Headline', serif",
//                           fontWeight: 400,
//                         }}
//                       >
//                         {item.name}
//                       </h3>
//                       <p
//                         className="text-sm sm:text-base text-[#6B4132] mb-1"
//                         style={{
//                           fontFamily: "'Modern Era', sans-serif",
//                           fontWeight: 400,
//                         }}
//                       >
//                         <strong>Age:</strong> {item.age || "Not specified"}
//                       </p>
//                       <p
//                         className="text-sm sm:text-base text-[#6B4132] mb-1"
//                         style={{
//                           fontFamily: "'Modern Era', sans-serif",
//                           fontWeight: 400,
//                         }}
//                       >
//                         <strong>Occupation:</strong>{" "}
//                         {formatOption(item.occupation) || "Not specified"}
//                       </p>
//                       <p
//                         className="text-sm sm:text-base text-[#6B4132] mb-1"
//                         style={{
//                           fontFamily: "'Modern Era', sans-serif",
//                           fontWeight: 400,
//                         }}
//                       >
//                         <strong>NRI:</strong>{" "}
//                         {item.nri_status === true ||
//                         item.nri_status === "true" ||
//                         item.nri_status === "yes"
//                           ? "Yes"
//                           : "No"}
//                       </p>
//                       <p
//                         className="text-sm sm:text-base text-[#6B4132] mb-1"
//                         style={{
//                           fontFamily: "'Modern Era', sans-serif",
//                           fontWeight: 400,
//                         }}
//                       >
//                         <strong>Marital Status:</strong>{" "}
//                         {normalizeMaritalStatus(item.marital_status) ||
//                           "Not specified"}
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))
//             )}
//           </div>

//           {/* Pagination */}
//           {sortedFilteredData.length > 0 && (
//             <Pagination
//               profilesPerPage={profilesPerPage}
//               totalProfiles={sortedFilteredData.length}
//               currentPage={currentPage}
//               paginate={paginate}
//             />
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default FindPartner;
