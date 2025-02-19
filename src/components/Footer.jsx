import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoSrc from "../assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleNavigation = (path) => {
    if (path === "/findpartner" && !isAuthenticated) {
      navigate("/login");
    } else {
      navigate(path);
    }
    window.scrollTo(0, 0); // Scroll to top
  };

  return (
    <footer className="bg-gradient-to-t from-[black] to-[#6F0B11] text-white py-10">
      <div className="container mx-auto px-6"> {/* Added px-6 for horizontal padding */}
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Description */}
          <div className="text-center md:text-left px-4"> {/* Added px-4 for logo section */}
            <img
              src={logoSrc}
              alt="Punjabi Matrimony Logo"
              className="h-24 mb-4 mx-auto md:mx-0"
            />
            <p className="text-sm text-gray-300 mt-2 max-w-md">
              Find your perfect life partner on our trusted platform. We bring
              love and connection closer for the Punjabi community.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-center">
            <button
              onClick={() => handleNavigation("/")}
              className="hover:text-gray-400 transition duration-300 hover:underline"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/about")}
              className="hover:text-gray-400 transition duration-300 hover:underline"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigation("/findpartner")}
              className="hover:text-gray-400 transition duration-300 hover:underline"
            >
              Find Your Partner
            </button>
            <button
              onClick={() => navigate("/testimonials")}
              className="text-white hover:text-gray-400 transition duration-300 hover:underline"
            >
              Testimonials
            </button>
            <button
              onClick={() => handleNavigation("/contact")}
              className="hover:text-gray-400 transition duration-300 hover:underline"
            >
              Contact
            </button>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-500"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2025 PunjabiMatrimony. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
