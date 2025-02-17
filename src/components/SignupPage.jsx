// filepath: src/components/SignupPage.jsx
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
    height: "",
    caste: "",
    language: "",
    mangalik: false,
    birth_details: {
      birth_time: "",
      birth_place: "",
    },
    physical_attributes: {
      skin_tone: "",
      body_type: "",
      physical_disability: false,
      disability_reason: "",
    },
    lifestyle: {
      smoke: false,
      drink: false,
      veg_nonveg: "",
      nri_status: false,
    },
    occupation: "",
    designation: "",
    working_with: "",
    working_as: "",
    income: "",
    work_address: "",
    family_value: "",
    family_size: "",
    mother: {
      name: "",
      occupation: "",
    },
    father: {
      name: "",
      occupation: "",
    },
    siblings: {
      brother_count: 0,
      sister_count: 0,
    },
    education_level: "",
    education_field: "",
    qualification_details: "",
    rashi_nakshatra: "",
    gotra: "",
    gotra_mama: "",
    location: {
      city: "",
      pincode: "",
    },
    hobbies: [],

    age: 0,
  });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name.includes(".")) {
        const [section, field] = name.split(".");
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData); // Pass the complete formData
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Header />

      {/* Signup Form */}
      <div className="flex-grow flex items-center justify-center my-16">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
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
            {/* Account Details Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-[#4F2F1D]">
                Account Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-[#4F2F1D] mb-2">
                    Date of Birth
                  </label>
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
              </div>
            </div>

            {/* Personal Details Section */}
            <div className="mb-6 border-t pt-6">
              <h3 className="text-xl font-semibold mb-4 text-[#4F2F1D]">
                Personal Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">Height</label>
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">Caste</label>
                  <select
                    name="caste"
                    value={formData.caste}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  >
                    <option value="">Select Caste</option>
                    <option value="khatri">Khatri</option>
                    <option value="arora">Arora</option>
                    <option value="brahmin">Brahmin</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">Language</label>
                  <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Mangalik Status
                  </label>
                  <select
                    name="mangalik"
                    value={formData.mangalik}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Birth Time
                  </label>
                  <input
                    type="time"
                    name="birth_details.birth_time"
                    value={formData.birth_details.birth_time}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Birth Place
                  </label>
                  <input
                    type="text"
                    name="birth_details.birth_place"
                    value={formData.birth_details.birth_place}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Physical Attributes Section */}
            <div className="mb-6 border-t pt-6">
              <h3 className="text-xl font-semibold mb-4 text-[#4F2F1D]">
                Physical Attributes
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">Skin Tone</label>
                  <select
                    name="physical_attributes.skin_tone"
                    value={formData.physical_attributes.skin_tone}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  >
                    <option value="">Select Skin Tone</option>
                    <option value="fair">Fair</option>
                    <option value="medium">Medium</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">Body Type</label>
                  <select
                    name="physical_attributes.body_type"
                    value={formData.physical_attributes.body_type}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  >
                    <option value="">Select Body Type</option>
                    <option value="slim">Slim</option>
                    <option value="athletic">Athletic</option>
                    <option value="average">Average</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Physical Disability
                  </label>
                  <select
                    name="physical_attributes.physical_disability"
                    value={formData.physical_attributes.physical_disability}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                {formData.physical_attributes.physical_disability && (
                  <div className="mb-4">
                    <label className="block text-[#4F2F1D] mb-2">
                      Disability Reason
                    </label>
                    <input
                      type="text"
                      name="physical_attributes.disability_reason"
                      value={formData.physical_attributes.disability_reason}
                      onChange={handleChange}
                      className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                      required
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Lifestyle Section */}
            <div className="mb-6 border-t pt-6">
              <h3 className="text-xl font-semibold mb-4 text-[#4F2F1D]">
                Lifestyle
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Diet Preference
                  </label>
                  <select
                    name="lifestyle.veg_nonveg"
                    value={formData.lifestyle.veg_nonveg}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  >
                    <option value="">Select Diet</option>
                    <option value="veg">Vegetarian</option>
                    <option value="nonveg">Non-Vegetarian</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    NRI Status
                  </label>
                  <select
                    name="lifestyle.nri_status"
                    value={formData.lifestyle.nri_status}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">Smoke</label>
                  <select
                    name="lifestyle.smoke"
                    value={formData.lifestyle.smoke}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">Drink</label>
                  <select
                    name="lifestyle.drink"
                    value={formData.lifestyle.drink}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Professional Details Section */}
            <div className="mb-6 border-t pt-6">
              <h3 className="text-xl font-semibold mb-4 text-[#4F2F1D]">
                Professional Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Working With
                  </label>
                  <input
                    type="text"
                    name="working_with"
                    value={formData.working_with}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Working As
                  </label>
                  <input
                    type="text"
                    name="working_as"
                    value={formData.working_as}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">Income</label>
                  <input
                    type="text"
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Work Address
                  </label>
                  <input
                    type="text"
                    name="work_address"
                    value={formData.work_address}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Family Details Section */}
            <div className="mb-6 border-t pt-6">
              <h3 className="text-xl font-semibold mb-4 text-[#4F2F1D]">
                Family Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Family Value
                  </label>
                  <input
                    type="text"
                    name="family_value"
                    value={formData.family_value}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Family Size
                  </label>
                  <input
                    type="number"
                    name="family_size"
                    value={formData.family_size}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    min="0"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    name="mother.name"
                    value={formData.mother.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Mother's Occupation
                  </label>
                  <input
                    type="text"
                    name="mother.occupation"
                    value={formData.mother.occupation}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    name="father.name"
                    value={formData.father.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Father's Occupation
                  </label>
                  <input
                    type="text"
                    name="father.occupation"
                    value={formData.father.occupation}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Number of Brothers
                  </label>
                  <input
                    type="number"
                    name="siblings.brother_count"
                    value={formData.siblings.brother_count}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    min="0"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Number of Sisters
                  </label>
                  <input
                    type="number"
                    name="siblings.sister_count"
                    value={formData.siblings.sister_count}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Education Details Section */}
            <div className="mb-6 border-t pt-6">
              <h3 className="text-xl font-semibold mb-4 text-[#4F2F1D]">
                Education Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Education Level
                  </label>
                  <input
                    type="text"
                    name="education_level"
                    value={formData.education_level}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Education Field
                  </label>
                  <input
                    type="text"
                    name="education_field"
                    value={formData.education_field}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Qualification Details
                  </label>
                  <textarea
                    name="qualification_details"
                    value={formData.qualification_details}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                    rows="3"
                  />
                </div>
              </div>
            </div>

            {/* Astrology Details Section */}
            <div className="mb-6 border-t pt-6">
              <h3 className="text-xl font-semibold mb-4 text-[#4F2F1D]">
                Astrology Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Rashi Nakshatra
                  </label>
                  <input
                    type="text"
                    name="rashi_nakshatra"
                    value={formData.rashi_nakshatra}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">Gotra</label>
                  <input
                    type="text"
                    name="gotra"
                    value={formData.gotra}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">
                    Gotra Mama
                  </label>
                  <input
                    type="text"
                    name="gotra_mama"
                    value={formData.gotra_mama}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location Section - New Section */}
            <div className="mb-6 border-t pt-6">
              <h3 className="text-xl font-semibold mb-4 text-[#4F2F1D]">
                Location Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">City</label>
                  <input
                    type="text"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4F2F1D] mb-2">Pincode</label>
                  <input
                    type="text"
                    name="location.pincode"
                    value={formData.location.pincode}
                    onChange={handleChange}
                    className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Hobbies Section - New Section */}
            <div className="mb-6 border-t pt-6">
              <h3 className="text-xl font-semibold mb-4 text-[#4F2F1D]">
                Hobbies & Interests
              </h3>
              <div className="mb-4">
                <label className="block text-[#4F2F1D] mb-2">Hobbies</label>
                <input
                  type="text"
                  name="hobbies"
                  value={formData.hobbies.join(", ")}
                  onChange={(e) => {
                    const hobbies = e.target.value
                      .split(",")
                      .map((hobby) => hobby.trim());
                    setFormData((prev) => ({
                      ...prev,
                      hobbies,
                    }));
                  }}
                  className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                  required
                />
              </div>
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
