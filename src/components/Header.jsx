import React from "react";
import { useNavigate } from "react-router-dom";
import logoSrc from "../assets/logo.png";
import profileIcon from "../assets/profile.png";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleProfileClick = () => {
    navigate("/profilepage");
  };

  const handleFindPartnerClick = () => {
    if (isAuthenticated) {
      navigate("/findpartner");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full p-4 bg-gradient-to-b from-[#3D0000] to-[#B31312] shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div>
          <img 
            src={logoSrc} 
            alt="Punjabi Matrimony Logo" 
            className="h-16 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <nav className="flex space-x-6">
          <button
            onClick={() => navigate("/")}
            className="text-white hover:text-gray-400 transition duration-300 hover:underline"
            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
          >
            Home
          </button>
          <button
            onClick={() => navigate("/about")}
            className="text-white hover:text-gray-400 transition duration-300 hover:underline"
            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
          >
            About Us
          </button>
          <button
            onClick={handleFindPartnerClick}
            className="text-white hover:text-gray-400 transition duration-300 hover:underline"
            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
          >
            Find Your Partner
          </button>
          <button
            onClick={() => navigate("/membership")}
            className="text-white hover:text-gray-400 transition duration-300 hover:underline"
            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
          >
            Membership Plans
          </button>
          <button
            onClick={() => navigate("/testimonials")}
            className="text-white hover:text-gray-400 transition duration-300 hover:underline"
            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
          >
            Testimonials
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="text-white hover:text-gray-400 transition duration-300 hover:underline"
            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
          >
            Contact
          </button>
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
            <div className="flex space-x-4">
              <button
                className="bg-transparent border-2 border-white text-white px-4 py-2 rounded hover:bg-white hover:text-[#4F2F1D] transition duration-300"
                onClick={() => navigate("/login")}
                style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
              >
                Login
              </button>
              <button
                className="bg-transparent border-2 border-white text-white px-4 py-2 rounded hover:bg-white hover:text-[#4F2F1D] transition duration-300"
                onClick={() => navigate("/signup")}
                style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;