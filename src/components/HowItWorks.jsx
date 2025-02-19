import React from "react";
import { UserPlus, Search, Heart, MessageSquare } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Sign Up",
      description: "Create your profile and join our trusted community.",
      icon: <UserPlus className="w-14 h-14 text-[#FF3D57]" />, // Updated color
    },
    {
      title: "Find Matches",
      description: "Browse and search for compatible profiles.",
      icon: <Search className="w-14 h-14 text-[#FF3D57]" />, // Updated color
    },
    {
      title: "Express Interest",
      description: "Send requests and connect with potential partners.",
      icon: <Heart className="w-14 h-14 text-[#FF3D57]" />, // Updated color
    },
    {
      title: "Start Your Journey",
      description: "Chat, build connections, and take the next step.",
      icon: <MessageSquare className="w-14 h-14 text-[#FF3D57]" />, // Updated color
    },
  ];

  return (
    <div className="bg-[#FFFFFF] py-16"> {/* Updated background color */}
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2
          className="text-5xl font-bold mb-12 text-[#111111]" // Updated text color and size
          style={{ fontFamily: "'Lora', serif" }} // Updated font
        >
          How It Works
        </h2>

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-14">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-center group">
              <div className="relative flex flex-col items-center bg-[#FEEAEA] p-6 rounded-lg shadow-lg transition-transform transform group-hover:scale-105 group-hover:bg-[#FFB6C1] border border-[#FFE5E5]">
                {/* Icon */}
                <div className="mb-4 p-4 rounded-full bg-[#FFFFFF]"> {/* Updated background color */}
                  {step.icon}
                </div>
                {/* Title */}
                <h3
                  className="text-2xl font-bold mb-2 text-[#111111]" // Updated text style
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {step.title}
                </h3>
                {/* Description */}
                <p 
                  className="text-[#333333] text-base" // Updated text color and size
                  style={{ fontFamily: "'Merriweather', serif" }}
                >
                  {step.description}
                </p>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="absolute hidden md:flex items-center justify-center -right-[45px] top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#FF3D57" // Updated arrow color
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 4l8 8-8 8"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HowItWorks;
