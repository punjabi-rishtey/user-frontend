import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import videoSrc from "../assets/WeddingVideo.mp4";
import logoSrc from "../assets/logo.png";
import profileIcon from "../assets/profile.png";
import { useAuth } from "../context/AuthContext";

const HeroWithHeader = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const handleFindPartnerClick = () => {
    if (isAuthenticated) {
      navigate("/findpartner");
    } else {
      navigate("/login", { state: { from: "/findpartner" } });
    }
    setIsSidebarOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profilepage");
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
    { label: "Membership Details", onClick: handleMembershipPlanClick },
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
    <div className="relative h-screen overflow-hidden bg-[#800000] w-full">
      {/* Loading spinner for video only - positioned on top of video */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-1">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        </div>
      )}

      <video
        autoPlay
        loop
        muted
        playsInline
        className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        onCanPlayThrough={() => setIsVideoLoaded(true)}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Header Bar - z-index higher than loading spinner */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-md z-10 w-full">
        <div className="container mx-auto flex justify-between items-center px-4 max-w-full">
          <div onClick={() => navigate("/")}>
            <img
              src={logoSrc}
              alt="Logo"
              className="h-12 sm:h-16 cursor-pointer"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(item)}
                className="text-white hover:text-gray-400 transition duration-300 hover:underline"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Profile / Auth Buttons */}
          <div className="flex items-center space-x-4 text-white">
            {isAuthenticated && (
              <div>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white cursor-pointer">
                  <img
                    src={user?.profile_pictures?.[0] || profileIcon}
                    alt="Profile"
                    className="w-full h-full object-cover object-top"
                    onClick={handleProfileClick}
                  />
                </div>
                <span>{user?.name.match(/^\s*([^\s]+)/)?.[1]}</span>
              </div>
            )}
            {!isAuthenticated && (
              <div className="hidden md:flex space-x-4">
                <button
                  className="bg-transparent border-2 border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="bg-transparent border-2 border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </div>
            )}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu - z-index higher than everything else */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-50 md:hidden bg-black/20 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <div
            className="fixed right-0 top-0 h-full w-64 bg-gradient-to-b from-[#4F2F1D] to-[#2B1810] p-4 shadow-lg z-50 md:hidden"
            style={{
              transform: isSidebarOpen ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.3s ease-in-out",
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item)}
                  className="text-[#E5D3C8] hover:text-white transition duration-300 text-left py-2 hover:underline"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Hero Text - z-index higher than loading spinner */}
      <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 text-center text-white px-4 z-10 w-full">
        <h1
          className="text-3xl sm:text-5xl font-bold mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Together Forever
        </h1>
        <p
          className="text-lg sm:text-2xl mb-8 max-w-3xl mx-auto"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Join us in celebrating the journey of love and partnership, as we
          forge connections that stand the test of time and create memories that
          last a lifetime.
        </p>
        <button
          className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-3 px-8 rounded-md transition duration-300 shadow-lg"
          onClick={handleFindPartnerClick}
        >
          Find Your Partner!
        </button>
      </div>
    </div>
  );
};

export default HeroWithHeader;