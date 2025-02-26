import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
import Header from "./Header";
import PreferencesPopup from "./PreferencesPopup";

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
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPreferences, setShowPreferences] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = signup(formData);

    if (result.success) {
      setShowPreferences(true);
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FCF9F2]">
      <Header />

      {/* Signup Form */}
      <div className="flex-grow flex items-center justify-center my-16">
        {" "}
        {/* Added margin */}
        <div className="bg-[#F5EDE7] p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2
            className="text-3xl mb-6 text-[#4F2F1D]"
            style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
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
                  { value: "jain", label: "Jain" },
                  { value: "buddhist", label: "Buddhist" },
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
                  { value: "annulled", label: "Annulled" },
                ],
              },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
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
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#6B4132] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
                    style={{
                      fontFamily: "'Modern Era', sans-serif",
                      fontWeight: 400,
                    }}
                    required
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
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#6B4132] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
                    style={{
                      fontFamily: "'Modern Era', sans-serif",
                      fontWeight: 400,
                    }}
                    required
                  />
                )}
              </div>
            ))}

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                style={{
                  fontFamily: "'Modern Era', sans-serif",
                  fontWeight: 400,
                }}
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-6 text-center space-y-2">
            <button
              className="text-[#4A4A4A] hover:text-[#2D2D2D] hover:underline transition duration-300"
              onClick={() => navigate("/login")}
              style={{
                fontFamily: "'Modern Era', sans-serif",
                fontWeight: 400,
              }}
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>

      {showPreferences && (
        <PreferencesPopup
          onClose={() => {
            setShowPreferences(false);
            navigate("/", { replace: true });
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SignupPage;
