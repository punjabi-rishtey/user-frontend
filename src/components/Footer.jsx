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
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gradient-to-t from-[#3D0000] to-[#B31312] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="flex flex-col space-y-8">
          {/* Logo and Description */}
          <div className="text-center">
            <img
              src={logoSrc}
              alt="Punjabi Matrimony Logo"
              className="h-20 mb-4 mx-auto"
            />
            <p className="text-sm text-gray-300 max-w-md mx-auto">
              Find your perfect life partner on our trusted platform. We bring
              love and connection closer for the Punjabi community.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-4 text-center sm:flex sm:flex-row sm:justify-center sm:space-x-6">
            <button
              onClick={() => handleNavigation("/")}
              className="hover:text-gray-400 transition duration-300 text-sm"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/about")}
              className="hover:text-gray-400 transition duration-300 text-sm"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigation("/findpartner")}
              className="hover:text-gray-400 transition duration-300 text-sm"
            >
              Find Partner
            </button>
            <button
              onClick={() => navigate("/testimonials")}
              className="hover:text-gray-400 transition duration-300 text-sm"
            >
              Testimonials
            </button>
            <button
              onClick={() => handleNavigation("/contact")}
              className="hover:text-gray-400 transition duration-300 text-sm"
            >
              Contact
            </button>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-500"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center space-y-4 text-sm text-gray-400">
          <p className="text-center">&copy; 2025 PunjabiMatrimony. All rights reserved.</p>
          <div className="flex space-x-4">
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
