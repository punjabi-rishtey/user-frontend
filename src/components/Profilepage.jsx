import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  FaCog,
  FaSignOutAlt,
  FaHeart,
  FaUser,
  FaComments,
  FaMoneyBill,
} from "react-icons/fa";
import { Menu, X } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import PreferencesPopup from "./PreferencesPopup";


// Add the helper functions here
const generateFeetOptions = () => {
  const options = [];
  for (let feet = 4; feet <= 7; feet++) {
    options.push({ value: feet.toString(), label: `${feet} ft` });
  }
  return options;
};

const generateInchesOptions = () => {
  const options = [];
  for (let inches = 0; inches <= 11; inches++) {
    options.push({ value: inches.toString(), label: `${inches} in` });
  }
  return options;
};

// Then define HeightDropdowns component
function HeightDropdowns({ value, onChange, isEditing }) {
  if (!value) return null;

  if (isEditing) {
    return (
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Height
        </label>
        <div className="flex gap-2">
          <select
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="height.feet"
            value={value.feet || ""}
            onChange={onChange}
          >
            <option value="">Feet</option>
            {generateFeetOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="height.inches"
            value={value.inches || ""}
            onChange={onChange}
          >
            <option value="">Inches</option>
            {generateInchesOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Height
        </label>
        <p className="text-gray-600">
          {`${value.feet || ""}' ${value.inches || ""}"`}
        </p>
      </div>
    );
  }
}

// Then define InfoRow component
function InfoRow({
  label,
  value,
  isEditing,
  name,
  onChange,
  type = "text",
  options,
  isPassword
}) {
  const getDisplayValue = () => {
    if (type === "select" && options) {
      // Handle different types of values
      if (typeof value === "boolean") {
        return value ? "Yes" : "No";
      }
      if (value === undefined || value === null || value === "") {
        return "";
      }
      const option = options.find(opt => opt.value === value.toString());
      return option ? option.label : value;
    }
    if (isPassword) {
      return "••••••••";
    }
    return value;
  };

  if (name === "height") {
    return (
      <HeightDropdowns
        value={value}
        onChange={onChange}
        isEditing={isEditing}
      />
    );
  }

  if (isEditing) {
    return (
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        {type === "select" ? (
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name={name}
            value={value}
            onChange={onChange}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type={type}
            placeholder={label}
            name={name}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    );
  } else {
    return (
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <p className="text-gray-600">{getDisplayValue()}</p>
      </div>
    );
  }
}




export default function ProfileSettings() {
  const { user, updateUser, logout } = useAuth(); // ✅ Correct way
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) return <div>Loading...</div>; // ✅ Prevents errors when `user` is null
  

  // Keep all your existing states
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingProfession, setIsEditingProfession] = useState(false);
  const [isEditingFamily, setIsEditingFamily] = useState(false);
  const [loadingEducation, setLoadingEducation] = useState(false);

  const [loadingFamily, setLoadingFamily] = useState(false);
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [loadingAstrology, setLoadingAstrology] = useState(false);
  const [isEditingAstrology, setIsEditingAstrology] = useState(false);
  const [isEditingHobbies, setIsEditingHobbies] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const token = localStorage.getItem("token"); // Retrieve token
  console.log(localStorage.getItem("token"));

  // Ensure `user` is not null before accessing properties

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    mobile: user?.mobile || "",
    email: user?.email || "",
    password: "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    religion: user?.religion || "",
    marital_status: user?.marital_status || "",
    age: user?.age || 0,
  });

  const [personalData, setPersonalData] = useState({
    height: {
      feet: user?.height?.feet || "5",
      inches: user?.height?.inches || "0"
    },
    caste: user?.caste || "",
    language: user?.language || "",
    mangalik: user?.mangalik || false,
    birth_details: {
      birth_time: user?.birth_details?.birth_time || "",
      birth_place: user?.birth_details?.birth_place || "",
    },
    physical_attributes: {
      skin_tone: user?.physical_attributes?.skin_tone || "wheatish",
      body_type: user?.physical_attributes?.body_type || "",
      physical_disability: user?.physical_attributes?.physical_disability || "false",
      disability_reason: user?.physical_attributes?.disability_reason || "",
    },
    lifestyle: {
      smoke: user?.lifestyle?.smoke || "no",
      drink: user?.lifestyle?.drink || "no",
      veg_nonveg: user?.lifestyle?.veg_nonveg || "veg",
      nri_status: user?.lifestyle?.nri_status || "false",
    },
    home_address: {
      address: user?.home_address?.address || "",
      city: user?.home_address?.city || "",
    },
  });

  const [hobbiesData, setHobbiesData] = useState({
    hobbies: user?.hobbies || [],
    newHobby: ""
  });

  const [professionData, setProfessionData] = useState({
    occupation: user?.occupation || "",
    designation: user?.designation || "",
    working_with: user?.working_with || "",
    income: user?.income || "",
    work_address: {
      address: user?.work_address?.address || "",
      city: user?.work_address?.city || "",
    }
  });

  const [familyData, setFamilyData] = useState({
    family_value: user?.family_value || "",
    family_type: user?.family_type || "",
    mother: {
      name: user?.mother?.name || "",
      occupation: user?.mother?.occupation || "",
    },
    father: {
      name: user?.father?.name || "",
      occupation: user?.father?.occupation || "",
    },
    siblings: {
      brother_count: user?.siblings?.brother_count || 0,
      sister_count: user?.siblings?.sister_count || 0,
    },
  });

  const [educationData, setEducationData] = useState({
    education_level: user?.education_level || "",
    education_field: user?.education_field || "",
    school: {
      name: user?.school?.name || "",
      city: user?.school?.city || "",
    },
    college: {
      name: user?.college?.name || "",
      city: user?.college?.city || "",
      passout_year: user?.college?.passout_year || "",
    },
  });

  const [astrologyData, setAstrologyData] = useState({
    rashi_nakshatra: "",
    gotra: "",
  });

  
  useEffect(() => {
    if (user && user._id) {
      fetchAstrologyDetails();
    }
  }, [user?._id]); // ✅ Depend only on `user._id`
  
  
  const fetchAstrologyDetails = async () => {
    if (!user?._id) return; // ✅ Prevent API calls if user ID is missing
  
    setLoadingAstrology(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        logout();
        return;
      }
  
      const response = await axios.get(
        `https://backend-nm1z.onrender.com/api/astrologies/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
  
      setAstrologyData(response.data);
    } catch (error) {
      console.error("Error fetching astrology details:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        logout();
      } else {
        alert("Failed to fetch astrology details.");
      }
    }
    setLoadingAstrology(false);
  };
  
  
  useEffect(() => {
    if (user?._id) {
      fetchProfessionDetails();
    }
  }, [user]);
  
  const fetchProfessionDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        logout();
        return;
      }
  
      const response = await axios.get(
        `https://backend-nm1z.onrender.com/api/professions/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      setProfessionData(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        logout();
      } else {
        console.error("Error fetching profession details:", error);
        alert("Failed to fetch profession details.");
      }
    }
  };

  const handleSaveProfession = async () => {
    try {
      const token = localStorage.getItem("token");
  
      await axios.put(
        `https://backend-nm1z.onrender.com/api/professions/${user._id}`,
        professionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      setIsEditingProfession(false);
      alert("Profession details updated successfully!");
    } catch (error) {
      console.error("Error saving profession details:", error);
      alert("Failed to update profession details. Please try again.");
    }
  };

  
  useEffect(() => {
    if (user?._id) {
      fetchFamilyDetails();
    }
  }, [user]);
  
  const fetchFamilyDetails = async () => {
    setLoadingFamily(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        logout();
        return;
      }
  
      const response = await axios.get(
        `https://backend-nm1z.onrender.com/api/families/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      setFamilyData(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        logout();
      } else {
        console.error("Error fetching family details:", error);
        alert("Failed to fetch family details.");
      }
    }
    setLoadingFamily(false);
  };


  const handleFamilyChange = (e) => {
    const { name, value } = e.target;
    setFamilyData((prev) => {
      if (name.includes(".")) {
        const [section, field] = name.split(".");
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  
  useEffect(() => {
    if (user?._id) {
      fetchEducationDetails();
    }
  }, [user]);
  
  const fetchEducationDetails = async () => {
    setLoadingEducation(true); // ✅ Start loading before API call
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        logout();
        return;
      }
  
      const response = await axios.get(
        `https://backend-nm1z.onrender.com/api/educations/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      setEducationData(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        logout();
      } else {
        console.error("Error fetching education details:", error);
        alert("Failed to fetch education details.");
      }
    }
    setLoadingEducation(false); // ✅ Stop loading after API call (both success & error cases)
  };
  
  const handleSaveEducation = async () => {
    setLoadingEducation(true); // ✅ Show loading when saving
    try {
      const token = localStorage.getItem("token");
  
      await axios.put(
        `https://backend-nm1z.onrender.com/api/educations/${user._id}`,
        educationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      setIsEditingEducation(false);
      alert("Education details updated successfully!");
    } catch (error) {
      console.error("Error saving education details:", error);
      alert("Failed to update education details. Please try again.");
    }
    setLoadingEducation(false); // ✅ Stop loading after saving
  };







  const [languageData, setLanguageData] = useState({
    languages: user?.languages || [],
    selectedLanguage: ""
  });

  const menuItems = [
    { icon: <FaHeart className="text-[#B31312]" />, label: "My Matches"},
    { icon: <FaComments className="text-[#B31312]" />, label: "Interests"},
    { icon: <FaComments className="text-[#B31312]" />, label: "Chat List"},
    { icon: <FaMoneyBill className="text-[#B31312]" />, label: "Plan"},
    { icon: <FaCog className="text-[#B31312]" />, label: "Settings", active: true }
  ];

  if (!user) {
    return <div>Loading...</div>; // or redirect to login page
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    try {
      const updatedUser = {
        ...user,
        name: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        gender: formData.gender,
        dob: formData.dob,
        religion: formData.religion,
        marital_status: formData.marital_status,
      };

      const success = updateUser(updatedUser);

      if (success) {
        setIsEditing(false);
        // Show success message (optional)
        alert("Profile updated successfully!");
      } else {
        // Show error message (optional)
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("An error occurred while saving your profile.");
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user.name,
      mobile: user.mobile,
      email: user.email,
      password: "",
      gender: user.gender,
      dob: user.dob,
      religion: user.religion,
      marital_status: user.marital_status,
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Navigate to home page after logout
  };

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalData((prev) => {
      if (name.includes(".")) {
        const [section, field] = name.split(".");
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSavePersonal = () => {
    try {
      const updatedUser = {
        ...user,
        ...personalData,
        languages: languageData.languages
      };

      const success = updateUser(updatedUser);

      if (success) {
        setIsEditingPersonal(false);
        alert("Personal details updated successfully!");
      } else {
        alert("Failed to update personal details. Please try again.");
      }
    } catch (error) {
      console.error("Error saving personal details:", error);
      alert("An error occurred while saving your personal details.");
    }
  };

  const handleCancelPersonal = () => {
    setPersonalData({
      height: {
        feet: user.height?.feet || "5",
        inches: user.height?.inches || "0"
      },
      caste: user.caste || "",
      language: user.language || "",
      mangalik: user.mangalik || false,
      birth_details: {
        birth_time: user.birth_details?.birth_time || "",
        birth_place: user.birth_details?.birth_place || "",
      },
      physical_attributes: {
        skin_tone: user.physical_attributes?.skin_tone || "wheatish",
        body_type: user.physical_attributes?.body_type || "",
        physical_disability: user.physical_attributes?.physical_disability || "false",
        disability_reason: user.physical_attributes?.disability_reason || "",
      },
      lifestyle: {
        smoke: user.lifestyle?.smoke || "no",
        drink: user.lifestyle?.drink || "no",
        veg_nonveg: user.lifestyle?.veg_nonveg || "veg",
        nri_status: user.lifestyle?.nri_status || "false",
      },
      home_address: {
        address: user.home_address?.address || "",
        city: user.home_address?.city || "",
      },
    });
    setLanguageData({
      languages: user?.languages || [],
      selectedLanguage: ""
    });
    setIsEditingPersonal(false);
  };

  const handleProfessionChange = (e) => {
    const { name, value } = e.target;
  
    setProfessionData((prev) => {
      // Handle nested fields for work_address
      if (name.startsWith("work_address.")) {
        return {
          ...prev,
          work_address: {
            ...prev.work_address,
            [name.split(".")[1]]: value,
          },
        };
      }
  
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleCancelProfession = () => {
    setProfessionData({
      occupation: user?.occupation || "",
      designation: user?.designation || "",
      working_with: user?.working_with || "",
      income: user?.income || "",
      work_address: {
        address: user?.work_address?.address || "",
        city: user?.work_address?.city || "",
      }
    });
    setIsEditingProfession(false);
  };




  const handleSaveFamily = async () => {
    setLoadingFamily(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        logout();
        return;
      }
  
      await axios.put(
        `https://backend-nm1z.onrender.com/api/families/${user._id}`,
        familyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      setIsEditingFamily(false);
      alert("Family details updated successfully!");
    } catch (error) {
      console.error("Error saving family details:", error);
      alert("Failed to update family details. Please try again.");
    }
    setLoadingFamily(false);
  };
  

  const handleCancelFamily = () => {
    setFamilyData({
      family_value: user.family_value || "",
      family_type: user.family_type || "",
      mother: {
        name: user.mother?.name || "",
        occupation: user.mother?.occupation || "",
      },
      father: {
        name: user.father?.name || "",
        occupation: user.father?.occupation || "",
      },
      siblings: {
        brother_count: user.siblings?.brother_count || 0,
        sister_count: user.siblings?.sister_count || 0,
      },
    });
    setIsEditingFamily(false);
  };


  // const handleCancelFamily = () => {
  //   fetchFamilyDetails(); // Fetch latest data from API instead of relying on old state
  //   setIsEditingFamily(false);
  // };
  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducationData((prev) => {
      if (name.includes(".")) {
        const [section, field] = name.split(".");
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleCancelEducation = () => {
    setEducationData({
      school_details: {
        name: user?.school_details?.name || "",
        city: user?.school_details?.city || "",
      },
      college_details: {
        name: user?.college_details?.name || "",
        city: user?.college_details?.city || "",
        passout_year: user?.college_details?.passout_year || "",
      },
      education_level: user?.education_level || "",
      education_field: user?.education_field || "",
    });
    setIsEditingEducation(false);
  };

  const handleAstrologyChange = (e) => {
    const { name, value } = e.target;
    setAstrologyData({
      ...astrologyData,
      [name]: value,
    });
  };

  const handleSaveAstrology = async () => {
    setLoadingAstrology(true);
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        alert("Session expired. Please log in again.");
        logout();  // Log out user if token is missing
        return;
      }
  
      const response = await axios.put(
        `https://backend-nm1z.onrender.com/api/astrologies/${user._id}`,
        astrologyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        alert("Astrology details updated successfully!");
        setIsEditingAstrology(false);
      } else {
        alert("Unexpected response from server. Please try again.");
      }
  
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        logout();
      } else if (error.response?.status === 500) {
        alert("Server error! Please try again later.");
      } else {
        console.error("Error saving astrology details:", error);
        alert("Failed to update astrology details. Please try again.");
      }
    }
    setLoadingAstrology(false);
  };
  
    


  const handleCancelAstrology = () => {
    fetchAstrologyDetails(); // Re-fetch from API instead of using old user data
    setIsEditingAstrology(false);
  };
  

  const handleSaveHobbies = () => {
    const updatedUser = {
      ...user,
      hobbies: hobbiesData.hobbies
    };
    const success = updateUser(updatedUser);
    if (success) {
      setIsEditingHobbies(false);
    }
  };

  const handleCancelHobbies = () => {
    setHobbiesData({
      hobbies: user?.hobbies || [],
      newHobby: ""
    });
    setIsEditingHobbies(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FCF9F2]">
      <Header />
      
      {/* Mobile Menu Button */}
      <div className="md:hidden px-4 py-2 border-b bg-white">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center space-x-2 text-[#B31312]"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
          <span>Menu</span>
        </button>
      </div>

      <div className="flex-grow flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-white shadow-lg m-4 rounded-lg">
          <div className="p-5">
            <div className="text-center">
              <img
                src={user?.profilePicture || "/profile.jpg"}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto border-2 border-[#B31312]"
              />
              <h2 className="text-lg mt-3 text-[#111111]">
                {user?.name}
              </h2>
              <p className="text-sm text-[#333333]">
                {user?.profileType} User | {user?.location?.city}
              </p>
            </div>
            <nav className="mt-6 space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300 ${
                    item.active ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#B31312] transition duration-300"
              >
                <FaSignOutAlt />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50">
              <div className="p-5">
                <div className="text-center">
                  <img
                    src={user?.profilePicture || "/profile.jpg"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto border-2 border-[#B31312]"
                  />
                  <h2 className="text-lg mt-3 text-[#111111]">
                    {user?.name}
                  </h2>
                  <p className="text-sm text-[#333333]">
                    {user?.profileType} User | {user?.location?.city}
                  </p>
                </div>
                <nav className="mt-6 space-y-2">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300 ${
                        item.active ? "bg-gray-100 font-semibold" : ""
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#B31312] transition duration-300"
                  >
                    <FaSignOutAlt />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl text-[#111111] mb-6">
            Profile Settings
          </h1>
          
          {/* Profile Sections */}
          <div className="space-y-6">
            {/* Basic Info Section */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
              <h3 
                className="text-lg md:text-xl text-[#111111] mb-4"
                style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
              >
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow
                  label="Full name"
                  value={formData.fullName}
                  isEditing={isEditing}
                  name="fullName"
                  onChange={handleChange}
                />
                <InfoRow
                  label="Mobile"
                  value={formData.mobile}
                  isEditing={isEditing}
                  name="mobile"
                  onChange={handleChange}
                />
                <InfoRow
                  label="Email id"
                  value={formData.email}
                  isEditing={isEditing}
                  name="email"
                  onChange={handleChange}
                />
                <InfoRow
                  label="Password"
                  value={formData.password}
                  isEditing={isEditing}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  isPassword
                />
                <InfoRow
                  label="Gender"
                  value={formData.gender}
                  isEditing={isEditing}
                  name="gender"
                  onChange={handleChange}
                  type="select"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                />
                <InfoRow
                  label="Date of Birth"
                  value={formData.dob}
                  isEditing={isEditing}
                  name="dob"
                  onChange={handleChange}
                  type="date"
                />
                <InfoRow
                  label="Religion"
                  value={formData.religion}
                  isEditing={isEditing}
                  name="religion"
                  onChange={handleChange}
                  type="select"
                  options={[
                    { value: "hindu", label: "Hindu" },
                    { value: "sikh", label: "Sikh" },
                    { value: "jain", label: "Jain" },
                    { value: "buddhist", label: "Buddhist" },
                  ]}
                />
                <InfoRow
                  label="Marital Status"
                  value={formData.marital_status}
                  isEditing={isEditing}
                  name="marital_status"
                  onChange={handleChange}
                  type="select"
                  options={[
                    { value: "never_married", label: "Never Married" },
                    { value: "divorced", label: "Divorced" },
                    { value: "widow_widower", label: "Widow/Widower" },
                    { value: "awaiting_divorce", label: "Awaiting Divorce" },
                    { value: "annulled", label: "Annulled" },
                  ]}
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg transition duration-300"
                      style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg transition duration-300"
                      style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg transition duration-300"
                    style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {/* Personal Details Section */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
              <h3 
                className="text-lg md:text-xl text-[#111111] mb-4"
                style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
              >
                Personal Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow
                  label="Height"
                  value={personalData.height}
                  isEditing={isEditingPersonal}
                  name="height"
                  onChange={handlePersonalChange}
                />
                <InfoRow
                  label="Caste"
                  value={personalData.caste}
                  isEditing={isEditingPersonal}
                  name="caste"
                  onChange={handlePersonalChange}
                  type="select"
                  options={[
                    { value: "khatri", label: "Khatri" },
                    { value: "arora", label: "Arora" },
                    { value: "brahmin", label: "Brahmin" },
                    { value: "other", label: "Other" },
                  ]}
                />
                <div className="col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Languages</label>
                  {isEditingPersonal ? (
                    <div className="flex gap-2 mb-2">
                      <select
                        value={languageData.selectedLanguage}
                        onChange={(e) => setLanguageData(prev => ({ ...prev, selectedLanguage: e.target.value }))}
                        className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">Select a language</option>
                        <option value="Hindi">Hindi</option>
                        <option value="English">English</option>
                        <option value="Punjabi">Punjabi</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Gujarati">Gujarati</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Kannada">Kannada</option>
                        <option value="Malayalam">Malayalam</option>
                        <option value="Urdu">Urdu</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Spanish">Spanish</option>
                      </select>
                      <button
                        onClick={() => {
                          if (languageData.selectedLanguage && !languageData.languages.includes(languageData.selectedLanguage)) {
                            setLanguageData(prev => ({
                              languages: [...prev.languages, prev.selectedLanguage],
                              selectedLanguage: ""
                            }));
                          }
                        }}
                        className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
                      >
                        Add
                      </button>
                    </div>
                  ) : null}
                  <div className="flex flex-wrap gap-2">
                    {languageData.languages.map((language, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-100 rounded-full px-4 py-2"
                      >
                        <span>{language}</span>
                        {isEditingPersonal && (
                          <button
                            onClick={() => {
                              setLanguageData(prev => ({
                                ...prev,
                                languages: prev.languages.filter((_, i) => i !== index)
                              }));
                            }}
                            className="ml-2 text-gray-500 hover:text-red-500"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <InfoRow
                  label="Mangalik Status"
                  value={personalData.mangalik}
                  isEditing={isEditingPersonal}
                  name="mangalik"
                  onChange={handlePersonalChange}
                  type="select"
                  options={[
                    { value: "manglik", label: "Manglik" },
                    { value: "partial_manglik", label: "Partial Manglik" },
                    { value: "non_manglik", label: "Non Manglik" },
                  ]}
                />
                <InfoRow
                  label="Birth Time"
                  value={personalData.birth_details.birth_time}
                  isEditing={isEditingPersonal}
                  name="birth_details.birth_time"
                  onChange={handlePersonalChange}
                  type="time"
                />
                <InfoRow
                  label="Birth Place"
                  value={personalData.birth_details.birth_place}
                  isEditing={isEditingPersonal}
                  name="birth_details.birth_place"
                  onChange={handlePersonalChange}
                />
                <InfoRow
                  label="Skin Tone"
                  value={personalData.physical_attributes.skin_tone}
                  isEditing={isEditingPersonal}
                  name="physical_attributes.skin_tone"
                  onChange={handlePersonalChange}
                  type="select"
                  options={[
                    { value: "very_fair", label: "Very Fair" },
                    { value: "fair", label: "Fair" },
                    { value: "wheatish", label: "Wheatish" },
                    { value: "wheatish_medium", label: "Wheatish Medium" },
                    { value: "wheatish_brown", label: "Wheatish Brown" },
                    { value: "medium", label: "Medium" },
                    { value: "brown", label: "Brown" },
                    { value: "dark", label: "Dark" }
                  ]}
                />
                <InfoRow
                  label="Body Type"
                  value={personalData.physical_attributes.body_type}
                  isEditing={isEditingPersonal}
                  name="physical_attributes.body_type"
                  onChange={handlePersonalChange}
                  type="select"
                  options={[
                    { value: "slim", label: "Slim" },
                    { value: "athletic", label: "Athletic" },
                    { value: "average", label: "Average" },
                  ]}
                />
                <InfoRow
                  label="Physical Disability"
                  value={personalData.physical_attributes.physical_disability}
                  isEditing={isEditingPersonal}
                  name="physical_attributes.physical_disability"
                  onChange={handlePersonalChange}
                  type="select"
                  options={[
                    { value: "true", label: "Yes" },
                    { value: "false", label: "No" }
                  ]}
                />
                <InfoRow
                  label="Disability Details"
                  value={personalData.physical_attributes.disability_reason}
                  isEditing={isEditingPersonal}
                  name="physical_attributes.disability_reason"
                  onChange={handlePersonalChange}
                />
                <InfoRow
                  label="Smoking"
                  value={personalData.lifestyle.smoke}
                  isEditing={isEditingPersonal}
                  name="lifestyle.smoke"
                  onChange={handlePersonalChange}
                  type="select"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                    { value: "occasionally", label: "Occasionally" }
                  ]}
                />
                <InfoRow
                  label="Drinking"
                  value={personalData.lifestyle.drink}
                  isEditing={isEditingPersonal}
                  name="lifestyle.drink"
                  onChange={handlePersonalChange}
                  type="select"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                    { value: "occasionally", label: "Occasionally" }
                  ]}
                />
                <InfoRow
                  label="Diet Preference"
                  value={personalData.lifestyle.veg_nonveg}
                  isEditing={isEditingPersonal}
                  name="lifestyle.veg_nonveg"
                  onChange={handlePersonalChange}
                  type="select"
                  options={[
                    { value: "veg", label: "Vegetarian" },
                    { value: "nonveg", label: "Non-Vegetarian" },
                    { value: "occasionally_nonveg", label: "Occasionally Non-Vegetarian" },
                  ]}
                />
                <InfoRow
                  label="NRI Status"
                  value={personalData.lifestyle.nri_status}
                  isEditing={isEditingPersonal}
                  name="lifestyle.nri_status"
                  onChange={handlePersonalChange}
                  type="select"
                  options={[
                    { value: "true", label: "Yes" },
                    { value: "false", label: "No" },
                  ]}
                />
                {/* Move Home Address section to the end */}
                <div className="col-span-2">
                  <h4 className="text-md font-semibold mb-2 mt-4">Home Address</h4>
                </div>
                <InfoRow
                  label="Address"
                  value={personalData.home_address?.address}
                  isEditing={isEditingPersonal}
                  name="home_address.address"
                  onChange={handlePersonalChange}
                />
                <InfoRow
                  label="City"
                  value={personalData.home_address?.city}
                  isEditing={isEditingPersonal}
                  name="home_address.city"
                  onChange={handlePersonalChange}
                />
              </div>
              {isEditingPersonal ? (
                <div className="mt-4 flex space-x-4">
                  <button
                    className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
                    onClick={handleSavePersonal}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
                    onClick={handleCancelPersonal}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="mt-4 px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
                  onClick={() => setIsEditingPersonal(true)}
                >
                  Edit
                </button>
              )}
            </div>

      {/* Family Details Section */}
<div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
  <h3 className="text-lg md:text-xl text-[#111111] mb-4">
    Family Details
  </h3>

  {loadingFamily ? (
    <p className="text-gray-600">Loading...</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InfoRow
        label="Family Value"
        value={familyData.family_value}
        isEditing={isEditingFamily}
        name="family_value"
        onChange={handleFamilyChange}
        type="select"
        options={[
          { value: "orthodox", label: "Orthodox" },
          { value: "traditional", label: "Traditional" },
          { value: "moderate", label: "Moderate" },
          { value: "liberal", label: "Liberal" },
          { value: "modern", label: "Modern" }
        ]}
      />
      <InfoRow
        label="Family Type"
        value={familyData.family_type}
        isEditing={isEditingFamily}
        name="family_type"
        onChange={handleFamilyChange}
        type="select"
        options={[
          { value: "nuclear", label: "Nuclear Family" },
          { value: "joint", label: "Joint Family" },
          { value: "extended", label: "Extended Family" },
          { value: "living_alone", label: "Living Alone" }
        ]}
      />
      <InfoRow
        label="Mother's Name"
        value={familyData.mother?.name}
        isEditing={isEditingFamily}
        name="mother.name"
        onChange={handleFamilyChange}
      />
      <InfoRow
        label="Mother's Occupation"
        value={familyData.mother?.occupation}
        isEditing={isEditingFamily}
        name="mother.occupation"
        onChange={handleFamilyChange}
      />
      <InfoRow
        label="Father's Name"
        value={familyData.father?.name}
        isEditing={isEditingFamily}
        name="father.name"
        onChange={handleFamilyChange}
      />
      <InfoRow
        label="Father's Occupation"
        value={familyData.father?.occupation}
        isEditing={isEditingFamily}
        name="father.occupation"
        onChange={handleFamilyChange}
      />
      <InfoRow
        label="Brother Count"
        value={familyData.siblings?.brother_count}
        isEditing={isEditingFamily}
        name="siblings.brother_count"
        onChange={handleFamilyChange}
      />
      <InfoRow
        label="Sister Count"
        value={familyData.siblings?.sister_count}
        isEditing={isEditingFamily}
        name="siblings.sister_count"
        onChange={handleFamilyChange}
      />
    </div>
  )}

  {isEditingFamily ? (
    <div className="mt-4 flex space-x-4">
      <button
        className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
        onClick={handleSaveFamily}
        disabled={loadingFamily}
      >
        {loadingFamily ? "Saving..." : "Save"}
      </button>
      <button
        className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
        onClick={handleCancelFamily}
      >
        Cancel
      </button>
    </div>
  ) : (
    <button
      className="mt-4 px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
      onClick={() => setIsEditingFamily(true)}
    >
      Edit
    </button>
  )}
</div>

{/* Education Details Section */}
<div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
  <h3 
    className="text-lg md:text-xl text-[#111111] mb-4"
    style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
  >
    Education Details
  </h3>

  {loadingEducation ? (
    <p className="text-gray-600">Loading education details...</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InfoRow
        label="Education Level"
        value={educationData.education_level || ""}
        isEditing={isEditingEducation}
        name="education_level"
        onChange={handleEducationChange}
        type="select"
        options={[
          { value: "high_school", label: "High School" },
          { value: "undergraduate", label: "Undergraduate" },
          { value: "graduate", label: "Graduate" },
          { value: "post_graduate", label: "Post Graduate" },
          { value: "doctorate", label: "Doctorate" },
        ]}
      />
      <InfoRow
        label="Education Field"
        value={educationData.education_field || ""}
        isEditing={isEditingEducation}
        name="education_field"
        onChange={handleEducationChange}
        type="select"
        options={[
          { value: "engineering", label: "Engineering" },
          { value: "medical", label: "Medical" },
          { value: "commerce", label: "Commerce" },
          { value: "arts", label: "Arts" },
          { value: "science", label: "Science" },
          { value: "other", label: "Other" },
        ]}
      />

      {/* School Details */}
      <div className="col-span-2">
        <h4 className="text-md font-semibold mb-2 mt-4">School Details</h4>
      </div>
      <InfoRow
        label="School Name"
        value={educationData?.school_details?.name || ""}
        isEditing={isEditingEducation}
        name="school_details.name"
        onChange={handleEducationChange}
      />
      <InfoRow
        label="School City"
        value={educationData?.school_details?.city || ""}
        isEditing={isEditingEducation}
        name="school_details.city"
        onChange={handleEducationChange}
      />

      {/* College Details */}
      <div className="col-span-2">
        <h4 className="text-md font-semibold mb-2 mt-4">College Details</h4>
      </div>
      <InfoRow
        label="College Name"
        value={educationData?.college_details?.name || ""}
        isEditing={isEditingEducation}
        name="college_details.name"
        onChange={handleEducationChange}
      />
      <InfoRow
        label="College City"
        value={educationData?.college_details?.city || ""}
        isEditing={isEditingEducation}
        name="college_details.city"
        onChange={handleEducationChange}
      />
      <InfoRow
        label="Passout Year"
        value={educationData?.college_details?.passout_year || ""}
        isEditing={isEditingEducation}
        name="college_details.passout_year"
        onChange={handleEducationChange}
        type="number"
      />
    </div>
  )}

  {isEditingEducation ? (
    <div className="mt-4 flex space-x-4">
      <button
        className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
        onClick={handleSaveEducation}
        disabled={loadingEducation} // ✅ Disabled while saving
      >
        {loadingEducation ? "Saving..." : "Save"}
      </button>
      <button
        className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
        onClick={handleCancelEducation}
      >
        Cancel
      </button>
    </div>
  ) : (
    <button
      className="mt-4 px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
      onClick={() => setIsEditingEducation(true)}
    >
      Edit
    </button>
  )}
</div>


            {/* Professional Details Section */}
<div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
  <h3 className="text-lg md:text-xl text-[#111111] mb-4">Professional Details</h3>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <InfoRow
      label="Occupation"
      value={professionData.occupation}
      isEditing={isEditingProfession}
      name="occupation"
      onChange={handleProfessionChange}
    />
    <InfoRow
      label="Designation"
      value={professionData.designation}
      isEditing={isEditingProfession}
      name="designation"
      onChange={handleProfessionChange}
    />
    <InfoRow
      label="Working With"
      value={professionData.working_with}
      isEditing={isEditingProfession}
      name="working_with"
      onChange={handleProfessionChange}
    />
    <InfoRow
      label="Annual Income"
      value={professionData.income}
      isEditing={isEditingProfession}
      name="income"
      onChange={handleProfessionChange}
      type="select"
      options={[
        { value: "0-3", label: "Up to 3 Lakhs" },
        { value: "3-5", label: "3-5 Lakhs" },
        { value: "5-7", label: "5-7 Lakhs" },
        { value: "7-10", label: "7-10 Lakhs" },
        { value: "10-15", label: "10-15 Lakhs" },
        { value: "15-20", label: "15-20 Lakhs" },
        { value: "20-25", label: "20-25 Lakhs" },
        { value: "25-35", label: "25-35 Lakhs" },
        { value: "35-50", label: "35-50 Lakhs" },
        { value: "50-75", label: "50-75 Lakhs" },
        { value: "75-100", label: "75 Lakhs - 1 Crore" },
        { value: "100+", label: "1 Crore+" }
      ]}
    />
    
    <div className="col-span-2">
      <h4 className="text-md font-semibold mb-2 mt-4">Work Address</h4>
    </div>
    <InfoRow
      label="Address"
      value={professionData.work_address?.address || ""}
      isEditing={isEditingProfession}
      name="work_address.address"
      onChange={handleProfessionChange}
    />
    <InfoRow
      label="City"
      value={professionData.work_address?.city || ""}
      isEditing={isEditingProfession}
      name="work_address.city"
      onChange={handleProfessionChange}
    />
  </div>

  {isEditingProfession ? (
    <div className="mt-4 flex space-x-4">
      <button
        className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
        onClick={handleSaveProfession}
      >
        Save
      </button>
      <button
        className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
        onClick={handleCancelProfession}
      >
        Cancel
      </button>
    </div>
  ) : (
    <button
      className="mt-4 px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
      onClick={() => setIsEditingProfession(true)}
    >
      Edit
    </button>
  )}
</div>

            {/* Astrology Section */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
              <h3 className="text-lg md:text-xl text-[#111111] mb-4">
                Astrology Details
              </h3>

              {loadingAstrology ? (
                <p className="text-gray-600">Loading...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoRow
                    label="Rashi/Nakshatra"
                    value={astrologyData.rashi_nakshatra}
                    isEditing={isEditingAstrology}
                    name="rashi_nakshatra"
                    onChange={handleAstrologyChange}
                  />
                  <InfoRow
                    label="Gotra"
                    value={astrologyData.gotra}
                    isEditing={isEditingAstrology}
                    name="gotra"
                    onChange={handleAstrologyChange}
                  />
                </div>
              )}

              {isEditingAstrology ? (
                <div className="mt-4 flex space-x-4">
                  <button
                    className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
                    onClick={handleSaveAstrology}
                    disabled={loadingAstrology}
                  >
                    {loadingAstrology ? "Saving..." : "Save"}
                  </button>
                  <button
                    className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
                    onClick={handleCancelAstrology}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="mt-4 px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
                  onClick={() => setIsEditingAstrology(true)}
                >
                  Edit
                </button>
              )}
            </div>


            {/* Hobbies Section */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <h3 
                  className="text-lg md:text-xl text-[#111111] mb-4"
                  style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
                >
                  Hobbies
                </h3>
                {isEditingHobbies ? (
                  <div className="flex space-x-4">
                    <button
                      className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
                      onClick={handleSaveHobbies}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
                      onClick={handleCancelHobbies}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
                    onClick={() => setIsEditingHobbies(true)}
                  >
                    Edit
                  </button>
                )}
              </div>

              {isEditingHobbies && (
                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={hobbiesData.newHobby}
                    onChange={(e) => setHobbiesData(prev => ({ ...prev, newHobby: e.target.value }))}
                    className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter a hobby"
                  />
                  <button
                    onClick={() => {
                      if (hobbiesData.newHobby.trim()) {
                        setHobbiesData(prev => ({
                          hobbies: [...prev.hobbies, prev.newHobby.trim()],
                          newHobby: ""
                        }));
                      }
                    }}
                    className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
                  >
                    Add
                  </button>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {hobbiesData.hobbies.map((hobby, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 rounded-full px-4 py-2"
                  >
                    <span>{hobby}</span>
                    {isEditingHobbies && (
                      <button
                        onClick={() => {
                          setHobbiesData(prev => ({
                            ...prev,
                            hobbies: prev.hobbies.filter((_, i) => i !== index)
                          }));
                        }}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
      
      {showPreferences && (
        <PreferencesPopup
          initialPreferences={user?.preferences}
          onClose={() => setShowPreferences(false)}
        />
      )}
    </div>
  );
}
