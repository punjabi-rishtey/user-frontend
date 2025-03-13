import React from "react";

const ProfileCompletionCard = ({ 
  basicData, 
  personalData, 
  hobbiesData, 
  professionData, 
  familyData, 
  educationData, 
  astrologyData, 
  userImages 
}) => {
  const calculateProfileCompletion = () => {
    let filledFields = 0;
    let totalFields = 0;

    const checkFields = (obj) => {
      Object.values(obj).forEach((value) => {
        if (typeof value === "object" && value !== null) {
          checkFields(value);
        } else {
          totalFields++;
          if (value && value !== "") {
            filledFields++;
          }
        }
      });
    };

    checkFields(basicData);
    checkFields(personalData);
    checkFields(hobbiesData);
    checkFields(professionData);
    checkFields(familyData);
    checkFields(educationData);
    checkFields(astrologyData);

    // Ensure at least one profile image is added
    if (userImages.length > 0 && userImages[0] !== "/profile.jpg") {
      filledFields++;
    }
    totalFields++;

    // Calculate percentage
    return Math.round((filledFields / totalFields) * 100);
  };

  const completionPercentage = calculateProfileCompletion();

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-md md:text-lg text-[#111111] mb-2">
        Profile Completion
      </h3>
      <div className="relative w-full bg-gray-200 h-4 rounded-lg overflow-hidden">
        <div
          className="h-4 transition-all duration-500"
          style={{
            width: `${completionPercentage}%`,
            backgroundColor:
              completionPercentage < 34
                ? "#B31312" // Red (Low completion)
                : completionPercentage < 67
                ? "#A05A2C" // Brown (Medium completion)
                : "#168821", // Green (High completion)
          }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">
        {completionPercentage}% completed
      </p>
    </div>
  );
};

export default ProfileCompletionCard;