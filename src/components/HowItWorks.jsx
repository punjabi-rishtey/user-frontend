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
    <div className="bg-[#FFFFFF] py-16">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2
          className="text-5xl font-bold mb-12 text-[#111111]"
          style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
        >
          How It Works
        </h2>

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-14">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-center group">
              <div className="relative flex flex-col items-center bg-[#FEEAEA] p-6 rounded-lg shadow-lg transition-transform transform group-hover:scale-105 group-hover:bg-[#FFB6C1] border border-[#FFE5E5]">
                {/* Icon */}
                <div className="mb-4 p-4 rounded-full bg-[#FFFFFF]">
                  {step.icon}
                </div>
                {/* Title */}
                <h3
                  className="text-2xl mb-2 text-[#111111]"
                  style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
                >
                  {step.title}
                </h3>
                {/* Description */}
                <p 
                  className="text-[#333333] text-base"
                  style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                >
                  {step.description}
                </p>
              </div>
              {/* ...existing arrow code... */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HowItWorks;
