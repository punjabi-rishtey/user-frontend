import React, { useState, useEffect } from "react";
import { InfoRow, SectionContainer, EditButtons } from "./ProfileUtils";
import { apiUrl } from "../../config/constants";
import { authApi, isSessionExpiryError } from "../../config/authClient";

const EducationSection = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [educationData, setEducationData] = useState({
    education_level: "",
    education_field: "",
    college_details: {
      name: "",
      city: "",
      passout_year: "",
    },
  });

  useEffect(() => {
    if (user?._id) {
      fetchEducationDetails();
    }
  }, [user?._id]);

  const fetchEducationDetails = async () => {
    if (!user?._id) return;

    setLoading(true);
    try {
      const response = await authApi.get(apiUrl(`/api/educations/${user._id}`), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setEducationData(response.data);
    } catch (error) {
      if (isSessionExpiryError(error)) {
        return;
      }

      if (error.response?.status !== 401) {
        console.error("Error fetching education details:", error);
        // alert("Failed to fetch education details.");
      }
    }
    setLoading(false);
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

  const handleSave = async () => {
    setLoading(true);
    try {
      await authApi.put(apiUrl(`/api/educations/${user._id}`), educationData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsEditing(false);
      alert("Education details updated successfully!");
    } catch (error) {
      if (isSessionExpiryError(error)) {
        return;
      }

      console.error("Error saving education details:", error);
      alert("Failed to update education details. Please try again.");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    fetchEducationDetails();
    setIsEditing(false);
  };

  return (
    <SectionContainer title="Education Details" isLoading={loading}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoRow
          label="Education Level"
          value={educationData.education_level || ""}
          isEditing={isEditing}
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
          isEditing={isEditing}
          name="education_field"
          onChange={handleEducationChange}
          type="text"
          placeholder="Enter your field of education (e.g., Computer Science, Medicine, Business)"
        />

        {/* College Details */}
        <div className="col-span-2">
          <h4 className="text-md font-semibold mb-2 mt-4">College Details</h4>
        </div>
        <InfoRow
          label="College Name"
          value={educationData?.college_details?.name || ""}
          isEditing={isEditing}
          name="college_details.name"
          onChange={handleEducationChange}
        />
        <InfoRow
          label="College City"
          value={educationData?.college_details?.city || ""}
          isEditing={isEditing}
          name="college_details.city"
          onChange={handleEducationChange}
        />
        <InfoRow
          label="Passout Year"
          value={educationData?.college_details?.passout_year || ""}
          isEditing={isEditing}
          name="college_details.passout_year"
          onChange={handleEducationChange}
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

export default EducationSection;
