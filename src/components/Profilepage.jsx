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

export default function ProfileSettings() {
  const { user, updateUser, logout } = useContext(AuthContext); // Use logout instead of signOut
  const navigate = useNavigate(); // Initialize useNavigate
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.name,
    mobile: user.mobile,
    email: user.email,
    password: "",
    gender: user.gender,
    dob: user.dob,
    religion: user.religion,
    marital_status: user.marital_status,
  });

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
              {user.profileType} user | {user.location}
            </p>
          </div>
          <nav className="mt-6 space-y-4">
            <NavItem icon={<FaUser />} label="Dashboard" />
            <NavItem icon={<FaHeart />} label="My Matches" />
            <NavItem icon={<FaUser />} label="Profile" />
            <NavItem icon={<FaComments />} label="Interests" />
            <NavItem icon={<FaComments />} label="Chat list" />
            <NavItem icon={<FaMoneyBill />} label="Plan" />
            <NavItem icon={<FaCog />} label="Setting" active />
            <NavItem
              icon={<FaSignOutAlt />}
              label="Log out"
              onClick={handleLogout} // Use handleLogout
            />
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
                    {user.profileType} user | {user.location}
                  </p>
                </div>
              </div>
              <button
                className="bg-[#990000] hover:bg-[#800000] text-white px-4 py-2 rounded-lg"
                onClick={handleLogout} // Use handleLogout
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Account Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-lg font-semibold">Account</h3>
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
        </main>
      </div>
      <Footer /> {/* Add Footer component */}
    </div>
  );
}

// Navigation Item Component
const NavItem = ({ icon, label, active, onClick }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
        active ? "bg-blue-100 text-blue-700" : "text-gray-600"
      }`}
      onClick={onClick}
    >
      {icon} <span>{label}</span>
    </div>
  );
};

// Info Row Component
const InfoRow = ({
  label,
  value,
  isEditing,
  name,
  onChange,
  type = "text",
  isPassword = false,
  options = [],
}) => {
  const formatValue = (name, value) => {
    if (name === "dob") {
      return new Date(value).toLocaleDateString();
    }
    if (name === "gender" || name === "religion" || name === "marital_status") {
      return value.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }
    return value;
  };

  return (
    <div>
      <h4 className="text-gray-600 text-sm">{label}</h4>
      {isEditing ? (
        type === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        )
      ) : (
        <p className="text-gray-800">
          {isPassword ? "••••••••" : formatValue(name, value)}
        </p>
      )}
    </div>
  );
};
