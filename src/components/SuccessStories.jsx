import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
        "Thank you for helping us find each other! We are now happily married and couldn’t be more grateful.",
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

  // State for dynamically adjusting the line height
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Calculate line height percentage (linear scale)
      const scrollProgress = Math.min((scrollTop / docHeight) * 100, 100);
      setLineHeight(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#FAF3E0] py-16 relative">
      <div className="container mx-auto text-center relative">
        <h2
          className="text-4xl font-bold mb-12"
          style={{ fontFamily: "'Playfair Display', serif", color: "#4F2F1D" }}
        >
          Success Stories
        </h2>

        {/* Central Timeline Line (Uniform Growth with Scroll) */}
        <motion.div
          animate={{ height: `${lineHeight}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }} // Smoother animation
          className="absolute left-1/2 transform -translate-x-1/2 bg-[#6B4226] w-[3px]"
          style={{ top: "11rem" }}
        ></motion.div>

        <div className="relative space-y-16">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: index * 0.3 }} // Smoother transition
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="w-32 h-32 mb-4 md:mb-0 md:w-40 md:h-40 flex-shrink-0 mx-auto md:mx-0 relative z-10"
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
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`bg-white p-6 rounded-lg shadow-lg flex flex-col text-left z-10 ${
                  index % 2 === 0 ? "md:ml-12" : "md:mr-12"
                }`}
                style={{ maxWidth: "500px" }}
              >
                <h3
                  className="text-2xl font-semibold text-[#4F2F1D] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {story.name}
                </h3>
                <p className="text-[#5A3E29] italic">{`"${story.quote}"`}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
