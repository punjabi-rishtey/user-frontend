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
    document.body.style.overflow = "hidden";

    // Re-enable scroll on unmount
    return () => {
      document.body.style.overflow = "unset";
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
        // Scroll to top of page
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  return (
    <>
      {/* Overlay with blur effect similar to mobile sidebar */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Popup Content */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F5EDE7] p-8 rounded-lg shadow-2xl w-full max-w-md z-50 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className="text-2xl mb-6 text-[#4F2F1D]"
          style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
        >
          Set Your Partner Preferences
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            {
              label: "Height",
              name: "height",
              type: "select",
              options: [
                { value: "", label: "Select Height" },
                { value: "5.0", label: "5'0\" (152 cm)" },
                { value: "5.1", label: "5'1\" (154 cm)" },
                { value: "5.2", label: "5'2\" (157 cm)" },
                { value: "5.3", label: "5'3\" (160 cm)" },
                { value: "5.4", label: "5'4\" (162 cm)" },
                { value: "5.5", label: "5'5\" (165 cm)" },
                { value: "5.6", label: "5'6\" (167 cm)" },
                { value: "5.7", label: "5'7\" (170 cm)" },
                { value: "5.8", label: "5'8\" (172 cm)" },
                { value: "5.9", label: "5'9\" (175 cm)" },
                { value: "5.10", label: "5'10\" (177 cm)" },
                { value: "5.11", label: "5'11\" (180 cm)" },
                { value: "6.0", label: "6'0\" (182 cm)" },
                { value: "6.1", label: "6'1\" (185 cm)" },
                { value: "6.2", label: "6'2\" (187 cm)" },
              ],
            },
            {
              label: "Caste",
              name: "caste",
              type: "select",
              options: [
                { value: "", label: "Select Caste" },
                { value: "khatri", label: "Khatri" },
                { value: "arora", label: "Arora" },
                { value: "brahmin", label: "Brahmin" },
                { value: "other", label: "Other" },
              ],
            },
            {
              label: "Manglik Status",
              name: "manglik",
              type: "select",
              options: [
                { value: "", label: "Select Manglik Status" },
                { value: "manglik", label: "Manglik" },
                { value: "partial_manglik", label: "Partial Manglik" },
                { value: "non_manglik", label: "Non Manglik" },
              ],
            },
            { label: "Location", name: "location", type: "text" },
            {
              label: "Family Values",
              name: "familyValues",
              type: "select",
              options: [
                { value: "", label: "Select Family Values" },
                { value: "traditional", label: "Traditional" },
                { value: "moderate", label: "Moderate" },
                { value: "liberal", label: "Liberal" },
              ],
            },
            {
              label: "Diet Preference",
              name: "diet",
              type: "select",
              options: [
                { value: "", label: "Select Diet" },
                { value: "veg", label: "Vegetarian" },
                { value: "nonveg", label: "Non-Vegetarian" },
                {
                  value: "occasionally_nonveg",
                  label: "Occasionally Non-Vegetarian",
                },
              ],
            },
          ].map((field) => (
            <div key={field.name}>
              <label
                className="block text-[#6B4132] mb-2"
                style={{
                  fontFamily: "'Modern Era', sans-serif",
                  fontWeight: 400,
                }}
              >
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={preferences[field.name]}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#6B4132] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
                  style={{
                    fontFamily: "'Modern Era', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={preferences[field.name]}
                  onChange={handleChange}
                  placeholder="Enter location"
                  className="w-full p-3 border border-[#6B4132] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
                  style={{
                    fontFamily: "'Modern Era', sans-serif",
                    fontWeight: 400,
                  }}
                />
              )}
            </div>
          ))}

          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              style={{
                fontFamily: "'Modern Era', sans-serif",
                fontWeight: 400,
              }}
            >
              Save Preferences
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              style={{
                fontFamily: "'Modern Era', sans-serif",
                fontWeight: 400,
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PreferencesPopup;
