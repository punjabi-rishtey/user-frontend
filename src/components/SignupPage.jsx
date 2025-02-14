import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
import Header from "./Header";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Header />

      {/* Signup Form */}
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
            Sign Up
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#4F2F1D] mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#4F2F1D] mb-2">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#4F2F1D] mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-[#4F2F1D] mb-2">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#4F2F1D] mb-2">Religion</label>
              <select
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                required
              >
                <option value="">Select Religion</option>
                <option value="hindu">Hindu</option>
                <option value="sikh">Sikh</option>
                <option value="jain">Jain</option>
                <option value="buddhist">Buddhist</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-[#4F2F1D] mb-2">
                Marital Status
              </label>
              <select
                name="marital_status"
                value={formData.marital_status}
                onChange={handleChange}
                className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                required
              >
                <option value="">Select Marital Status</option>
                <option value="never_married">Never Married</option>
                <option value="divorced">Divorced</option>
                <option value="widow_widower">Widow/Widower</option>
                <option value="awaiting_divorce">Awaiting Divorce</option>
                <option value="annulled">Annulled</option>
              </select>
            </div>
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
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <button
              className="text-[#990000] hover:underline"
              onClick={() => navigate("/login")}
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SignupPage;
