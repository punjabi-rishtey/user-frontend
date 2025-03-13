import React from "react";
import { FaCog, FaSignOutAlt, FaHeart, FaUser, FaComments, FaMoneyBill } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({ user, logout, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FaHeart className="text-[#B31312]" />, label: "My Matches", path: "/matches" },
    { icon: <FaComments className="text-[#B31312]" />, label: "Interests", path: "/interests" },
    { icon: <FaComments className="text-[#B31312]" />, label: "Chat List", path: "/chats" },
    { icon: <FaMoneyBill className="text-[#B31312]" />, label: "Plan", path: "/plan" },
    {
      icon: <FaCog className="text-[#B31312]" />,
      label: "Settings",
      path: "/settings",
      active: true,
    },
  ];

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <aside className="hidden md:block w-64 bg-white shadow-lg m-4 rounded-lg">
      <div className="p-5">
        <div className="text-center">
          <img
            src={user?.profilePicture || "/profile.jpg"}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-2 border-[#B31312] object-cover object-top sidebar-profile-image"
          />
          <h2 className="text-lg mt-3 text-[#111111]">{user?.name}</h2>
          <p className="text-sm text-[#333333]">
            {user?.profileType} User | {user?.location?.city || ""}
          </p>
        </div>
        <nav className="mt-6 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300 ${
                item.active ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#B31312] transition duration-300"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </nav>
      </div>
    </aside>
  );

  // Mobile Menu Toggle Button
  const MobileMenuButton = () => (
    <div className="md:hidden px-4 py-2 border-b bg-white">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="flex items-center space-x-2 text-[#B31312]"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        <span>Menu</span>
      </button>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    isMobileMenuOpen && (
      <>
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50">
          <div className="p-5">
            <div className="text-center">
              <img
                src={user?.profilePicture || "/profile.jpg"}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto border-2 border-[#B31312] sidebar-profile-image"
              />
              <h2 className="text-lg mt-3 text-[#111111]">{user?.name}</h2>
              <p className="text-sm text-[#333333]">
                {user?.profileType} User | {user?.location?.city || ""}
              </p>
            </div>
            <nav className="mt-6 space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300 ${
                    item.active ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#B31312] transition duration-300"
              >
                <FaSignOutAlt />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </aside>
      </>
    )
  );

  return (
    <>
      <MobileMenuButton />
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default ProfileSidebar;