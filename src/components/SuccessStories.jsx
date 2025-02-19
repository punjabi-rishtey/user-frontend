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

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "85%"]);

  return (
    <div className="bg-[#FEEAEA] py-16 relative">
      <div className="container mx-auto px-2 text-center relative" ref={containerRef}>
        <h2
          className="text-4xl mb-12 text-[#111111]"
          style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
        >
          Success Stories
        </h2>

        <motion.div
          style={{ height: lineHeight, top: "11rem" }}
          className="absolute left-1/2 transform -translate-x-1/2 bg-[#610614] w-[3px]"
        ></motion.div>

        <div className="relative space-y-16 px-2 md:px-5">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              className={`relative flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Diamond */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 bg-[#610614] w-4 h-4 rotate-45 z-0"
                style={{ top: "calc(50% - 2px)" }}
              ></div>

              {/* Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                className="w-32 h-32 mb-4 md:mb-0 md:w-40 md:h-40 flex-shrink-0 mx-auto md:mx-3 relative z-10"
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
                className={`bg-white p-6 rounded-lg shadow-lg flex flex-col text-left z-10 ${
                  index % 2 === 0 ? "md:ml-5" : "md:mr-5"
                }`}
                style={{ maxWidth: "500px" }}
              >
                <h3
                  className="text-2xl mb-2 text-[#111111]"
                  style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
                >
                  {story.name}
                </h3>
                <p 
                  className="text-[#333333]"
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