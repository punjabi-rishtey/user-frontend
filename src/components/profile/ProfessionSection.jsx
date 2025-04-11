import React, { useState, useEffect } from "react";
import axios from "axios";
import { InfoRow, SectionContainer, EditButtons } from "./ProfileUtils";

const ProfessionSection = ({ user, logout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (user?._id) {
      fetchProfessionDetails();
    }
  }, [user?._id]);

  const fetchProfessionDetails = async () => {
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
    setLoading(false);
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

  const handleSave = async () => {
    setLoading(true);
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

      setIsEditing(false);
      alert("Profession details updated successfully!");
    } catch (error) {
      console.error("Error saving profession details:", error);
      alert("Failed to update profession details. Please try again.");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    fetchProfessionDetails();
    setIsEditing(false);
  };

  return (
    <SectionContainer title="Professional Details" isLoading={loading}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoRow
          label="Occupation"
          value={professionData.occupation}
          isEditing={isEditing}
          name="occupation"
          onChange={handleProfessionChange}
        />
        <InfoRow
          label="Designation"
          value={professionData.designation}
          isEditing={isEditing}
          name="designation"
          onChange={handleProfessionChange}
        />
        <InfoRow
          label="Working With"
          value={professionData.working_with}
          isEditing={isEditing}
          name="working_with"
          onChange={handleProfessionChange}
        />
        <InfoRow
          label="Annual Income"
          value={professionData.income}
          isEditing={isEditing}
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
            { value: "100+", label: "1 Crore+" },
          ]}
        />

        <div className="col-span-2">
          <h4 className="text-md font-semibold mb-2 mt-4">
            Work Address
          </h4>
        </div>
        <InfoRow
          label="Address"
          value={professionData.work_address?.address || ""}
          isEditing={isEditing}
          name="work_address.address"
          onChange={handleProfessionChange}
        />
        <InfoRow
          label="City"
          value={professionData.work_address?.city || ""}
          isEditing={isEditing}
          name="work_address.city"
          onChange={handleProfessionChange}
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

export default ProfessionSection;