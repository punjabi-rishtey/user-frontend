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

  // Animate the red line from 0% height to ~85% as you scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "85%"]);

  return (
    <div className="bg-[#FCF9F2] py-12 sm:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative" ref={containerRef}>
        <h2
          className="text-3xl sm:text-4xl mb-8 sm:mb-12 text-[#111111]"
          style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
        >
          Success Stories
        </h2>

        {/*
          Main vertical line:
          - On mobile: pinned to the left at left-6 
          - On desktop: pinned to center (left-1/2, -translate-x-1/2)
          - We also animate its height based on scroll
        */}
        <motion.div
          style={{ height: lineHeight, top: "10rem" }}
          className={`
            absolute
            w-[3px]
            bg-[#FF3D57]
            transition-all
        
            /* Mobile (default) styles: */
            left-11.5           /* line sits to the left on small screens */
            top-[10rem]      /* top offset for mobile, e.g. 10rem */
        
            /* Desktop (md breakpoint) overrides: */
            md:left-1/2      /* move line to center at md+ */
            md:-translate-x-1/2
            md:top-[12rem]   /* top offset for desktop, e.g. 12rem */
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
              /*
                Mobile: single column, with some left padding (pl-16) 
                so the line and diamond are visible on the left
                Desktop: two columns, reversing as needed
              */
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
                Diamond marker
                - same pinned position as the line
                - on mobile: left-6
                - on desktop: center with left-1/2, -translate-x-1/2
                - Also vertically center it relative to this item
              */}
              <div
                className="
                  absolute
                  w-4 h-4
                  bg-[#FF3D57]
                  rotate-45
                  z-0
                  left-6
                  md:left-1/2
                  md:-translate-x-1/2
                "
                style={{ top: "calc(50% - 8px)" }}
              />

              {/* Image */}
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
                  className="w-full h-full object-cover rounded-full shadow-lg"
                />
              </motion.div>

              {/* Content Card */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                className={`
                  bg-white
                  p-4 sm:p-6
                  rounded-lg
                  shadow-lg
                  flex flex-col
                  text-left
                  z-10
                  w-full
                  max-w-md
                  ${index % 2 === 0 ? "md:ml-5" : "md:mr-5"}
                `}
              >
                <h3
                  className="text-xl sm:text-2xl mb-2 text-[#111111]"
                  style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
                >
                  {story.name}
                </h3>
                <p
                  className="text-[#333333] text-sm sm:text-base"
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

export default SuccessStories;
