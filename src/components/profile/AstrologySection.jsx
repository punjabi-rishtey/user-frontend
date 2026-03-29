import React, { useState, useEffect } from "react";
import { InfoRow, SectionContainer, EditButtons } from "./ProfileUtils";
import { apiUrl } from "../../config/constants";
import { authApi, isSessionExpiryError } from "../../config/authClient";

const AstrologySection = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [astrologyData, setAstrologyData] = useState({
    rashi_nakshatra: "",
    gotra: "",
  });

  useEffect(() => {
    if (user?._id) {
      fetchAstrologyDetails();
    }
  }, [user?._id]);

  const fetchAstrologyDetails = async () => {
    if (!user?._id) return;

    setLoading(true);
    try {
      const response = await authApi.get(apiUrl(`/api/astrologies/${user._id}`), {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setAstrologyData(response.data);
    } catch (error) {
      if (isSessionExpiryError(error)) {
        return;
      }

      console.error("Error fetching astrology details:", error);
      if (error.response?.status !== 401) {
        // alert("Failed to fetch astrology details.");
        console.log("Failed to fetch astrology details.", error);
      }
    }
    setLoading(false);
  };

  const handleAstrologyChange = (e) => {
    const { name, value } = e.target;
    setAstrologyData({
      ...astrologyData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await authApi.put(
        apiUrl(`/api/astrologies/${user._id}`),
        astrologyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Astrology details updated successfully!");
        setIsEditing(false);
      } else {
        alert("Unexpected response from server. Please try again.");
      }
    } catch (error) {
      if (isSessionExpiryError(error)) {
        return;
      }

      if (error.response?.status === 500) {
        alert("Server error! Please try again later.");
      } else {
        console.error("Error saving astrology details:", error);
        alert("Failed to update astrology details. Please try again.");
      }
    }
    setLoading(false);
  };

  const handleCancel = () => {
    fetchAstrologyDetails();
    setIsEditing(false);
  };

  return (
    <SectionContainer title="Astrology Details" isLoading={loading}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoRow
          label="Rashi/Nakshatra"
          value={astrologyData.rashi_nakshatra}
          isEditing={isEditing}
          name="rashi_nakshatra"
          onChange={handleAstrologyChange}
        />
        <InfoRow
          label="Gotra"
          value={astrologyData.gotra}
          isEditing={isEditing}
          name="gotra"
          onChange={handleAstrologyChange}
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

export default AstrologySection;
