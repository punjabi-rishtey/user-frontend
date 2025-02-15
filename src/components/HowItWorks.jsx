import React from "react";
import { UserPlus, Search, Heart, MessageSquare } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Sign Up",
      description: "Create your profile and join our trusted community.",
      icon: <UserPlus className="w-14 h-14 text-[#4F2F1D]" />,
    },
    {
      title: "Find Matches",
      description: "Browse and search for compatible profiles.",
      icon: <Search className="w-14 h-14 text-[#4F2F1D]" />,
    },
    {
      title: "Express Interest",
      description: "Send requests and connect with potential partners.",
      icon: <Heart className="w-14 h-14 text-[#4F2F1D]" />,
    },
    {
      title: "Start Your Journey",
      description: "Chat, build connections, and take the next step.",
      icon: <MessageSquare className="w-14 h-14 text-[#4F2F1D]" />,
    },
  ];

  return (
    <div className="bg-[#F0ECE3] py-16">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl font-bold mb-12"
          style={{ fontFamily: "'Playfair Display', serif", color: "#4F2F1D" }}
        >
          How It Works
        </h2>

        {/* Flexbox layout for steps */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-14">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-center group">
              {/* Card with Hover Effect */}
              <div className="relative flex flex-col items-center bg-[#FFFFFF] p-6 rounded-lg shadow-md transition-transform transform group-hover:scale-105 group-hover:shadow-xl">
                {/* Icon */}
                <div className="mb-4 p-4 rounded-full bg-[#E2DED4]">
                  {step.icon}
                </div>
                {/* Title */}
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#4F2F1D",
                  }}
                >
                  {step.title}
                </h3>
                {/* Description */}
                <p className="text-[#5A3E29] text-sm text-center">
                  {step.description}
                </p>
              </div>

              {/* Arrow - Placed Outside the Card, Not Affected by Hover */}
              {index < steps.length - 1 && (
                <div className="absolute hidden md:flex items-center justify-center -right-[45px] top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#4F2F1D"
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
};

export default HowItWorks;
