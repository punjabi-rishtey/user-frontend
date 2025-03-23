import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

const SuccessStories = () => {
  const stories = [
    {
      name: "Shalini and Vicky",
      quote:
        "We found love and companionship on this amazing platform. It was everything we dreamed of and more!",
      image: "https://punjabi-rishtey.com/uploads/stories/20230329152147.jpg",
    },
    {
      name: "Taranjeet and Simran",
      quote:
        "Thank you for helping us find each other! We are now happily married and couldn't be more grateful.",
      image: "https://punjabi-rishtey.com/uploads/stories/20230329140724.jpg",
    },
    {
      name: "Vivek and Sakshi Manchanda",
      quote:
        "The perfect match! This platform made it so easy to find someone who truly understands me.",
      image: "https://punjabi-rishtey.com/uploads/stories/20221203124705.jpg",
    },
    {
      name: "Lakshita and Rachit",
      quote:
        "We never imagined finding someone so perfect for us. Thank you for bringing us together!",
      image: "https://punjabi-rishtey.com/uploads/stories/20221203124846.jpg",
    },
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  // Animate the timeline from 0% height to ~85% as you scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "85%"]);

  return (
    <div className="bg-cream py-12 sm:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative" ref={containerRef}>
        <h2
          className="text-3xl sm:text-4xl mb-8 sm:mb-12 text-dark"
          style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
        >
          Success Stories
        </h2>

        {/* 
          Main vertical timeline:
          - Enhanced visibility with brighter accent color
          - Responsive positioning for all screen sizes
        */}
        <motion.div
          style={{ height: lineHeight, top: "10rem" }}
          className={`
            absolute
            w-1
            bg-accent
            transition-all
        
            /* Mobile (default) styles: */
            left-11.5
            top-[10rem]
        
            /* Desktop (md breakpoint) overrides: */
            md:left-1/2
            md:-translate-x-1/2
            md:top-[12rem]
          `}
        />

        <div className="relative space-y-12 sm:space-y-16 mt-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              className={`
                relative
                flex flex-col
                md:flex-row
                items-start
                gap-4
                md:gap-8
                pl-16
                md:pl-0
                ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
              `}
            >
              {/* 
                Diamond marker - enhanced with brighter color
                and subtle glow effect for better visibility on Mac
              */}
              <div
                className="
                  absolute
                  w-4 h-4
                  bg-accent
                  rotate-45
                  z-0
                  left-6
                  md:left-1/2
                  md:-translate-x-1/2
                  shadow-glow
                "
                style={{ top: "calc(50% - 8px)" }}
              />

              {/* Image with enhanced shadow */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                className="
                  w-32 h-32
                  md:w-40 md:h-40
                  flex-shrink-0
                  relative
                  z-10
                "
              >
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover rounded-full shadow-xl border-2 border-white"
                />
              </motion.div>

              {/* Content Card with increased contrast */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                className={`
                  bg-white
                  p-4 sm:p-6
                  rounded-lg
                  shadow-xl
                  flex flex-col
                  text-left
                  z-10
                  w-full
                  max-w-md
                  border border-gray-100
                  ${index % 2 === 0 ? "md:ml-5" : "md:mr-5"}
                `}
              >
                <h3
                  className="text-xl sm:text-2xl mb-2 text-dark"
                  style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
                >
                  {story.name}
                </h3>
                <p
                  className="text-gray-700"
                  style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                >
                  {`"${story.quote}"`}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Define CSS variables for better color consistency across Mac screens
const styles = document.createElement('style');
styles.innerHTML = `
  :root {
    --color-cream: #FCF9F2;
    --color-dark: #0A0A0A;
    --color-accent: #FF2B47;
    --color-gray-700: #374151;
  }
  
  .bg-cream { background-color: var(--color-cream); }
  .text-dark { color: var(--color-dark); }
  .bg-accent { background-color: var(--color-accent); }
  .text-gray-700 { color: var(--color-gray-700); }
  
  /* Add a subtle glow effect to timeline markers for better visibility on Mac */
  .shadow-glow {
    box-shadow: 0 0 8px rgba(255, 43, 71, 0.6);
  }
`;
document.head.appendChild(styles);

export default SuccessStories;