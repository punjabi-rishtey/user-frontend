import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
import Header from "./Header";
import PreferencesPopup from "./PreferencesPopup";
// Import eye icons for password visibility toggle
import { Eye, EyeOff } from "lucide-react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    dob: "",
    religion: "",
    marital_status: "",
  });
  const [preferences, setPreferences] = useState({
    preference1: "",
    preference2: "",
    preference3: "",
  });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPreferences, setShowPreferences] = useState(false);
  // Add state for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const selectedPreferences = Object.values(preferences).filter(
      (pref) => pref !== ""
    );

    const payload = { ...formData, preferences: selectedPreferences };

    try {
      const response = await fetch(
        "https://backend-nm1z.onrender.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        // Show success message
        alert("Registration successful! Please login to continue.");

        // Redirect to login page and scroll to top
        navigate("/login", { replace: true });
        window.scrollTo(0, 0);
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred. Please check your network and try again.");
    }
  };

  // Custom field renderer function to handle special cases like password
  const renderField = (field) => {
    if (field.type === "select") {
      return (
        <select
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          className="w-full p-3 border border-[#6B4132] rounded-lg"
          required
        >
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    } else if (field.name === "password") {
      return (
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className="w-full p-3 border border-[#6B4132] rounded-lg"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B4132] hover:text-[#4F2F1D] focus:outline-none"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      );
    } else {
      return (
        <input
          type={field.type}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          className="w-full p-3 border border-[#6B4132] rounded-lg"
          required
        />
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FCF9F2]">
      <Header />

      {/* Signup Form */}
      <div className="flex-grow flex items-center justify-center my-16">
        <div className="flex space-x-10">
          <div
            className="bg-[#F5EDE7] p-8 rounded-lg shadow-lg"
            style={{ width: "450px" }}
          >
            <h2
              className="text-3xl mb-6 text-[#4F2F1D]"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
              }}
            >
              Sign Up
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Mobile", name: "mobile", type: "text" },
                {
                  label: "Gender",
                  name: "gender",
                  type: "select",
                  options: [
                    { value: "", label: "Select Gender" },
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ],
                },
                { label: "Date of Birth", name: "dob", type: "date" },
                {
                  label: "Religion",
                  name: "religion",
                  type: "select",
                  options: [
                    { value: "", label: "Select Religion" },
                    { value: "hindu", label: "Hindu" },
                    { value: "sikh", label: "Sikh" },
                  ],
                },
                {
                  label: "Marital Status",
                  name: "marital_status",
                  type: "select",
                  options: [
                    { value: "", label: "Select Marital Status" },
                    { value: "never_married", label: "Never Married" },
                    { value: "divorced", label: "Divorced" },
                    { value: "widow_widower", label: "Widow/Widower" },
                    { value: "awaiting_divorce", label: "Awaiting Divorce" },
                  ],
                },
                { label: "Email", name: "email", type: "email" },
                { label: "Password", name: "password", type: "password" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-[#6B4132] mb-2">
                    {field.label}
                  </label>
                  {renderField(field)}
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`bg-[#990000] text-white font-bold py-2 px-6 rounded-lg transition duration-300 ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#800000]"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
            </form>
            <div className="mt-6 text-center space-y-2">
              <button
                className="text-[#4A4A4A] hover:text-[#2D2D2D] hover:underline transition duration-300"
                onClick={() => navigate("/login")}
              >
                Already have an account? Login
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignupPage;
