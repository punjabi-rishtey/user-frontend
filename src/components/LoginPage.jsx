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
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Header />

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center my-16">
        {" "}
        {/* Added margin */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#4F2F1D",
            }}
          >
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#4F2F1D] mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#4F2F1D] mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <button
              className="text-[#990000] hover:underline"
              onClick={() => navigate("/signup")}
            >
              Don't have an account? Sign Up
            </button>
          </div>
          <div className="mt-4 text-center">
            <button className="text-[#990000] hover:underline">
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
