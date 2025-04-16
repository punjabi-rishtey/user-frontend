import React, { useState, useEffect } from "react";
import axios from "axios";
import { InfoRow, SectionContainer, EditButtons } from "./ProfileUtils";

function ProfileInfoSection({
  user,
  updateUser,
  setBasicData: setParentBasicData,
  setPersonalData: setParentPersonalData,
  setHobbiesData: setParentHobbiesData,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hobbiesData, setHobbiesData] = useState({
    hobbies: [],
    newHobby: "",
  });

  const [basicData, setBasicData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    gender: "",
    dob: "",
    religion: "",
    marital_status: "",
  });

  const [personalData, setPersonalData] = useState({
    height: {
      feet: "",
      inches: "",
    },
    caste: "",
    language: "",
    mangalik: false,
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
    },
    home_address: {
      address: "",
      city: "",
    },
  });

  // Parse height from string to object
  const parseHeight = (heightString) => {
    if (!heightString) return { feet: "5", inches: "0" };
    const match = heightString.match(/(\d+)'(\d+)"/);
    return match
      ? { feet: match[1], inches: match[2] }
      : { feet: "5", inches: "0" };
  };

  // Update parent states for profile completion calculation
  useEffect(() => {
    if (basicData) {
      setParentBasicData(basicData);
    }
    if (personalData) {
      setParentPersonalData(personalData);
    }
    if (hobbiesData) {
      setParentHobbiesData(hobbiesData);
    }
  }, [
    basicData,
    personalData,
    hobbiesData,
    setParentBasicData,
    setParentPersonalData,
    setParentHobbiesData,
  ]);

  // Fetch user details
  useEffect(() => {
    if (user?._id) {
      fetchUserDetails();
    }
  }, [user?._id]);

  const fetchUserDetails = async () => {
    if (!user?._id) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        return;
      }

      const response = await axios.get(
        `https://backend-nm1z.onrender.com/api/users/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const userData = response.data;

      setBasicData({
        fullName: userData.name || "",
        mobile: userData.mobile || "",
        email: userData.email || "",
        gender: userData.gender || "",
        dob: userData.dob || "",
        religion: userData.religion || "",
        marital_status: userData.marital_status || "",
      });

      setPersonalData({
        height: parseHeight(userData.height),
        caste: userData.caste || "",
        language: userData.language || "",
        mangalik: userData.mangalik || false,
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
        },
        home_address: {
          address: userData.location?.address || "",
          city: userData.location?.city || "",
        },
      });

      // Set hobbies data
      setHobbiesData({
        hobbies:
          Array.isArray(userData.hobbies) && userData.hobbies.length > 0
            ? userData.hobbies.filter((hobby) => hobby !== "None")
            : [],
        newHobby: "",
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Failed to fetch user details.");
    }
    setLoading(false);
  };

  // Handle form changes
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

  // Save changes
  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://backend-nm1z.onrender.com/api/users/${user._id}`,
        { ...basicData, ...personalData, hobbies: hobbiesData.hobbies },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchUserDetails();
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to update profile.");
    }
    setLoading(false);
  };

  // Cancel editing
  const handleCancel = () => {
    fetchUserDetails();
    setIsEditing(false);
  };

  return (
    <SectionContainer title="Profile Information" isLoading={loading}>
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
            { value: "hindu", label: "Hindu" },
            { value: "sikh", label: "Sikh" },
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
            { value: "never_married", label: "Never Married" },
            { value: "divorced", label: "Divorced" },
            { value: "widow_widower", label: "Widow/Widower" },
            { value: "awaiting_divorce", label: "Awaiting Divorce" },
          ]}
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
          isEditing={isEditing}
          name="height.feet"
          onChange={handlePersonalChange}
        />
        <InfoRow
          label="Height (Inches)"
          value={personalData.height.inches}
          isEditing={isEditing}
          name="height.inches"
          onChange={handlePersonalChange}
        />
        <InfoRow
          label="Caste"
          value={personalData.caste}
          isEditing={isEditing}
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
          label="Mangalik Status"
          value={personalData.mangalik}
          isEditing={isEditing}
          name="mangalik"
          onChange={handlePersonalChange}
          type="select"
          options={[
            { value: "non_manglik", label: "Non Manglik" },
            { value: "manglik", label: "Manglik" },
            { value: "partial_manglik", label: "Partial Manglik" },
          ]}
        />
        <InfoRow
          label="Birth Time"
          value={personalData.birth_details.birth_time}
          isEditing={isEditing}
          name="birth_details.birth_time"
          onChange={handlePersonalChange}
          type="time"
        />
        <InfoRow
          label="Birth Place"
          value={personalData.birth_details.birth_place}
          isEditing={isEditing}
          name="birth_details.birth_place"
          onChange={handlePersonalChange}
        />
        <InfoRow
          label="Skin Tone"
          value={personalData.physical_attributes.skin_tone}
          isEditing={isEditing}
          name="physical_attributes.skin_tone"
          onChange={handlePersonalChange}
          type="select"
          options={[
            { value: "very_fair", label: "Very Fair" },
            { value: "fair", label: "Fair" },
            { value: "wheatish", label: "Wheatish" },
            { value: "dark", label: "Dark" },
          ]}
        />
        <InfoRow
          label="Body Type"
          value={personalData.physical_attributes.body_type}
          isEditing={isEditing}
          name="physical_attributes.body_type"
          onChange={handlePersonalChange}
          type="select"
          options={[
            { value: "slim", label: "Slim" },
            { value: "athletic", label: "Athletic" },
            { value: "average", label: "Average" },
            { value: "heavy", label: "Heavy" },
          ]}
        />
        <InfoRow
          label="Physical Disability"
          value={personalData.physical_attributes.physical_disability}
          isEditing={isEditing}
          name="physical_attributes.physical_disability"
          onChange={handlePersonalChange}
          type="select"
          options={[
            { value: "false", label: "No" },
            { value: "true", label: "Yes" },
          ]}
        />
        <InfoRow
          label="Disability Details"
          value={personalData.physical_attributes.disability_reason}
          isEditing={isEditing}
          name="physical_attributes.disability_reason"
          onChange={handlePersonalChange}
        />
        <InfoRow
          label="Smoking"
          value={personalData.lifestyle.smoke}
          isEditing={isEditing}
          name="lifestyle.smoke"
          onChange={handlePersonalChange}
          type="select"
          options={[
            { value: "no", label: "No" },
            { value: "yes", label: "Yes" },
            { value: "occasionally", label: "Occasionally" },
          ]}
        />
        <InfoRow
          label="Drinking"
          value={personalData.lifestyle.drink}
          isEditing={isEditing}
          name="lifestyle.drink"
          onChange={handlePersonalChange}
          type="select"
          options={[
            { value: "no", label: "No" },
            { value: "yes", label: "Yes" },
            { value: "occasionally", label: "Occasionally" },
          ]}
        />
        <InfoRow
          label="Diet Preference"
          value={personalData.lifestyle.veg_nonveg}
          isEditing={isEditing}
          name="lifestyle.veg_nonveg"
          onChange={handlePersonalChange}
          type="select"
          options={[
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
          isEditing={isEditing}
          name="lifestyle.nri_status"
          onChange={handlePersonalChange}
          type="select"
          options={[
            { value: "false", label: "No" },
            { value: "true", label: "Yes" },
          ]}
        />
      </div>

      {/* Hobbies Section */}
      <h4 className="text-md font-semibold mb-4 border-t pt-6">Hobbies</h4>
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
      <EditButtons
        isEditing={isEditing}
        onSave={handleSave}
        onCancel={handleCancel}
        onEdit={() => setIsEditing(true)}
        isSaving={loading}
      />
    </SectionContainer>
  );
}

export default ProfileInfoSection;
