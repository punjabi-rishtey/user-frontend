import React, { useState, useContext } from "react";
import {
  FaCog,
  FaSignOutAlt,
  FaHeart,
  FaUser,
  FaComments,
  FaMoneyBill,
} from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import Header from "./Header"; // Import Header component
import Footer from "./Footer"; // Import Footer component
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
      const option = options.find(opt => opt.value === value);
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
  const { user, updateUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingProfession, setIsEditingProfession] = useState(false);
  const [isEditingFamily, setIsEditingFamily] = useState(false);
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [isEditingAstrology, setIsEditingAstrology] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingHobbies, setIsEditingHobbies] = useState(false);

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
  });

  const [locationData, setLocationData] = useState({
    city: user?.location?.city || "",
    pincode: user?.location?.pincode || "",
  });

  const [hobbiesData, setHobbiesData] = useState({
    hobbies: user?.hobbies || [],
  });

  const [professionData, setProfessionData] = useState({
    occupation: user?.occupation || "",
    designation: user?.designation || "",
    working_with: user?.working_with || "",
    working_as: user?.working_as || "",
    income: user?.income || "",
    work_address: user?.work_address || "",
  });

  const [familyData, setFamilyData] = useState({
    family_value: user?.family_value || "",
    family_size: user?.family_size || 0,
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
    qualification_details: user?.qualification_details || "",
  });

  const [astrologyData, setAstrologyData] = useState({
    rashi_nakshatra: user?.rashi_nakshatra || "",
    gotra: user?.gotra || "",
    gotra_mama: user?.gotra_mama || "",
  });

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
    });
    setIsEditingPersonal(false);
  };

  const handleProfessionChange = (e) => {
    const { name, value } = e.target;
    setProfessionData({
      ...professionData,
      [name]: value,
    });
  };

  const handleSaveProfession = () => {
    try {
      const updatedUser = {
        ...user,
        ...professionData,
      };

      const success = updateUser(updatedUser);

      if (success) {
        setIsEditingProfession(false);
        alert("Profession details updated successfully!");
      } else {
        alert("Failed to update profession details. Please try again.");
      }
    } catch (error) {
      console.error("Error saving profession details:", error);
      alert("An error occurred while saving your profession details.");
    }
  };

  const handleCancelProfession = () => {
    setProfessionData({
      occupation: user.occupation || "",
      designation: user.designation || "",
      working_with: user.working_with || "",
      working_as: user.working_as || "",
      income: user.income || "",
      work_address: user.work_address || "",
    });
    setIsEditingProfession(false);
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

  const handleSaveFamily = () => {
    try {
      const updatedUser = {
        ...user,
        ...familyData,
      };

      const success = updateUser(updatedUser);

      if (success) {
        setIsEditingFamily(false);
        alert("Family details updated successfully!");
      } else {
        alert("Failed to update family details. Please try again.");
      }
    } catch (error) {
      console.error("Error saving family details:", error);
      alert("An error occurred while saving your family details.");
    }
  };

  const handleCancelFamily = () => {
    setFamilyData({
      family_value: user.family_value || "",
      family_size: user.family_size || 0,
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

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducationData({
      ...educationData,
      [name]: value,
    });
  };

  const handleSaveEducation = () => {
    try {
      const updatedUser = {
        ...user,
        ...educationData,
      };

      const success = updateUser(updatedUser);

      if (success) {
        setIsEditingEducation(false);
        alert("Education details updated successfully!");
      } else {
        alert("Failed to update education details. Please try again.");
      }
    } catch (error) {
      console.error("Error saving education details:", error);
      alert("An error occurred while saving your education details.");
    }
  };

  const handleCancelEducation = () => {
    setEducationData({
      education_level: user.education_level || "",
      education_field: user.education_field || "",
      qualification_details: user.qualification_details || "",
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

  const handleSaveAstrology = () => {
    try {
      const updatedUser = {
        ...user,
        ...astrologyData,
      };

      const success = updateUser(updatedUser);

      if (success) {
        setIsEditingAstrology(false);
        alert("Astrology details updated successfully!");
      } else {
        alert("Failed to update astrology details. Please try again.");
      }
    } catch (error) {
      console.error("Error saving astrology details:", error);
      alert("An error occurred while saving your astrology details.");
    }
  };

  const handleCancelAstrology = () => {
    setAstrologyData({
      rashi_nakshatra: user.rashi_nakshatra || "",
      gotra: user.gotra || "",
      gotra_mama: user.gotra_mama || "",
    });
    setIsEditingAstrology(false);
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveLocation = () => {
    try {
      const updatedUser = {
        ...user,
        location: locationData,
      };
      const success = updateUser(updatedUser);
      if (success) {
        setIsEditingLocation(false);
        alert("Location details updated successfully!");
      }
    } catch (error) {
      console.error("Error saving location details:", error);
      alert("An error occurred while saving location details.");
    }
  };

  const handleSaveHobbies = () => {
    try {
      const updatedUser = {
        ...user,
        hobbies: hobbiesData.hobbies,
      };
      const success = updateUser(updatedUser);
      if (success) {
        setIsEditingHobbies(false);
        alert("Hobbies updated successfully!");
      }
    } catch (error) {
      console.error("Error saving hobbies:", error);
      alert("An error occurred while saving hobbies.");
    }
  };

  const handleHobbiesChange = (e) => {
    const { value } = e.target;
    setHobbiesData({
      hobbies: value.split(",").map((hobby) => hobby.trim()), // Convert string to an array
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FCF9F2]">
      <Header /> {/* Add Header component */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-5 rounded-r-lg">
          <div className="text-center">
            <img
              src={user.profilePicture || "/profile.jpg"}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h2 className="text-lg font-semibold mt-3">{user.name}</h2>
            <p className="text-sm text-gray-500">
              {user.profileType} User | {user.location?.city}
            </p>
          </div>
          <nav className="mt-6 space-y-4">
            <NavItem icon={<FaHeart />} label="My Matches" />
            <NavItem icon={<FaComments />} label="Interests" />
            <NavItem icon={<FaComments />} label="Chat list" />
            <NavItem icon={<FaMoneyBill />} label="Plan" />
            <NavItem icon={<FaCog />} label="Settings" active />
          </nav>
          
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-semibold text-gray-700">
            Profile Settings
          </h1>
          {/* Profile Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img
                  src={user.profilePicture || "/profile.jpg"}
                  alt={user.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-500 text-sm">
                    {user.profileType} User | {user.location?.city}
                  </p>
                </div>
              </div>
              <button
                className="bg-[#990000] hover:bg-[#800000] text-white px-4 py-2 rounded-lg"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          </div>
          {/* 1. Account Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
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
            {isEditing ? (
              <div className="mt-4 flex space-x-4">
                <button
                  className="px-4 py-2 bg-[#990000] hover:bg-[#800000] text-white rounded-lg"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-lg"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-[#990000] hover:bg-[#800000] text-white rounded-lg"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
          {/* 2. Personal Details Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-lg font-semibold mb-4">Personal Details</h3>

            <div className="grid grid-cols-2 gap-4 mt-4">
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
              <InfoRow
                label="Language"
                value={personalData.language}
                isEditing={isEditingPersonal}
                name="language"
                onChange={handlePersonalChange}
              />
              <InfoRow
                label="Mangalik Status"
                value={personalData.mangalik}
                isEditing={isEditingPersonal}
                name="mangalik"
                onChange={handlePersonalChange}
                type="select"
                options={[
                  { value: "true", label: "Yes" },
                  { value: "false", label: "No" },
                ]}
              />
              <InfoRow
                label="Birth Time"
                value={personalData.birth_details?.birth_time}
                isEditing={isEditingPersonal}
                name="birth_time"
                onChange={handlePersonalChange}
                type="time"
              />
              <InfoRow
                label="Birth Place"
                value={personalData.birth_details?.birth_place}
                isEditing={isEditingPersonal}
                name="birth_place"
                onChange={handlePersonalChange}
              />
              <InfoRow
                label="Skin Tone"
                value={personalData.physical_attributes?.skin_tone}
                isEditing={isEditingPersonal}
                name="skin_tone"
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
                value={personalData.physical_attributes?.body_type}
                isEditing={isEditingPersonal}
                name="body_type"
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
                value={personalData.physical_attributes?.physical_disability}
                isEditing={isEditingPersonal}
                name="physical_disability"
                onChange={handlePersonalChange}
                type="select"
                options={[
                  { value: "true", label: "Yes" },
                  { value: "false", label: "No" }
                ]}
              />
              {personalData.physical_attributes?.physical_disability ===
                "true" && (
                <InfoRow
                  label="Disability Reason"
                  value={personalData.physical_attributes?.disability_reason}
                  isEditing={isEditingPersonal}
                  name="disability_reason"
                  onChange={handlePersonalChange}
                />
              )}
              <InfoRow
                label="Smoking"
                value={personalData.lifestyle?.smoke}
                isEditing={isEditingPersonal}
                name="smoke"
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
                value={personalData.lifestyle?.drink}
                isEditing={isEditingPersonal}
                name="drink"
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
                value={personalData.lifestyle?.veg_nonveg}
                isEditing={isEditingPersonal}
                name="veg_nonveg"
                onChange={handlePersonalChange}
                type="select"
                options={[
                  { value: "veg", label: "Vegetarian" },
                  { value: "nonveg", label: "Non-Vegetarian" },
                ]}
              />
              <InfoRow
                label="NRI Status"
                value={personalData.lifestyle?.nri_status}
                isEditing={isEditingPersonal}
                name="nri_status"
                onChange={handlePersonalChange}
                type="select"
                options={[
                  { value: "true", label: "Yes" },
                  { value: "false", label: "No" },
                ]}
              />
            </div>
            {isEditingPersonal ? (
              <div className="mt-4 flex space-x-4">
                <button
                  className="px-4 py-2 bg-[#990000] hover:bg-[#800000] text-white rounded-lg"
                  onClick={handleSavePersonal}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-lg"
                  onClick={handleCancelPersonal}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-[#990000] hover:bg-[#800000] text-white rounded-lg"
                onClick={() => setIsEditingPersonal(true)}
              >
                Edit
              </button>
            )}
          </div>

          {/* 3. Family Details Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-lg font-semibold mb-4">Family Details</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <InfoRow
                label="Family Value"
                value={familyData.family_value}
                isEditing={isEditingFamily}
                name="family_value"
                onChange={handleFamilyChange}
              />
              <InfoRow
                label="Family Size"
                value={familyData.family_size}
                isEditing={isEditingFamily}
                name="family_size"
                onChange={handleFamilyChange}
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
            {isEditingFamily ? (
              <div className="mt-4 flex space-x-4">
                <button
                  className="px-4 py-2 bg-[#990000] hover:bg-[#800000] text-white rounded-lg"
                  onClick={handleSaveFamily}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-lg"
                  onClick={handleCancelFamily}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-[#990000] hover:bg-[#800000] text-white rounded-lg"
                onClick={() => setIsEditingFamily(true)}
              >
                Edit
              </button>
            )}
          </div>

          {/* 4. Education Details Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-lg font-semibold mb-4">Education Details</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <InfoRow
                label="Education Level"
                value={educationData.education_level}
                isEditing={isEditingEducation}
                name="education_level"
                onChange={handleEducationChange}
              />
              <InfoRow
                label="Education Field"
                value={educationData.education_field}
                isEditing={isEditingEducation}
                name="education_field"
                onChange={handleEducationChange}
              />
              <InfoRow
                label="Qualification Details"
                value={educationData.qualification_details}
                isEditing={isEditingEducation}
                name="qualification_details"
                onChange={handleEducationChange}
              />
            </div>
            {isEditingEducation ? (
              <div className="mt-4 flex space-x-4">
                <button
                  className="px-4 py-2 bg-[#990000] hover:bg-[#800000] text-white rounded-lg"
                  onClick={handleSaveEducation}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-lg"
                  onClick={handleCancelEducation}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-[#990000] hover:bg-[#800000] text-white rounded-lg"
                onClick={() => setIsEditingEducation(true)}
              >
                Edit
              </button>
            )}
          </div>

          {/* 5. Professional Details Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-lg font-semibold mb-4">Professional Details</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
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
                label="Working As"
                value={professionData.working_as}
                isEditing={isEditingProfession}
                name="working_as"
                onChange={handleProfessionChange}
              />
              <InfoRow
                label="Income"
                value={professionData.income}
                isEditing={isEditingProfession}
                name="income"
                onChange={handleProfessionChange}
              />
              <InfoRow
                label="Work Address"
                value={professionData.work_address}
                isEditing={isEditingProfession}
                name="work_address"
                onChange={handleProfessionChange}
              />
            </div>
            {isEditingProfession ? (
              <div className="mt-4 flex space-x-4">
                <button
                  className="px-4 py-2 bg-[#990000] hover:bg-[#800000] text-white rounded-lg"
                  onClick={handleSaveProfession}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-lg"
                  onClick={handleCancelProfession}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-[#990000] hover:bg-[#800000] text-white rounded-lg"
                onClick={() => setIsEditingProfession(true)}
              >
                Edit
              </button>
            )}
          </div>

          {/* 6. Location Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-lg font-semibold mb-4">Location Details</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <InfoRow
                label="City"
                value={locationData.city}
                isEditing={isEditingLocation}
                name="city"
                onChange={handleLocationChange}
              />
              <InfoRow
                label="Pincode"
                value={locationData.pincode}
                isEditing={isEditingLocation}
                name="pincode"
                onChange={handleLocationChange}
              />
            </div>
            {isEditingLocation ? (
              <div className="mt-4 flex space-x-4">
                <button
                  className="px-4 py-2 bg-[#990000] hover:bg-[#800000] text-white rounded-lg"
                  onClick={handleSaveLocation}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-lg"
                  onClick={() => setIsEditingLocation(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-[#990000] hover:bg-[#800000] text-white rounded-lg"
                onClick={() => setIsEditingLocation(true)}
              >
                Edit
              </button>
            )}
          </div>

          {/* 7. Astrology Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-lg font-semibold mb-4">Astrology Details</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <InfoRow
                label="Rashi Nakshatra"
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
              <InfoRow
                label="Gotra Mama"
                value={astrologyData.gotra_mama}
                isEditing={isEditingAstrology}
                name="gotra_mama"
                onChange={handleAstrologyChange}
              />
            </div>
            {isEditingAstrology ? (
              <div className="mt-4 flex space-x-4">
                <button
                  className="px-4 py-2 bg-[#990000] hover:bg-[#800000] text-white rounded-lg"
                  onClick={handleSaveAstrology}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-lg"
                  onClick={handleCancelAstrology}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-[#990000] hover:bg-[#800000] text-white rounded-lg"
                onClick={() => setIsEditingAstrology(true)}
              >
                Edit
              </button>
            )}
          </div>

          {/* 8. Hobbies Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-lg font-semibold mb-4">Hobbies</h3>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Hobbies (comma-separated)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Hobbies"
                value={hobbiesData.hobbies.join(", ")}
                onChange={handleHobbiesChange}
              />
            </div>
            {isEditingHobbies ? (
              <div className="mt-4 flex space-x-4">
                <button
                  className="px-4 py-2 bg-[#990000] hover:bg-[#800000] text-white rounded-lg"
                  onClick={handleSaveHobbies}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-lg"
                  onClick={() => setIsEditingHobbies(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-[#990000] hover:bg-[#800000] text-white rounded-lg"
                onClick={() => setIsEditingHobbies(true)}
              >
                Edit
              </button>
            )}
          </div>
        </main>
      </div>
      <Footer /> {/* Add Footer component */}
    </div>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <a
      href="#"
      className={`flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 ${
        active ? "bg-gray-100 font-semibold" : ""
      }`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
