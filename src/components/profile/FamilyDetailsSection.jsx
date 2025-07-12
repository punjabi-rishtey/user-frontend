import React, { useState, useEffect } from "react";
import axios from "axios";
import { InfoRow, SectionContainer, EditButtons } from "./ProfileUtils";

const FamilyDetailsSection = ({ user, logout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (user?._id) {
      fetchFamilyDetails();
    }
  }, [user?._id]);

  const fetchFamilyDetails = async () => {
    if (!user?._id) return;

    setLoading(true);
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
        // alert("Failed to fetch family details.");
      }
    }
    setLoading(false);
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

  const handleSave = async () => {
    setLoading(true);
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

      setIsEditing(false);
      alert("Family details updated successfully!");
    } catch (error) {
      console.error("Error saving family details:", error);
      alert("Failed to update family details. Please try again.");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    fetchFamilyDetails();
    setIsEditing(false);
  };

  return (
    <SectionContainer title="Family Details" isLoading={loading}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoRow
          label="Family Value"
          value={familyData.family_value}
          isEditing={isEditing}
          name="family_value"
          onChange={handleFamilyChange}
          type="select"
          options={[
            { value: "orthodox", label: "Orthodox" },
            { value: "traditional", label: "Traditional" },
            { value: "liberal", label: "Liberal" },
            { value: "modern", label: "Modern" },
          ]}
        />
        <InfoRow
          label="Family Type"
          value={familyData.family_type}
          isEditing={isEditing}
          name="family_type"
          onChange={handleFamilyChange}
          type="select"
          options={[
            { value: "nuclear", label: "Nuclear Family" },
            { value: "joint", label: "Joint Family" },
            { value: "extended", label: "Extended Family" },
            { value: "living_alone", label: "Living Alone" },
          ]}
        />
        <InfoRow
          label="Mother's Name"
          value={familyData.mother?.name}
          isEditing={isEditing}
          name="mother.name"
          onChange={handleFamilyChange}
        />
        <InfoRow
          label="Mother's Occupation"
          value={familyData.mother?.occupation}
          isEditing={isEditing}
          name="mother.occupation"
          onChange={handleFamilyChange}
        />
        <InfoRow
          label="Father's Name"
          value={familyData.father?.name}
          isEditing={isEditing}
          name="father.name"
          onChange={handleFamilyChange}
        />
        <InfoRow
          label="Father's Occupation"
          value={familyData.father?.occupation}
          isEditing={isEditing}
          name="father.occupation"
          onChange={handleFamilyChange}
        />
        <InfoRow
          label="Brother Count"
          value={familyData.siblings?.brother_count}
          isEditing={isEditing}
          name="siblings.brother_count"
          onChange={handleFamilyChange}
          type="number"
        />
        <InfoRow
          label="Sister Count"
          value={familyData.siblings?.sister_count}
          isEditing={isEditing}
          name="siblings.sister_count"
          onChange={handleFamilyChange}
          type="number"
        />
      </div>

      <EditButtons
        isEditing={isEditing}
        onSave={handleSave}
        onCancel={handleCancel}
        onEdit={() => setIsEditing(true)}
        isSaving={loading}
      />
    </SectionContainer>
  );
};

export default FamilyDetailsSection;
