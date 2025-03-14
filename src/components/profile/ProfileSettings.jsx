import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ProfileImageGallery from "../ProfileImageGallery";
import ProfileSidebar from "./ProfileSidebar";
import ProfileInfoSection from "./ProfileInfoSection";
import FamilyDetailsSection from "./FamilyDetailsSection";
import EducationSection from "./EducationSection";
import ProfessionSection from "./ProfessionSection";
import AstrologySection from "./AstrologySection";
import ProfileCompletionCard from "./ProfileCompletionCard";

function ProfileSettings() {
  const { user, updateUser, logout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userImages, setUserImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  
  // States for different sections to calculate profile completion
  const [basicData, setBasicData] = useState({});
  const [personalData, setPersonalData] = useState({});
  const [hobbiesData, setHobbiesData] = useState({ hobbies: [] });
  const [professionData, setProfessionData] = useState({});
  const [familyData, setFamilyData] = useState({});
  const [educationData, setEducationData] = useState({});
  const [astrologyData, setAstrologyData] = useState({});

  // Refresh user data when component mounts to get latest data
  useEffect(() => {
    if (user?._id) {
      refreshUser();
    }
  }, []);

  // Initialize userImages when user data changes
  useEffect(() => {
    if (user) {
      setUserImages(
        user?.profilePictures?.length > 0
          ? user.profilePictures
          : [user?.profilePicture || "/profile.jpg"]
      );
    }
  }, [user]);

  // Update sidebar profile image when user profile picture changes
  useEffect(() => {
    if (user?.profilePicture) {
      const sidebarImages = document.querySelectorAll(".sidebar-profile-image");
      sidebarImages.forEach((img) => {
        img.src = user.profilePicture;
      });
    }
  }, [user?.profilePicture]);

  // Handle image upload and management
  const handleAddImage = async (file) => {
    setIsUploading(true);
    try {
      const imageUrl = URL.createObjectURL(file);

      const updatedUser = {
        ...user,
        profilePicture: imageUrl,
      };

      updateUser(updatedUser); // Update user context

      setUserImages((prev) => {
        if (prev.length === 1 && prev[0] === "/profile.jpg") {
          return [imageUrl];
        }
        return [...prev, imageUrl];
      });

      // Update the sidebar profile picture immediately
      const sidebarImages = document.querySelectorAll(".sidebar-profile-image");
      sidebarImages.forEach((img) => {
        img.src = imageUrl;
      });

      alert("Image added successfully!");
    } catch (error) {
      console.error("Error adding image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    if (window.confirm("Are you sure you want to remove this image?")) {
      // Remove the selected image
      const newImages = [...userImages];
      newImages.splice(index, 1);

      let updatedUser = { ...user };

      if (index === 0) {
        // If first image (profile picture) is deleted, update profile picture
        if (newImages.length > 0) {
          updatedUser.profilePicture = newImages[0]; // Set next image as profile picture
        } else {
          updatedUser.profilePicture = "/profile.jpg"; // Default fallback
        }
      }

      // Update state and user context
      setUserImages(newImages);
      updateUser(updatedUser);

      // Update sidebar profile picture
      const sidebarImages = document.querySelectorAll(".sidebar-profile-image");
      sidebarImages.forEach((img) => {
        img.src = updatedUser.profilePicture;
      });

      alert("Image removed successfully!");
    }
  };

  const handleEditImage = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      if (e.target.files && e.target.files[0]) {
        setIsUploading(true);
        try {
          const file = e.target.files[0];
          const imageUrl = URL.createObjectURL(file);

          const newImages = [...userImages];
          newImages[index] = imageUrl;
          setUserImages(newImages);

          if (index === 0) {
            const updatedUser = { ...user, profilePicture: imageUrl };
            updateUser(updatedUser);

            // Update sidebar profile picture
            const sidebarImages = document.querySelectorAll(
              ".sidebar-profile-image"
            );
            sidebarImages.forEach((img) => {
              img.src = imageUrl;
            });
          }

          alert("Image updated successfully!");
        } catch (error) {
          console.error("Error updating image:", error);
          alert("Failed to update image. Please try again.");
        } finally {
          setIsUploading(false);
        }
      }
    };
    input.click();
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#FCF9F2]">
      <Header />

      <div className="flex flex-1">
        {/* ProfileSidebar */}
        <div className="hidden md:block w-64 bg-white shadow-md">
          <ProfileSidebar 
            user={user}
            logout={logout}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden p-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white">
            <div className="p-4 flex justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
            <ProfileSidebar
              user={user}
              logout={logout}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Profile Image Gallery */}
          <ProfileImageGallery
            images={userImages}
            onAddImage={handleAddImage}
            onRemoveImage={handleRemoveImage} 
            onEditImage={handleEditImage}
          />

          {/* Profile Completion Progress Card */}
          <ProfileCompletionCard 
            basicData={basicData}
            personalData={personalData}
            hobbiesData={hobbiesData}
            professionData={professionData}
            familyData={familyData}
            educationData={educationData}
            astrologyData={astrologyData}
            userImages={userImages}
          />

          <h1 className="text-2xl md:text-3xl text-[#111111] mb-6">
            Profile Settings
          </h1>

          {/* Profile Sections */}
          <div className="space-y-6">
            {/* Basic Info, Personal Details, and Hobbies Section */}
            <ProfileInfoSection 
              user={user} 
              updateUser={updateUser} 
              setBasicData={setBasicData} 
              setPersonalData={setPersonalData}
              setHobbiesData={setHobbiesData}
            />

            {/* Family Details Section */}
            <FamilyDetailsSection 
              user={user} 
              logout={logout} 
              setFamilyData={setFamilyData} 
            />

            {/* Education Details Section */}
            <EducationSection 
              user={user} 
              logout={logout} 
              setEducationData={setEducationData} 
            />

            {/* Professional Details Section */}
            <ProfessionSection 
              user={user} 
              logout={logout}
              setProfessionData={setProfessionData}  
            />

            {/* Astrology Section */}
            <AstrologySection 
              user={user} 
              logout={logout} 
              setAstrologyData={setAstrologyData} 
            />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default ProfileSettings;