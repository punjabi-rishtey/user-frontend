import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoSrc from "../assets/logo.png"; // Logo path
import Footer from "./Footer";
import Header from "./Header";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(formData);
    if (success) {
      navigate(redirectPath);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FCF9F2]">
      <Header />

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center my-16">
        {" "}
        {/* Added margin */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2
            className="text-3xl mb-6 text-[#111111]"
            style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
          >
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label 
                className="block text-[#333333] mb-2"
                style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-[#FFE5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3D57] bg-white"
                style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                required
              />
            </div>
            <div className="mb-6">
              <label 
                className="block text-[#333333] mb-2"
                style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-[#FFE5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3D57] bg-white"
                style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#FF3D57] hover:bg-[#FF6B80] text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-6 text-center space-y-2">
            <button
              className="text-[#FF3D57] hover:text-[#FF6B80] transition duration-300"
              onClick={() => navigate("/signup")}
              style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
            >
              Don't have an account? Sign Up
            </button>
            <br />
            <button 
              className="text-[#FF3D57] hover:text-[#FF6B80] transition duration-300"
              style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoginPage;
