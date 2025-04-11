import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoSrc from "../assets/logo.png";
import profileIcon from "../assets/profile.png";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleProfileClick = () => {
    navigate("/profilepage");
    setIsSidebarOpen(false);
  };

  const handleFindPartnerClick = () => {
    if (isAuthenticated) {
      navigate("/findpartner");
    } else {
      navigate("/login");
    }
    setIsSidebarOpen(false);
  };

  const handleMembershipPlanClick = () => {
      if (user.status == "Approved") {
      navigate("/current-plan");
      console.log("> isAuthenticated && getMembershipStatus(): ", user.status)
    } else {
      navigate("/membership");
    }
  }

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Find Your Partner", onClick: handleFindPartnerClick },
    { label: "Membership Plans", onClick: handleMembershipPlanClick },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Contact", path: "/contact" },
  ];

  const handleNavClick = (item) => {
    if (item.onClick) {
      item.onClick();
    } else {
      navigate(item.path);
    }
    setIsSidebarOpen(false);
  };

  return (
    <div className="w-full p-4 bg-gradient-to-b from-[#4F2F1D] to-[#2B1810] shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div>
          <img
            src={logoSrc}
            alt="Punjabi Matrimony Logo"
            className="h-12 sm:h-16 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(item)}
              className="text-[#E5D3C8] hover:text-white transition duration-300 hover:underline"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu and Profile/Auth Buttons */}
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#E5D3C8] cursor-pointer">
              {/* user.profile_pictures[0] is updated automatically if
                  ProfileImageGallery calls refreshUser() after uploading */}
              <img
                src={user?.profile_pictures?.[0] || profileIcon}
                alt="Profile"
                className="w-full h-full object-cover object-top"
                onClick={handleProfileClick}
              />
            </div>
          )}

          {!isAuthenticated && (
            <div className="hidden md:flex space-x-4">
              <button
                className="bg-transparent border-2 border-[#E5D3C8] text-[#E5D3C8] px-4 py-2 rounded hover:bg-[#E5D3C8] hover:text-[#4F2F1D] transition duration-300"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-transparent border-2 border-[#E5D3C8] text-[#E5D3C8] px-4 py-2 rounded hover:bg-[#E5D3C8] hover:text-[#4F2F1D] transition duration-300"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#E5D3C8] p-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div
              className="fixed right-0 top-0 h-full w-64 bg-gradient-to-b from-[#4F2F1D] to-[#2B1810] p-4 shadow-lg z-50"
              style={{
                transform: isSidebarOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s ease-in-out'
              }}
            >
              <div className="flex justify-end">
                <button
                  className="text-[#E5D3C8] p-2"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavClick(item)}
                    className="text-[#E5D3C8] hover:text-white transition duration-300 text-left py-2"
                  >
                    {item.label}
                  </button>
                ))}
                {!isAuthenticated && (
                  <>
                    <button
                      className="bg-transparent border-2 border-[#E5D3C8] text-[#E5D3C8] px-4 py-2 rounded hover:bg-[#E5D3C8] hover:text-[#4F2F1D] transition duration-300 mt-4"
                      onClick={() => {
                        navigate("/login");
                        setIsSidebarOpen(false);
                      }}
                    >
                      Login
                    </button>
                    <button
                      className="bg-transparent border-2 border-[#E5D3C8] text-[#E5D3C8] px-4 py-2 rounded hover:bg-[#E5D3C8] hover:text-[#4F2F1D] transition duration-300"
                      onClick={() => {
                        navigate("/signup");
                        setIsSidebarOpen(false);
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
