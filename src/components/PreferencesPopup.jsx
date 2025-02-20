import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const PreferencesPopup = ({ onClose, initialPreferences = null }) => {
  const { updatePreferences } = useAuth();
  const [preferences, setPreferences] = useState({
    height: "",
    caste: "",
    manglik: "",
    location: "",
    familyValues: "",
    diet: "",
  });

  useEffect(() => {
    if (initialPreferences) {
      setPreferences(initialPreferences);
    }
  }, [initialPreferences]);

  // Add effect to handle body scroll
  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = 'hidden';
    
    // Re-enable scroll on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await updatePreferences(preferences);
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Popup Content */}
      <div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-2xl w-full max-w-md z-50 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-[#4F2F1D] font-playfair">
          Set Your Partner Preferences
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#4F2F1D] mb-2">Height</label>
            <select
              name="height"
              value={preferences.height}
              onChange={handleChange}
              className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
            >
              <option value="">Select Height</option>
              <option value="5.0">5'0" (152 cm)</option>
              <option value="5.1">5'1" (154 cm)</option>
              <option value="5.2">5'2" (157 cm)</option>
              <option value="5.3">5'3" (160 cm)</option>
              <option value="5.4">5'4" (162 cm)</option>
              <option value="5.5">5'5" (165 cm)</option>
              <option value="5.6">5'6" (167 cm)</option>
              <option value="5.7">5'7" (170 cm)</option>
              <option value="5.8">5'8" (172 cm)</option>
              <option value="5.9">5'9" (175 cm)</option>
              <option value="5.10">5'10" (177 cm)</option>
              <option value="5.11">5'11" (180 cm)</option>
              <option value="6.0">6'0" (182 cm)</option>
              <option value="6.1">6'1" (185 cm)</option>
              <option value="6.2">6'2" (187 cm)</option>
            </select>
          </div>

          <div>
            <label className="block text-[#4F2F1D] mb-2">Caste</label>
            <select
              name="caste"
              value={preferences.caste}
              onChange={handleChange}
              className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
            >
              <option value="">Select Caste</option>
              <option value="khatri">Khatri</option>
              <option value="arora">Arora</option>
              <option value="brahmin">Brahmin</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-[#4F2F1D] mb-2">Manglik Status</label>
            <select
              name="manglik"
              value={preferences.manglik}
              onChange={handleChange}
              className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
            >
              <option value="">Select Manglik Status</option>
              <option value="manglik">Manglik</option>
              <option value="partial_manglik">Partial Manglik</option>
              <option value="non_manglik">Non Manglik</option>
            </select>
          </div>

          <div>
            <label className="block text-[#4F2F1D] mb-2">Location</label>
            <select
              name="location"
              value={preferences.location}
              onChange={handleChange}
              className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
            >
              <option value="">Select Location</option>
              <option value="indore">Indore</option>
              <option value="delhi">Delhi</option>
              <option value="mumbai">Mumbai</option>
              <option value="bangalore">Bangalore</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="chennai">Chennai</option>
              <option value="kolkata">Kolkata</option>
              <option value="pune">Pune</option>
              <option value="jaipur">Jaipur</option>
              <option value="ahmedabad">Ahmedabad</option>
              <option value="chandigarh">Chandigarh</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-[#4F2F1D] mb-2">Family Values</label>
            <select
              name="familyValues"
              value={preferences.familyValues}
              onChange={handleChange}
              className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
            >
              <option value="">Select Family Values</option>
              <option value="traditional">Traditional</option>
              <option value="moderate">Moderate</option>
              <option value="liberal">Liberal</option>
            </select>
          </div>

          <div>
            <label className="block text-[#4F2F1D] mb-2">Diet Preference</label>
            <select
              name="diet"
              value={preferences.diet}
              onChange={handleChange}
              className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
            >
              <option value="">Select Diet</option>
              <option value="veg">Vegetarian</option>
              <option value="nonveg">Non-Vegetarian</option>
              <option value="occasionally_nonveg">Occasionally Non-Vegetarian</option>
            </select>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Save Preferences
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Skip
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PreferencesPopup;