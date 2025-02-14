import React from "react";
import { useNavigate } from "react-router-dom";
import logoSrc from "../assets/logo.png"; // Logo path
import profileIcon from "../assets/profile.png"; // Profile icon path
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="w-full p-4 bg-[#4F2F1D] shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <img src={logoSrc} alt="Punjabi Matrimony Logo" className="h-16" />
        </div>
        <nav className="flex space-x-4">
          <a
            href="#"
            onClick={() => navigate("/")}
            className="text-white hover:text-gray-400 transition duration-300"
          >
            Home
          </a>
          <a
            href="#"
            onClick={() => navigate("/about")}
            className="text-white hover:text-gray-400 transition duration-300"
          >
            About Us
          </a>
          <a
            href="#"
            className="text-white hover:text-gray-400 transition duration-300"
          >
            Services
          </a>
          <a
            href="#"
            className="text-white hover:text-gray-400 transition duration-300"
          >
            Contact
          </a>
        </nav>
        <div>
          {isAuthenticated ? (
            <img
              src={profileIcon}
              alt="Profile"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={handleProfileClick}
            />
          ) : (
            <>
              <button
                className="bg-transparent border-2 border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="ml-4 bg-transparent border-2 border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
