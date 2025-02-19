import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";

const PreferencesPage = () => {
  const { updatePreferences } = useAuth();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    height: "",
    caste: "",
    manglik: "",
    location: "",
    familyValues: "",
    diet: "",
  });

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
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-[#4F2F1D] font-playfair">
            Set Your Partner Preferences
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-[#4F2F1D] mb-2">Height Range</label>
                <select
                  name="height"
                  value={preferences.height}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                  required
                >
                  <option value="">Select Height Range</option>
                  <option value="150-160">150-160 cm</option>
                  <option value="161-170">161-170 cm</option>
                  <option value="171-180">171-180 cm</option>
                  <option value="181-190">181-190 cm</option>
                </select>
              </div>

              <div>
                <label className="block text-[#4F2F1D] mb-2">Caste</label>
                <select
                  name="caste"
                  value={preferences.caste}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                  required
                >
                  <option value="">Select Caste</option>
                  <option value="brahmin">Brahmin</option>
                  <option value="kshatriya">Kshatriya</option>
                  <option value="vaishya">Vaishya</option>
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
                  required
                >
                  <option value="">Select Manglik Status</option>
                  <option value="manglik">Manglik</option>
                  <option value="non_manglik">Non Manglik</option>
                  <option value="partial_manglik">Partial Manglik</option>
                </select>
              </div>

              <div>
                <label className="block text-[#4F2F1D] mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={preferences.location}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                  required
                  placeholder="Enter preferred location"
                />
              </div>

              <div>
                <label className="block text-[#4F2F1D] mb-2">Family Values</label>
                <select
                  name="familyValues"
                  value={preferences.familyValues}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                  required
                >
                  <option value="">Select Family Values</option>
                  <option value="traditional">Traditional</option>
                  <option value="moderate">Moderate</option>
                  <option value="liberal">Liberal</option>
                </select>
              </div>

              <div>
                <label className="block text-[#4F2F1D] mb-2">Diet</label>
                <select
                  name="diet"
                  value={preferences.diet}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                  required
                >
                  <option value="">Select Diet Preference</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non_vegetarian">Non-Vegetarian</option>
                  <option value="eggetarian">Eggetarian</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Save Preferences
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PreferencesPage;