import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Search, Heart, MessageSquare } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Sign Up",
      description: "Create your profile and join our trusted community.",
      icon: <UserPlus className="w-12 h-12" />,
    },
    {
      title: "Find Matches",
      description: "Browse and search for compatible profiles.",
      icon: <Search className="w-12 h-12" />,
    },
    {
      title: "Express Interest",
      description: "Send requests and connect with potential partners.",
      icon: <Heart className="w-12 h-12" />,
    },
    {
      title: "Start Your Journey",
      description: "Chat, build connections, and take the next step.",
      icon: <MessageSquare className="w-12 h-12" />,
    },
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="works-bg py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl sm:text-5xl mb-16 works-title font-normal"
            style={{ fontFamily: "'Tiempos Headline', serif" }}>
          How It Works
        </h2>

        <div className="relative">
          {/* Background timeline */}
          <div className="absolute top-1/2 left-0 right-0 h-1 works-timeline hidden md:block -translate-y-1/2" />

          <div className="flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative flex-1"
              >
                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-6 top-1/4 z-10">
                    <svg 
                      width="40" 
                      height="40" 
                      viewBox="0 0 40 40" 
                      fill="none" 
                      className="works-arrow"
                    >
                      <path 
                        d="M15 8l15 12-15 12" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                <div className="works-card p-8 rounded-xl shadow-md h-full flex flex-col items-center border works-border">
                  {/* Step number */}
                  <div className="works-number w-8 h-8 rounded-full flex items-center justify-center font-semibold text-lg mb-4">
                    {index + 1}
                  </div>
                  
                  {/* Icon circle */}
                  <div className="mb-6 p-4 rounded-full works-icon-bg shadow-sm">
                    <div className="works-icon">{step.icon}</div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl mb-3 works-title font-medium"
                      style={{ fontFamily: "'Tiempos Headline', serif" }}>
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="works-text leading-relaxed"
                     style={{ fontFamily: "'Modern Era', sans-serif" }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Define CSS variables specifically for this component
const stylesTag = document.createElement('style');
stylesTag.innerHTML = `
  /* HOW IT WORKS STYLES */
  :root {
    --works-bg: #F9F9FF;
    --works-card: #FFFFFF;
    --works-title: #222222;
    --works-text: #444444;
    --works-icon: #E74C3C;
    --works-icon-bg: #FFEEEE;
    --works-border: #FFDDDD;
    --works-timeline: #FFD0D0;
    --works-arrow: #E74C3C;
    --works-number-bg: #FFEEEE;
    --works-number-text: #E74C3C;
  }
  
  .works-bg { background-color: var(--works-bg); }
  .works-card { 
    background-color: var(--works-card); 
    border-color: var(--works-border);
  }
  .works-title { color: var(--works-title); }
  .works-text { color: var(--works-text); }
  .works-icon { color: var(--works-icon); }
  .works-icon-bg { background-color: var(--works-icon-bg); }
  .works-border { border-color: var(--works-border); }
  .works-timeline { background-color: var(--works-timeline); }
  .works-arrow { color: var(--works-arrow); }
  .works-number {
    background-color: var(--works-number-bg);
    color: var(--works-number-text);
  }
`;
document.head.appendChild(stylesTag);

export default HowItWorks;