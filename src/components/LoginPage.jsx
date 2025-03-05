import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoSrc from "../assets/logo.png"; // Logo path, ensure it's correct or update accordingly
import Footer from "./Footer";
import Header from "./Header";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    console.log("Login success:", success, "Redirecting to:", redirectPath); // Debugging redirect
    if (success) {
      navigate(redirectPath);
    }
  };



  

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FCF9F2]">
      <Header />

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center my-16">
        <div className="bg-[#F5EDE7] p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl mb-6 text-[#4F2F1D]" style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}>
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#6B4132] mb-2" style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-[#6B4132] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-[#6B4132] mb-2" style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-[#6B4132] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-6 rounded-lg transition duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center space-y-2">
            <button
              className="text-[#4A4A4A] hover:text-[#2D2D2D] hover:underline transition duration-300"
              onClick={() => navigate("/signup")}
              style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
            >
              Don't have an account? Sign Up
            </button>
            <br />
            <button 
              className="text-[#4A4A4A] hover:text-[#2D2D2D] hover:underline transition duration-300"
              style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
