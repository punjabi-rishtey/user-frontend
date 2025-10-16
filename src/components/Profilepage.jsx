import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FaCog, FaSignOutAlt, FaUserTimes } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import ProfileImageGallery from "./ProfileImageGallery";
// Removed unused password icons
import { MdPrivacyTip } from "react-icons/md";
import { apiUrl } from "../config/constants";

// Helper functions moved outside the component for better performance
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

// Memoized options to prevent recreation on each render
const FEET_OPTIONS = generateFeetOptions();
const INCHES_OPTIONS = generateInchesOptions();

// Height Dropdowns Component
function HeightDropdowns({ value, onChange, isEditing }) {
  if (!value) return null;

  if (isEditing) {
    return (
      <div className="w-full">
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
            {FEET_OPTIONS.map((option) => (
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
            {INCHES_OPTIONS.map((option) => (
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
      <div className="w-full">
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

HeightDropdowns.propTypes = {
  value: PropTypes.shape({
    feet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    inches: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onChange: PropTypes.func,
  isEditing: PropTypes.bool,
};

// InfoRow Component
function InfoRow({
  label,
  value,
  isEditing,
  name,
  onChange,
  type = "text",
  options,
  isPassword,
}) {
  const getDisplayValue = () => {
    if (type === "select" && options) {
      // Handle boolean values (but not for manglik and nri_status fields which have custom logic)
      if (
        typeof value === "boolean" &&
        name !== "manglik" &&
        name !== "lifestyle.nri_status"
      ) {
        return value ? "Yes" : "No";
      }
      // Handle manglik field with smart display logic
      if (name === "manglik") {
        // Handle boolean values first (including false)
        if (typeof value === "boolean") {
          return value ? "Manglik" : "Non Manglik";
        }
        // Handle string values
        if (typeof value === "string") {
          if (value === "manglik") return "Manglik";
          if (value === "non_manglik") return "Non Manglik";
          if (value === "partial_manglik") return "Partial Manglik";
          if (value === "true") return "Manglik";
          if (value === "false") return "Non Manglik";
        }
        // Handle null, undefined, or empty string
        if (value === null || value === undefined || value === "") {
          return "Not specified";
        }
      }
      // Handle NRI status field with smart display logic
      if (name === "lifestyle.nri_status") {
        if (typeof value === "boolean") {
          return value ? "NRI" : "Indian";
        }
        if (typeof value === "string") {
          if (value === "true" || value.toLowerCase() === "yes") return "NRI";
          if (value === "false" || value.toLowerCase() === "no")
            return "Indian";
        }
        if (!value && value !== false) return "Not specified";
        return value ? "NRI" : "Indian";
      }
      // Handle Ready to move Abroad field with smart display logic
      if (name === "lifestyle.abroad_ready") {
        if (value === null || value === undefined || value === "") {
          return "Not specified";
        }
        if (typeof value === "boolean") {
          return value ? "Yes" : "No";
        }
        if (typeof value === "string") {
          if (value === "true" || value.toLowerCase() === "yes") return "Yes";
          if (value === "false" || value.toLowerCase() === "no") return "No";
        }
        return value;
      }
      if (value === undefined || value === null || value === "") {
        return "";
      }
      const option = options.find((opt) => opt.value === value.toString());
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

  return (
    <div className="w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      {isEditing ? (
        type === "select" ? (
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
        )
      ) : (
        <p className="text-gray-600">{getDisplayValue()}</p>
      )}
    </div>
  );
}

InfoRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  isEditing: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.any, label: PropTypes.string })
  ),
  isPassword: PropTypes.bool,
};

// Tab Button Component
function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base font-medium rounded-t-lg transition-colors ${
        active
          ? "bg-white text-[#B31312] border-b-2 border-[#B31312]"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

TabButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

// Action Buttons Component
function ActionButtons({ isEditing, onSave, onCancel, onEdit, loading }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {isEditing ? (
        <>
          <button
            onClick={onSave}
            disabled={loading}
            className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
        >
          Edit
        </button>
      )}
    </div>
  );
}

ActionButtons.propTypes = {
  isEditing: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onEdit: PropTypes.func,
  loading: PropTypes.bool,
};

// Main Component
export default function ProfileSettings() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [loadingPassword, setLoadingPassword] = useState(false); // Added loading state for password reset

  // States for different sections
  const [userImages, setUserImages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [loadingProfession, setLoadingProfession] = useState(false);
  const [isEditingProfession, setIsEditingProfession] = useState(false);
  const [isEditingFamily, setIsEditingFamily] = useState(false);
  const [loadingEducation, setLoadingEducation] = useState(false);
  const [loadingFamily, setLoadingFamily] = useState(false);
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [loadingAstrology, setLoadingAstrology] = useState(false);
  const [isEditingAstrology, setIsEditingAstrology] = useState(false);

  // Data states
  const [hobbiesData, setHobbiesData] = useState({
    hobbies: [],
    newHobby: "",
  });

  const [professionData, setProfessionData] = useState({
    occupation: "",
    designation: "",
    working_with: "",
    income: "",
    work_address: {
      address: "",
      city: "",
    },
  });

  const [familyData, setFamilyData] = useState({
    family_value: "",
    family_type: "",
    mother: {
      name: "",
      occupation: "",
    },
    father: {
      name: "",
      occupation: "",
    },
    siblings: {
      brother_count: 0,
      sister_count: 0,
    },
  });

  const [educationData, setEducationData] = useState({
    education_level: "",
    education_field: "",
    college: {
      name: "",
      city: "",
    },
  });

  const [astrologyData, setAstrologyData] = useState({
    rashi_nakshatra: "",
    gotra: "",
  });

  const [basicData, setBasicData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    gender: "",
    dob: "",
    religion: "",
    marital_status: "",
    age: "",
  });

  const [personalData, setPersonalData] = useState({
    height: {
      feet: "",
      inches: "",
    },
    caste: "",
    language: "",
    manglik: "",
    birth_details: {
      birth_time: "",
      birth_place: "",
    },
    physical_attributes: {
      skin_tone: "",
      body_type: "",
      physical_disability: false,
      disability_reason: "",
    },
    lifestyle: {
      smoke: false,
      drink: false,
      veg_nonveg: "",
      nri_status: false,
      abroad_ready: null,
    },
    home_address: {
      address: "",
      city: "",
    },
    hobbies: [],
  });

  // New optional About fields state
  const [aboutFields, setAboutFields] = useState({
    about_myself: "",
    looking_for: "",
  });

  // Helper function to parse height
  const parseHeight = (heightString) => {
    if (!heightString) return { feet: "5", inches: "0" };
    const match = heightString.match(/(\d+)'(\d+)"/);
    return match
      ? { feet: match[1], inches: match[2] }
      : { feet: "5", inches: "0" };
  };

  // Initialize userImages when user data changes
  useEffect(() => {
    if (user) {
      setUserImages(
        user?.profilePictures?.length > 0
          ? user.profilePictures
          : [user?.profilePicture || "/profile.jpg"]
      );
    }
  }, [user]);

  // Update sidebar profile image when user profile picture changes
  useEffect(() => {
    if (user?.profilePicture) {
      const sidebarImages = document.querySelectorAll(".sidebar-profile-image");
      sidebarImages.forEach((img) => {
        img.src = user.profilePicture;
      });
    }
  }, [user?.profilePicture]);

  // Fetch user details when user ID changes
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (user?._id) {
      fetchUserDetails();
      fetchAstrologyDetails();
      fetchProfessionDetails();
      fetchFamilyDetails();
      fetchEducationDetails();
    }
  }, [user?._id]);
  /* eslint-enable react-hooks/exhaustive-deps */

  // Show loading state only if user is being fetched or if user doesn't have required data
  if (!user || !user._id) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex justify-center items-center">
          <div className="text-center">
            <div className="text-[#4F2F1D] text-xl mb-4">
              Loading your profile...
            </div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4F2F1D] mx-auto"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Fetch user details from API
  const fetchUserDetails = async () => {
    if (!user?._id) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      }

      const response = await axios.get(apiUrl(`/api/users/${user._id}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const userData = response.data;

      setBasicData({
        fullName: userData.name || "",
        mobile: userData.mobile || "",
        email: userData.email || "",
        gender: userData.gender || "",
        dob: userData.dob || "",
        religion: userData.religion || "",
        marital_status: userData.marital_status || "",
        age: userData.age || "",
      });

      setPersonalData({
        height: parseHeight(userData.height),
        caste: userData.caste || "",
        language: userData.language || "",
        manglik: userData.mangalik || "",
        birth_details: {
          birth_time: userData.birth_details?.birth_time || "",
          birth_place: userData.birth_details?.birth_place || "",
        },
        physical_attributes: {
          skin_tone: userData.physical_attributes?.skin_tone || "",
          body_type: userData.physical_attributes?.body_type || "",
          physical_disability:
            userData.physical_attributes?.physical_disability || false,
          disability_reason:
            userData.physical_attributes?.disability_reason || "",
        },
        lifestyle: {
          smoke: userData.lifestyle?.smoke || false,
          drink: userData.lifestyle?.drink || false,
          veg_nonveg: userData.lifestyle?.veg_nonveg || "",
          nri_status: userData.lifestyle?.nri_status || false,
          abroad_ready:
            userData.lifestyle?.abroad_ready !== undefined
              ? userData.lifestyle?.abroad_ready
              : null,
        },
        home_address: {
          address: userData.location?.address || "",
          city: userData.location?.city || "",
        },
        hobbies: userData.hobbies || [],
      });

      setHobbiesData({
        hobbies:
          Array.isArray(userData.hobbies) && userData.hobbies.length > 0
            ? userData.hobbies.filter((hobby) => hobby !== "None")
            : [],
        newHobby: "",
      });

      // Set About fields from API (optional)
      setAboutFields({
        about_myself: userData.about_myself || "",
        looking_for: userData.looking_for || "",
      });
    } catch (error) {
      console.error("Error fetching user details:", error);

      // Handle authentication errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        navigate("/login");
        return;
      }

      // For other errors, show a user-friendly message but don't block the UI
      console.warn("Failed to fetch complete user details, using cached data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch astrology details from API
  const fetchAstrologyDetails = async () => {
    if (!user?._id) return;

    setLoadingAstrology(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        logout();
        return;
      }

      const response = await axios.get(apiUrl(`/api/astrologies/${user._id}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setAstrologyData(response.data);
    } catch (error) {
      console.error("Error fetching astrology details:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        logout();
      } else {
        console.log("Failed to fetch astrology details.");
        // alert("Failed to fetch astrology details.");
      }
    }
    setLoadingAstrology(false);
  };

  // Fetch profession details from API
  const fetchProfessionDetails = async () => {
    if (!user?._id) return;

    setLoadingProfession(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        logout();
        return;
      }

      const response = await axios.get(apiUrl(`/api/professions/${user._id}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setProfessionData(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        logout();
      } else {
        console.error("Error fetching profession details:", error);
        // alert("Failed to fetch profession details.");
      }
    }
    setLoadingProfession(false);
  };

  // Fetch family details from API
  const fetchFamilyDetails = async () => {
    if (!user?._id) return;

    setLoadingFamily(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        logout();
        return;
      }

      const response = await axios.get(apiUrl(`/api/families/${user._id}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setFamilyData(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        logout();
      } else {
        console.error("Error fetching family details:", error);
        // alert("Failed to fetch family details.");
      }
    }
    setLoadingFamily(false);
  };

  // Fetch education details from API
  const fetchEducationDetails = async () => {
    if (!user?._id) return;

    setLoadingEducation(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        logout();
        return;
      }

      const response = await axios.get(apiUrl(`/api/educations/${user._id}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setEducationData(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        logout();
      } else {
        console.error("Error fetching education details:", error);
        // alert("Failed to fetch education details.");
      }
    }
    setLoadingEducation(false);
  };

  // Handle image operations
  const handleAddImage = async (file) => {
    try {
      const imageUrl = URL.createObjectURL(file);

      const updatedUser = {
        ...user,
        profilePicture: imageUrl,
      };

      updateUser(updatedUser);

      setUserImages((prev) => {
        if (prev.length === 1 && prev[0] === "/profile.jpg") {
          return [imageUrl];
        }
        return [...prev, imageUrl];
      });

      const sidebarImages = document.querySelectorAll(".sidebar-profile-image");
      sidebarImages.forEach((img) => {
        img.src = imageUrl;
      });

      alert("Image added successfully!");
    } catch (error) {
      console.error("Error adding image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      // no-op
    }
  };

  const handleRemoveImage = (index) => {
    if (window.confirm("Are you sure you want to remove this image?")) {
      const newImages = [...userImages];
      newImages.splice(index, 1);

      let updatedUser = { ...user };

      if (index === 0) {
        if (newImages.length > 0) {
          updatedUser.profilePicture = newImages[0];
        } else {
          updatedUser.profilePicture = "/profile.jpg";
        }
      }

      setUserImages(newImages);
      updateUser(updatedUser);

      const sidebarImages = document.querySelectorAll(".sidebar-profile-image");
      sidebarImages.forEach((img) => {
        img.src = updatedUser.profilePicture;
      });

      alert("Image removed successfully!");
    }
  };

  const handleEditImage = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      if (e.target.files && e.target.files[0]) {
        try {
          const file = e.target.files[0];
          const imageUrl = URL.createObjectURL(file);

          const newImages = [...userImages];
          newImages[index] = imageUrl;
          setUserImages(newImages);

          if (index === 0) {
            const updatedUser = { ...user, profilePicture: imageUrl };
            updateUser(updatedUser);

            const sidebarImages = document.querySelectorAll(
              ".sidebar-profile-image"
            );
            sidebarImages.forEach((img) => {
              img.src = imageUrl;
            });
          }

          alert("Image updated successfully!");
        } catch (error) {
          console.error("Error updating image:", error);
          alert("Failed to update image. Please try again.");
        } finally {
          // no-op
        }
      }
    };
    input.click();
  };

  // Handle form field changes
  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setBasicData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  // Handle About fields change (limit 300 chars each)
  const handleAboutChange = (e) => {
    const { name, value } = e.target;
    setAboutFields((prev) => ({ ...prev, [name]: value.slice(0, 300) }));
  };

  const handleProfessionChange = (e) => {
    const { name, value } = e.target;

    setProfessionData((prev) => {
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

  const handleAstrologyChange = (e) => {
    const { name, value } = e.target;
    setAstrologyData({
      ...astrologyData,
      [name]: value,
    });
  };

  // Handle save and cancel operations
  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Since we no longer convert "yes"/"no"/"occasionally" to booleans,
      // we keep drink/smoke as strings in personalData.lifestyle
      const fixedLifestyle = { ...personalData.lifestyle };
      // Normalize abroad_ready to boolean|null for backend schema
      if (fixedLifestyle) {
        const ar = fixedLifestyle.abroad_ready;
        if (ar === "true" || ar === true) fixedLifestyle.abroad_ready = true;
        else if (ar === "false" || ar === false)
          fixedLifestyle.abroad_ready = false;
        else fixedLifestyle.abroad_ready = null; // for "" or undefined
      }

      // Convert "fullName" -> "name", and include "caste" in the request
      const requestBody = {
        name: basicData.fullName,
        email: basicData.email,
        mobile: basicData.mobile,
        dob: basicData.dob,
        gender: basicData.gender,
        religion: basicData.religion,
        marital_status: basicData.marital_status,
        height: personalData.height,
        language: personalData.language,
        manglik: personalData.manglik,
        caste: personalData.caste, //  <-- Include caste here
        birth_details: personalData.birth_details,
        physical_attributes: personalData.physical_attributes,
        lifestyle: fixedLifestyle,
        location: {
          city: personalData.home_address.city,
          address: personalData.home_address.address,
        },
        hobbies: hobbiesData.hobbies,
        about_myself: aboutFields.about_myself || "",
        looking_for: aboutFields.looking_for || "",
      };

      // Debug logging
      console.log("Saving manglik value:", personalData.manglik);
      console.log("Full request body:", requestBody);

      await axios.put(apiUrl(`/api/users/${user._id}`), requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Refetch user details so UI is in sync
      await fetchUserDetails();

      setIsEditing(false);
      setIsEditingPersonal(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    fetchUserDetails();
    setIsEditing(false);
  };

  const handleSaveProfession = async () => {
    setLoadingProfession(true);
    try {
      const token = localStorage.getItem("token");

      await axios.put(apiUrl(`/api/professions/${user._id}`), professionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setIsEditingProfession(false);
      alert("Profession details updated successfully!");
    } catch (error) {
      console.error("Error saving profession details:", error);
      alert("Failed to update profession details. Please try again.");
    }
    setLoadingProfession(false);
  };

  const handleCancelProfession = () => {
    fetchProfessionDetails();
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

      await axios.put(apiUrl(`/api/families/${user._id}`), familyData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setIsEditingFamily(false);
      alert("Family details updated successfully!");
    } catch (error) {
      console.error("Error saving family details:", error);
      alert("Failed to update family details. Please try again.");
    }
    setLoadingFamily(false);
  };

  const handleCancelFamily = () => {
    fetchFamilyDetails();
    setIsEditingFamily(false);
  };

  const handleSaveEducation = async () => {
    setLoadingEducation(true);
    try {
      const token = localStorage.getItem("token");

      await axios.put(apiUrl(`/api/educations/${user._id}`), educationData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setIsEditingEducation(false);
      alert("Education details updated successfully!");
    } catch (error) {
      console.error("Error saving education details:", error);
      alert("Failed to update education details. Please try again.");
    }
    setLoadingEducation(false);
  };

  const handleCancelEducation = () => {
    fetchEducationDetails();
    setIsEditingEducation(false);
  };

  const handleSaveAstrology = async () => {
    setLoadingAstrology(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Session expired. Please log in again.");
        logout();
        return;
      }

      const response = await axios.put(
        apiUrl(`/api/astrologies/${user._id}`),
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
    fetchAstrologyDetails();
    setIsEditingAstrology(false);
  };

  // Removed unused hobbies save/cancel handlers; hobbies are saved with main Save

  const handleResetPassword = async () => {
    setLoadingPassword(true);
    try {
      const email = user?.email;
      await axios.post(apiUrl(`/api/users/forgot-password/`), {
        email,
      });

      alert("Password reset link sent successfully");
    } catch (error) {
      console.error(
        "Error resetting password:",
        error.response?.data || error.message
      );
      alert("Failed to send password reset link. Please try again.");
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleLogout = () => {
    if (confirm("Do you want to Logout?") == true) {
      logout();
      navigate("/");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(apiUrl("/api/users/me"), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Failed to delete account");
      }
      alert("Your account has been deleted.");
      logout();
      navigate("/");
    } catch (error) {
      console.error("Delete account error:", error);
      alert("Could not delete the account. Please try again.");
    }
  };

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    let filledFields = 0;
    let totalFields = 0;

    const checkFields = (obj) => {
      Object.values(obj).forEach((value) => {
        if (typeof value === "object" && value !== null) {
          checkFields(value);
        } else {
          totalFields++;
          if (value && value !== "") {
            filledFields++;
          }
        }
      });
    };

    checkFields(basicData);
    checkFields(personalData);
    checkFields(hobbiesData);
    checkFields(aboutFields);
    checkFields(professionData);
    checkFields(familyData);
    checkFields(educationData);
    checkFields(astrologyData);

    if (userImages.length > 0 && userImages[0] !== "/profile.jpg") {
      filledFields++;
    }
    totalFields++;

    return Math.round((filledFields / totalFields) * 100);
  };

  // Menu items for sidebar
  const menuItems = [
    {
      icon: <FaCog className="text-[#B31312]" />,
      label: "Settings",
      active: true,
    },
  ];

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
            <h3 className="text-lg md:text-xl text-[#111111] mb-4">
              Profile Information
            </h3>

            {/* Basic Info Section */}
            <h4 className="text-md font-semibold mb-4">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InfoRow
                label="Full Name"
                value={basicData.fullName}
                isEditing={isEditing}
                name="fullName"
                onChange={handleBasicChange}
              />
              <InfoRow
                label="Mobile"
                value={basicData.mobile}
                isEditing={isEditing}
                name="mobile"
                onChange={handleBasicChange}
              />
              <InfoRow
                label="Email"
                value={basicData.email}
                isEditing={isEditing}
                name="email"
                onChange={handleBasicChange}
              />
              <InfoRow
                label="Date of Birth"
                value={basicData.dob}
                isEditing={isEditing}
                name="dob"
                onChange={handleBasicChange}
                type="date"
              />
              <InfoRow
                label="Gender"
                value={basicData.gender}
                isEditing={isEditing}
                name="gender"
                onChange={handleBasicChange}
                type="select"
                options={[
                  { value: "", label: "Select Gender" },
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
              />
              <InfoRow
                label="Religion"
                value={basicData.religion}
                isEditing={isEditing}
                name="religion"
                onChange={handleBasicChange}
                type="select"
                options={[
                  { value: "", label: "Select Religion" },
                  { value: "hindu", label: "Hindu" },
                  { value: "sikh", label: "Sikh" },
                  { value: "jain", label: "Jain" },
                  { value: "buddhist", label: "Buddhist" },
                ]}
              />
              <InfoRow
                label="Marital Status"
                value={basicData.marital_status}
                isEditing={isEditing}
                name="marital_status"
                onChange={handleBasicChange}
                type="select"
                options={[
                  { value: "", label: "Select Marital Status" },
                  { value: "never_married", label: "Never Married" },
                  { value: "divorced", label: "Divorced" },
                  { value: "widow_widower", label: "Widow/Widower" },
                  { value: "awaiting_divorce", label: "Awaiting Divorce" },
                ]}
              />
              <InfoRow
                label="Age"
                value={basicData.age}
                isEditing={isEditing}
                name="age"
                onChange={handleBasicChange}
              />
            </div>

            {/* Personal Details Section */}
            <h4 className="text-md font-semibold mb-4 border-t pt-6">
              Personal Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InfoRow
                label="Height (Feet)"
                value={personalData.height.feet}
                isEditing={isEditingPersonal || isEditing}
                name="height.feet"
                onChange={handlePersonalChange}
              />
              <InfoRow
                label="Height (Inches)"
                value={personalData.height.inches}
                isEditing={isEditing || isEditingPersonal}
                name="height.inches"
                onChange={handlePersonalChange}
              />
              <InfoRow
                label="Caste"
                value={personalData.caste}
                isEditing={isEditing || isEditingPersonal}
                name="caste"
                onChange={handlePersonalChange}
                type="select"
                options={[
                  { value: "", label: "Select Caste" },
                  { value: "khatri", label: "Khatri" },
                  { value: "arora", label: "Arora" },
                  { value: "brahmin", label: "Brahmin" },
                  { value: "other", label: "Other" },
                ]}
              />
              <InfoRow
                label="Manglik Status"
                value={personalData.manglik}
                isEditing={isEditing || isEditingPersonal}
                name="manglik"
                onChange={handlePersonalChange}
                type="select"
                options={[
                  { value: "", label: "Select Manglik Status" },
                  { value: "manglik", label: "Manglik" },
                  { value: "partial_manglik", label: "Partial Manglik" },
                  { value: "non_manglik", label: "Non Manglik" },
                ]}
              />
              <InfoRow
                label="Birth Time"
                value={personalData.birth_details.birth_time}
                isEditing={isEditing || isEditingPersonal}
                name="birth_details.birth_time"
                onChange={handlePersonalChange}
                type="time"
              />
              <InfoRow
                label="Birth Place"
                value={personalData.birth_details.birth_place}
                isEditing={isEditing || isEditingPersonal}
                name="birth_details.birth_place"
                onChange={handlePersonalChange}
              />
              <InfoRow
                label="Skin Tone"
                value={personalData.physical_attributes.skin_tone}
                isEditing={isEditing || isEditingPersonal}
                name="physical_attributes.skin_tone"
                onChange={handlePersonalChange}
                type="select"
                options={[
                  { value: "", label: "Select Skin Tone" },
                  { value: "very_fair", label: "Very Fair" },
                  { value: "fair", label: "Fair" },
                  { value: "wheatish", label: "Wheatish" },
                  { value: "dark", label: "Dark" },
                ]}
              />
              <InfoRow
                label="Body Type"
                value={personalData.physical_attributes.body_type}
                isEditing={isEditing || isEditingPersonal}
                name="physical_attributes.body_type"
                onChange={handlePersonalChange}
                type="select"
                options={[
                  { value: "", label: "Select Body Type" },
                  { value: "slim", label: "Slim" },
                  { value: "athletic", label: "Athletic" },
                  { value: "average", label: "Average" },
                  { value: "heavy", label: "Heavy" },
                ]}
              />
              <InfoRow
                label="Physical Disability"
                value={personalData.physical_attributes.physical_disability}
                isEditing={isEditing || isEditingPersonal}
                name="physical_attributes.physical_disability"
                onChange={handlePersonalChange}
                type="select"
                options={[
                  { value: "", label: "Select Physical Disability" },
                  { value: "false", label: "No" },
                  { value: "true", label: "Yes" },
                ]}
              />
              <InfoRow
                label="Disability Details"
                value={personalData.physical_attributes.disability_reason}
                isEditing={isEditing || isEditingPersonal}
                name="physical_attributes.disability_reason"
                onChange={handlePersonalChange}
              />
              <InfoRow
                label="Smoking"
                value={personalData.lifestyle.smoke}
                isEditing={isEditing || isEditingPersonal}
                name="lifestyle.smoke"
                onChange={handlePersonalChange}
                type="select"
                options={[
                  { value: "", label: "Select Smoking" },
                  { value: "no", label: "No" },
                  { value: "yes", label: "Yes" },
                  { value: "occasionally", label: "Occasionally" },
                ]}
              />
              <InfoRow
                label="Drinking"
                value={personalData.lifestyle.drink}
                isEditing={isEditing || isEditingPersonal}
                name="lifestyle.drink"
                onChange={handlePersonalChange}
                type="select"
                options={[
                  { value: "", label: "Select Drinking" },
                  { value: "no", label: "No" },
                  { value: "yes", label: "Yes" },
                  { value: "occasionally", label: "Occasionally" },
                ]}
              />
              <InfoRow
                label="Diet Preference"
                value={personalData.lifestyle.veg_nonveg}
                isEditing={isEditing || isEditingPersonal}
                name="lifestyle.veg_nonveg"
                onChange={handlePersonalChange}
                type="select"
                options={[
                  { value: "", label: "Select Diet Preference" },
                  { value: "veg", label: "Vegetarian" },
                  { value: "nonveg", label: "Non-Vegetarian" },
                  {
                    value: "occasionally_nonveg",
                    label: "Occasionally Non-Vegetarian",
                  },
                ]}
              />
              <InfoRow
                label="NRI Status"
                value={personalData.lifestyle.nri_status}
                isEditing={isEditing || isEditingPersonal}
                name="lifestyle.nri_status"
                onChange={handlePersonalChange}
                type="select"
                options={[
                  { value: "", label: "Select NRI Status" },
                  { value: "false", label: "Indian" },
                  { value: "true", label: "NRI" },
                ]}
              />
              <InfoRow
                label="Ready to move Abroad"
                value={
                  personalData.lifestyle.abroad_ready === null ||
                  personalData.lifestyle.abroad_ready === undefined
                    ? ""
                    : personalData.lifestyle.abroad_ready
                }
                isEditing={isEditing || isEditingPersonal}
                name="lifestyle.abroad_ready"
                onChange={handlePersonalChange}
                type="select"
                options={[
                  { value: "", label: "Prefer not to say" },
                  { value: "true", label: "Yes" },
                  { value: "false", label: "No" },
                ]}
              />
            </div>

            {/* Home Address Section */}
            <h4 className="text-md font-semibold mb-4 border-t pt-6">
              Home Address
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InfoRow
                label="Address"
                value={personalData.home_address.address}
                isEditing={isEditing || isEditingPersonal}
                name="home_address.address"
                onChange={handlePersonalChange}
              />
              <InfoRow
                label="City"
                value={personalData.home_address.city}
                isEditing={isEditing || isEditingPersonal}
                name="home_address.city"
                onChange={handlePersonalChange}
              />
            </div>

            {/* Hobbies Section */}
            <h4 className="text-md font-semibold mb-4 border-t pt-6">
              Hobbies
            </h4>
            <div className="flex flex-wrap gap-2">
              {hobbiesData.hobbies.map((hobby, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 rounded-full px-4 py-2"
                >
                  <span>{hobby}</span>
                  {isEditing && (
                    <button
                      onClick={() =>
                        setHobbiesData((prev) => ({
                          ...prev,
                          hobbies: prev.hobbies.filter((_, i) => i !== index),
                        }))
                      }
                      className="ml-2 text-gray-500 hover:text-red-500"
                      aria-label="Remove hobby"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={hobbiesData.newHobby}
                  onChange={(e) =>
                    setHobbiesData({ ...hobbiesData, newHobby: e.target.value })
                  }
                  className="border rounded px-2 py-1"
                  placeholder="Add new hobby"
                />
                <button
                  onClick={() => {
                    if (hobbiesData.newHobby.trim() !== "") {
                      setHobbiesData((prev) => ({
                        hobbies: [...prev.hobbies, prev.newHobby],
                        newHobby: "",
                      }));
                    }
                  }}
                  className="px-4 py-2 bg-[#B31312] hover:bg-[#931110] text-white rounded-lg"
                >
                  Add
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <ActionButtons
              isEditing={isEditing || isEditingPersonal}
              onSave={handleSave}
              onCancel={handleCancel}
              onEdit={() => setIsEditing(true)}
              loading={loading}
            />
          </div>
        );

      case "family":
        return (
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
                    { value: "", label: "Select Family Value" },
                    { value: "traditional", label: "Traditional" },
                    { value: "orthodox", label: "Orthodox" },
                    { value: "liberal", label: "Liberal" },
                    { value: "modern", label: "Modern" },
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
                    { value: "", label: "Select Family Type" },
                    { value: "nuclear", label: "Nuclear Family" },
                    { value: "joint", label: "Joint Family" },
                    { value: "extended", label: "Extended Family" },
                    { value: "living_alone", label: "Living Alone" },
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

            <ActionButtons
              isEditing={isEditingFamily}
              onSave={handleSaveFamily}
              onCancel={handleCancelFamily}
              onEdit={() => setIsEditingFamily(true)}
              loading={loadingFamily}
            />
          </div>
        );

      case "education":
        return (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
            <h3
              className="text-lg md:text-xl text-[#111111] mb-4"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
              }}
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
                    { value: "", label: "Select Education Level" },
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
                  type="text"
                  placeholder="Enter your field of education (e.g., Computer Science, Medicine, Business)"
                />

                {/* College Details */}
                <div className="col-span-1 md:col-span-2">
                  <h4 className="text-md font-semibold mb-2 mt-4">
                    College Details
                  </h4>
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
              </div>
            )}

            <ActionButtons
              isEditing={isEditingEducation}
              onSave={handleSaveEducation}
              onCancel={handleCancelEducation}
              onEdit={() => setIsEditingEducation(true)}
              loading={loadingEducation}
            />
          </div>
        );

      case "profession":
        return (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
            <h3 className="text-lg md:text-xl text-[#111111] mb-4">
              Professional Details
            </h3>

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
                label="Company Name"
                value={professionData.working_with}
                isEditing={isEditingProfession}
                name="working_with"
                onChange={handleProfessionChange}
              />
              <InfoRow
                label="Annual Income (per annum)"
                value={professionData.income}
                isEditing={isEditingProfession}
                name="income"
                onChange={handleProfessionChange}
                type="text"
                placeholder="Enter annual income (e.g., 5 Lakhs)"
              />

              <div className="col-span-1 md:col-span-2">
                <h4 className="text-md font-semibold mb-2 mt-4">
                  Work Address
                </h4>
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

            <ActionButtons
              isEditing={isEditingProfession}
              onSave={handleSaveProfession}
              onCancel={handleCancelProfession}
              onEdit={() => setIsEditingProfession(true)}
              loading={loadingProfession}
            />
          </div>
        );
      case "astrology":
        return (
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

            <ActionButtons
              isEditing={isEditingAstrology}
              onSave={handleSaveAstrology}
              onCancel={handleCancelAstrology}
              onEdit={() => setIsEditingAstrology(true)}
              loading={loadingAstrology}
            />
          </div>
        );

      default:
        return <div>Select a tab to view details</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FCF9F2]">
      <Header />

      {/* Mobile Menu Button */}
      <div className="md:hidden px-4 py-2 border-b bg-white sticky top-0 z-10">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center space-x-2 text-[#B31312]"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
          <span>Menu</span>
        </button>
      </div>

      <div className="flex-grow flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-white shadow-lg m-4 rounded-lg h-fit sticky top-4">
          <div className="p-5">
            <div className="text-center">
              <img
                src={
                  user?.profile_pictures?.length > 0
                    ? user.profile_pictures[0]
                    : "/profile.jpg"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto border-2 border-[#B31312] object-cover object-top sidebar-profile-image"
              />
              <h2 className="text-lg mt-3 text-[#111111]">{user?.name}</h2>
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
                onClick={handleResetPassword}
                disabled={loadingPassword}
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#B31312] transition duration-300 disabled:bg-gray-400 disabled:text-white"
              >
                <MdPrivacyTip />
                <span>
                  {loadingPassword ? "Sending link..." : "Change Password"}
                </span>
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#B31312] transition duration-300"
              >
                <FaUserTimes />
                <span>Delete Account</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#B31312] transition duration-300"
              >
                <FaSignOutAlt />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar - Fixed Overlay */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 overflow-y-auto">
              <div className="p-5">
                <div className="text-center">
                  <img
                    src={user?.profilePicture || "/profile.jpg"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto border-2 border-[#B31312] sidebar-profile-image"
                  />
                  <h2 className="text-lg mt-3 text-[#111111]">{user?.name}</h2>
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
                    onClick={handleResetPassword}
                    disabled={loadingPassword}
                    className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#B31312] transition duration-300 disabled:bg-gray-400 disabled:text-white"
                  >
                    <MdPrivacyTip />
                    <span>
                      {loadingPassword ? "Sending link..." : "Change Password"}
                    </span>
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#B31312] transition duration-300"
                  >
                    <FaUserTimes />
                    <span>Delete Account</span>
                  </button>
                  <button
                    onClick={handleLogout}
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
          <ProfileImageGallery
            images={userImages}
            onAddImage={handleAddImage}
            onRemoveImage={handleRemoveImage}
            onEditImage={handleEditImage}
          />

          <div className="bg-[#FEF3F3] border border-[#B31312] rounded-md p-3 mb-6 text-center">
            <p className="text-[#B31312] font-medium">
              First photo you upload will be the profile photo
            </p>
          </div>

          {/* About & Looking For are edited and viewed within the Profile Completion card below to follow current UX */}

          {/* Profile Completion Progress Card */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-md md:text-lg text-[#111111] mb-2">
              Profile Completion
            </h3>
            <div className="relative w-full bg-gray-200 h-4 rounded-lg overflow-hidden">
              <div
                className="h-4 transition-all duration-500"
                style={{
                  width: `${calculateProfileCompletion()}%`,
                  backgroundColor:
                    calculateProfileCompletion() < 34
                      ? "#B31312" // Red (Low completion)
                      : calculateProfileCompletion() < 67
                      ? "#A05A2C" // Brown (Medium completion)
                      : "#168821", // Green (High completion)
                }}
              />
            </div>

            {/* About Myself & I am looking for */}
            <h4 className="text-md font-semibold mb-4 border-t pt-6">
              About Section
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  About Myself
                </label>
                {isEditing ? (
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[120px]"
                    name="about_myself"
                    value={aboutFields.about_myself}
                    onChange={handleAboutChange}
                    maxLength={300}
                    placeholder="Write a short introduction about yourself (max 300 characters)"
                  />
                ) : (
                  <p className="text-gray-600 whitespace-pre-line">
                    {aboutFields.about_myself || "Not specified"}
                  </p>
                )}
                {isEditing && (
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {aboutFields.about_myself.length}/300
                  </p>
                )}
              </div>
              <div className="w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  I am looking for
                </label>
                {isEditing ? (
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[120px]"
                    name="looking_for"
                    value={aboutFields.looking_for}
                    onChange={handleAboutChange}
                    maxLength={300}
                    placeholder="Describe what you are looking for in a partner (max 300 characters)"
                  />
                ) : (
                  <p className="text-gray-600 whitespace-pre-line">
                    {aboutFields.looking_for || "Not specified"}
                  </p>
                )}
                {isEditing && (
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {aboutFields.looking_for.length}/300
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {calculateProfileCompletion()}% completed
            </p>
          </div>

          <h1 className="text-2xl md:text-3xl text-[#111111] mb-6">
            Profile Settings
          </h1>

          {/* Tabs Navigation - Scrollable on mobile */}
          <div className="flex overflow-x-auto pb-2 mb-4 border-b">
            <TabButton
              active={activeTab === "basic"}
              onClick={() => setActiveTab("basic")}
            >
              Basic Info
            </TabButton>
            <TabButton
              active={activeTab === "family"}
              onClick={() => setActiveTab("family")}
            >
              Family
            </TabButton>
            <TabButton
              active={activeTab === "education"}
              onClick={() => setActiveTab("education")}
            >
              Education
            </TabButton>
            <TabButton
              active={activeTab === "profession"}
              onClick={() => setActiveTab("profession")}
            >
              Profession
            </TabButton>
            <TabButton
              active={activeTab === "astrology"}
              onClick={() => setActiveTab("astrology")}
            >
              Astrology
            </TabButton>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </main>
      </div>

      <Footer />
    </div>
  );
}
