// import React, { useRef } from "react";
// import { motion, useTransform, useScroll } from "framer-motion";

// const SuccessStories = () => {
//   const stories = [
//     {
//       name: "Shalini and Vicky",
//       quote:
//         "We found love and companionship on this amazing platform. It was everything we dreamed of and more!",
//       image: "https://punjabi-rishtey.com/uploads/stories/20230329152147.jpg",
//     },
//     {
//       name: "Taranjeet and Simran",
//       quote:
//         "Thank you for helping us find each other! We are now happily married and couldn't be more grateful.",
//       image: "https://punjabi-rishtey.com/uploads/stories/20230329140724.jpg",
//     },
//     {
//       name: "Vivek and Sakshi Manchanda",
//       quote:
//         "The perfect match! This platform made it so easy to find someone who truly understands me.",
//       image: "https://punjabi-rishtey.com/uploads/stories/20221203124705.jpg",
//     },
//     {
//       name: "Lakshita and Rachit",
//       quote:
//         "We never imagined finding someone so perfect for us. Thank you for bringing us together!",
//       image: "https://punjabi-rishtey.com/uploads/stories/20221203124846.jpg",
//     },
//   ];

//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end center"],
//   });

//   // Animate the red line from 0% height to ~85% as you scroll
//   const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "85%"]);

//   return (
//     <div className="bg-[#FCF9F2] py-12 sm:py-16 relative overflow-hidden">
//       <div className="container mx-auto px-4 text-center relative" ref={containerRef}>
//         <h2
//           className="text-3xl sm:text-4xl mb-8 sm:mb-12 text-[#111111]"
//           style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
//         >
//           Success Stories
//         </h2>

//         {/*
//           Main vertical line:
//           - On mobile: pinned to the left at left-6 
//           - On desktop: pinned to center (left-1/2, -translate-x-1/2)
//           - We also animate its height based on scroll
//         */}
//         <motion.div
//           style={{ height: lineHeight, top: "10rem" }}
//           className={`
//             absolute
//             w-[3px]
//             bg-[#FF3D57]
//             transition-all
        
//             /* Mobile (default) styles: */
//             left-11.5           /* line sits to the left on small screens */
//             top-[10rem]      /* top offset for mobile, e.g. 10rem */
        
//             /* Desktop (md breakpoint) overrides: */
//             md:left-1/2      /* move line to center at md+ */
//             md:-translate-x-1/2
//             md:top-[12rem]   /* top offset for desktop, e.g. 12rem */
//           `}
//         />

//         <div className="relative space-y-12 sm:space-y-16 mt-8">
//           {stories.map((story, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: index * 0.2 }}
//               viewport={{ once: true, amount: 0.5 }}
//               /*
//                 Mobile: single column, with some left padding (pl-16) 
//                 so the line and diamond are visible on the left
//                 Desktop: two columns, reversing as needed
//               */
//               className={`
//                 relative
//                 flex flex-col
//                 md:flex-row
//                 items-start
//                 gap-4
//                 md:gap-8
//                 pl-16
//                 md:pl-0
//                 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
//               `}
//             >
//               {/*
//                 Diamond marker
//                 - same pinned position as the line
//                 - on mobile: left-6
//                 - on desktop: center with left-1/2, -translate-x-1/2
//                 - Also vertically center it relative to this item
//               */}
//               <div
//                 className="
//                   absolute
//                   w-4 h-4
//                   bg-[#FF3D57]
//                   rotate-45
//                   z-0
//                   left-6
//                   md:left-1/2
//                   md:-translate-x-1/2
//                 "
//                 style={{ top: "calc(50% - 8px)" }}
//               />

//               {/* Image */}
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 whileInView={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.8, delay: index * 0.2 }}
//                 viewport={{ once: true, amount: 0.5 }}
//                 className="
//                   w-32 h-32
//                   md:w-40 md:h-40
//                   flex-shrink-0
//                   relative
//                   z-10
//                 "
//               >
//                 <img
//                   src={story.image}
//                   alt={story.name}
//                   className="w-full h-full object-cover rounded-full shadow-lg"
//                 />
//               </motion.div>

//               {/* Content Card */}
//               <motion.div
//                 initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, delay: index * 0.2 }}
//                 viewport={{ once: true, amount: 0.5 }}
//                 className={`
//                   bg-white
//                   p-4 sm:p-6
//                   rounded-lg
//                   shadow-lg
//                   flex flex-col
//                   text-left
//                   z-10
//                   w-full
//                   max-w-md
//                   ${index % 2 === 0 ? "md:ml-5" : "md:mr-5"}
//                 `}
//               >
//                 <h3
//                   className="text-xl sm:text-2xl mb-2 text-[#111111]"
//                   style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
//                 >
//                   {story.name}
//                 </h3>
//                 <p
//                   className="text-[#333333] text-sm sm:text-base"
//                   style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
//                 >
//                   {`"${story.quote}"`}
//                 </p>
//               </motion.div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuccessStories;









// import React from "react";
// import { motion } from "framer-motion";

// const stories = [
//   {
//     name: "Shalini and Vicky",
//     quote:
//       "We found love and companionship on this amazing platform. It was everything we dreamed of and more!",
//     image: "https://punjabi-rishtey.com/uploads/stories/20230329152147.jpg",
//   },
//   {
//     name: "Taranjeet and Simran",
//     quote:
//       "Thank you for helping us find each other! We are now happily married and couldn't be more grateful.",
//     image: "https://punjabi-rishtey.com/uploads/stories/20230329140724.jpg",
//   },
//   {
//     name: "Vivek and Sakshi Manchanda",
//     quote:
//       "The perfect match! This platform made it so easy to find someone who truly understands me.",
//     image: "https://punjabi-rishtey.com/uploads/stories/20221203124705.jpg",
//   },
//   {
//     name: "Lakshita and Rachit",
//     quote:
//       "We never imagined finding someone so perfect for us. Thank you for bringing us together!",
//     image: "https://punjabi-rishtey.com/uploads/stories/20221203124846.jpg",
//   },
// ];

// // Framer Motion variants for the flip effect
// const cardVariants = {
//   initial: { rotateY: 0 },
//   hover: {
//     rotateY: 180,
//     transition: { duration: 0.6, ease: "easeInOut" },
//   },
// };

// const frontVariants = {
//   initial: { opacity: 1 },
//   hover: { opacity: 0, transition: { duration: 0.3 } },
// };

// const backVariants = {
//   initial: { opacity: 0 },
//   hover: { opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
// };

// const SuccessStories = () => {
//   return (
//     <section className="relative overflow-hidden">
//       {/* Top Wave */}
//       <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
//         <svg
//           className="block w-[calc(100%+1.3px)] h-[80px]"
//           preserveAspectRatio="none"
//           viewBox="0 0 1600 100"
//         >
//           <path
//             d="M0,30 C400,90 1200,0 1600,40 L1600,0 L0,0 Z"
//             fill="#FCF9F2"
//           ></path>
//         </svg>
//       </div>

//       {/* Patterned Background */}
//       <div
//         className="relative z-0"
//         style={{
//           background:
//             "url('https://www.transparenttextures.com/patterns/arabesque.png') repeat, linear-gradient(to bottom, #FFF7F0 0%, #FCF9F2 100%)",
//         }}
//       >
//         {/* 
//           Corner Flourish images removed to avoid the "Corner Flourish" text 
//           that appeared if the image couldn't load.
//         */}

//         <div className="container mx-auto px-4 py-16 sm:py-20 text-center relative z-10">
//           <h2
//             className="text-4xl sm:text-5xl mb-12"
//             style={{
//               color: "#111111",
//               fontFamily: "'Tiempos Headline', serif",
//               fontWeight: 400,
//             }}
//           >
//             Success Stories
//           </h2>

//           {/* Cards Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center">
//             {stories.map((story, index) => (
//               <motion.div
//                 key={index}
//                 whileHover="hover"
//                 initial="initial"
//                 className="relative w-64 h-80 perspective"
//               >
//                 {/* Card container with flip animation */}
//                 <motion.div
//                   variants={cardVariants}
//                   className="relative w-full h-full"
//                   style={{ transformStyle: "preserve-3d" }}
//                 >
//                   {/* Front Side (Image) */}
//                   <motion.div
//                     variants={frontVariants}
//                     className="absolute inset-0 backface-hidden rounded-xl shadow-lg overflow-hidden"
//                     style={{ WebkitBackfaceVisibility: "hidden" }}
//                   >
//                     <img
//                       src={story.image}
//                       alt={story.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </motion.div>

//                   {/* Back Side (Text with soft color) */}
//                   <motion.div
//                     variants={backVariants}
//                     className="absolute inset-0 backface-hidden rounded-xl shadow-lg bg-white p-4 flex flex-col justify-center items-center"
//                     style={{
//                       transform: "rotateY(180deg)",
//                       WebkitBackfaceVisibility: "hidden",
//                     }}
//                   >
//                     <h3
//                       className="text-xl mb-2 font-semibold"
//                       style={{
//                         color: "#C55D7B", // a subtle pinkish color
//                         fontFamily: "'Tiempos Headline', serif",
//                       }}
//                     >
//                       {story.name}
//                     </h3>
//                     <p
//                       className="text-sm sm:text-base italic"
//                       style={{
//                         color: "#4D4D4D",
//                         fontFamily: "'Modern Era', sans-serif",
//                       }}
//                     >
//                       {story.quote}
//                     </p>
//                   </motion.div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Bottom Wave */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10 rotate-180">
//         <svg
//           className="block w-[calc(100%+1.3px)] h-[80px]"
//           preserveAspectRatio="none"
//           viewBox="0 0 1600 100"
//         >
//           <path
//             d="M0,30 C400,90 1200,0 1600,40 L1600,100 L0,100 Z"
//             fill="#FCF9F2"
//           ></path>
//         </svg>
//       </div>
//     </section>
//   );
// };

// export default SuccessStories;









// import React from "react";
// import { motion } from "framer-motion";

// // Floating Hearts Component with inline debugging CSS
// const FloatingHearts = () => {
//   const heartsArray = Array.from({ length: 12 }); // Adjust count as needed

//   return (
//     <>
//       <style>
//         {`
//           @keyframes floatUp {
//             0% {
//               transform: translateY(100vh);
//               opacity: 0;
//             }
//             20% {
//               opacity: 1;
//             }
//             100% {
//               transform: translateY(-20vh);
//               opacity: 0;
//             }
//           }
//           .hearts-container {
//             position: absolute;
//             inset: 0;
//             overflow: hidden;
//             pointer-events: none;
//             z-index: 100; /* High z-index for debugging */
//             background: rgba(255, 0, 0, 0.1); /* Light red background to see container */
//           }
//           .heart {
//             position: absolute;
//             background: url('data:image/svg+xml;utf8,<svg fill="%23BB2A3C" viewBox="0 0 32 29.6" xmlns="http://www.w3.org/2000/svg"><path d="M23.6.3c-2.6 0-5 1-6.6 2.7C15.4 1.3 13 .3 10.4.3 4.7.3 0 5 0 10.7c0 4.5 2.5 8.6 6.4 10.7L16.1 29l9.7-7.6c3.9-2 6.4-6.2 6.4-10.7C32 5 27.3.3 21.6.3z"/></svg>') no-repeat center/contain;
//             animation: floatUp 8s linear infinite;
//             opacity: 1; /* Forced visible for debugging */
//             border: 1px solid blue; /* Border to see element boundaries */
//           }
//         `}
//       </style>
//       <div className="hearts-container">
//         {heartsArray.map((_, i) => {
//           const left = Math.random() * 100;
//           const delay = Math.random() * 5;
//           const size = 30 + Math.random() * 20; // hearts size: 30px to 50px
//           return (
//             <span
//               key={i}
//               className="heart"
//               style={{
//                 left: `${left}%`,
//                 animationDelay: `${delay}s`,
//                 width: `${size}px`,
//                 height: `${size}px`,
//               }}
//             />
//           );
//         })}
//       </div>
//     </>
//   );
// };

// const stories = [
//   {
//     name: "Shalini and Vicky",
//     quote:
//       "We found love and companionship on this amazing platform. It was everything we dreamed of and more!",
//     image: "https://punjabi-rishtey.com/uploads/stories/20230329152147.jpg",
//   },
//   {
//     name: "Taranjeet and Simran",
//     quote:
//       "Thank you for helping us find each other! We are now happily married and couldn't be more grateful.",
//     image: "https://punjabi-rishtey.com/uploads/stories/20230329140724.jpg",
//   },
//   {
//     name: "Vivek and Sakshi Manchanda",
//     quote:
//       "The perfect match! This platform made it so easy to find someone who truly understands me.",
//     image: "https://punjabi-rishtey.com/uploads/stories/20221203124705.jpg",
//   },
//   {
//     name: "Lakshita and Rachit",
//     quote:
//       "We never imagined finding someone so perfect for us. Thank you for bringing us together!",
//     image: "https://punjabi-rishtey.com/uploads/stories/20221203124846.jpg",
//   },
// ];

// // Framer Motion variants for the flip effect
// const cardVariants = {
//   initial: { rotateY: 0 },
//   hover: { rotateY: 180, transition: { duration: 0.6, ease: "easeInOut" } },
// };

// const frontVariants = {
//   initial: { opacity: 1 },
//   hover: { opacity: 0, transition: { duration: 0.3 } },
// };

// const backVariants = {
//   initial: { opacity: 0 },
//   hover: { opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
// };

// const SuccessStories = () => {
//   return (
//     <section className="relative overflow-hidden">
//       {/* Floating Hearts */}
//       <FloatingHearts />

//       {/* Top Wave */}
//       <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
//         <svg
//           className="block w-[calc(100%+1.3px)] h-[80px]"
//           preserveAspectRatio="none"
//           viewBox="0 0 1600 100"
//         >
//           <path
//             d="M0,30 C400,90 1200,0 1600,40 L1600,0 L0,0 Z"
//             fill="#FCF9F2"
//           ></path>
//         </svg>
//       </div>

//       {/* Patterned Background */}
//       <div
//         className="relative z-0"
//         style={{
//           background:
//             "url('https://www.transparenttextures.com/patterns/arabesque.png') repeat, linear-gradient(to bottom, #FFF7F0 0%, #FCF9F2 100%)",
//         }}
//       >
//         <div className="container mx-auto px-4 py-16 sm:py-20 text-center relative z-10">
//           <h2
//             className="text-4xl sm:text-5xl mb-2"
//             style={{
//               color: "#111111",
//               fontFamily: "'Tiempos Headline', serif",
//               fontWeight: 400,
//             }}
//           >
//             Success Stories
//           </h2>
//           {/* Soft Subtitle/Description */}
//           <p className="text-base sm:text-lg mb-12 text-gray-600 max-w-xl mx-auto">
//             Real couples who found their perfect match and began a new journey together.
//           </p>

//           {/* Cards Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center">
//             {stories.map((story, index) => (
//               <motion.div
//                 key={index}
//                 whileHover="hover"
//                 initial="initial"
//                 className="relative w-64 h-80 perspective"
//               >
//                 {/* Card container with flip animation */}
//                 <motion.div
//                   variants={cardVariants}
//                   className="relative w-full h-full"
//                   style={{ transformStyle: "preserve-3d" }}
//                 >
//                   {/* Front Side (Image) with subtle hover scale effect */}
//                   <motion.div
//                     variants={frontVariants}
//                     className="absolute inset-0 backface-hidden rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
//                     style={{ WebkitBackfaceVisibility: "hidden" }}
//                   >
//                     <img
//                       src={story.image}
//                       alt={story.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </motion.div>

//                   {/* Back Side (Text with soft color) */}
//                   <motion.div
//                     variants={backVariants}
//                     className="absolute inset-0 backface-hidden rounded-xl shadow-lg bg-white p-4 flex flex-col justify-center items-center"
//                     style={{
//                       transform: "rotateY(180deg)",
//                       WebkitBackfaceVisibility: "hidden",
//                     }}
//                   >
//                     <h3
//                       className="text-xl mb-2 font-semibold"
//                       style={{
//                         color: "#C55D7B",
//                         fontFamily: "'Tiempos Headline', serif",
//                       }}
//                     >
//                       {story.name}
//                     </h3>
//                     <p
//                       className="text-sm sm:text-base italic"
//                       style={{
//                         color: "#4D4D4D",
//                         fontFamily: "'Modern Era', sans-serif",
//                       }}
//                     >
//                       {story.quote}
//                     </p>
//                   </motion.div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Optional "View More" Button */}
//           <div className="mt-12">
//             <a
//               href="/all-success-stories"
//               className="inline-block bg-[#C55D7B] text-white px-6 py-3 rounded-md hover:bg-[#b04e6d] transition-colors"
//             >
//               View More Success Stories
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Wave */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10 rotate-180">
//         <svg
//           className="block w-[calc(100%+1.3px)] h-[80px]"
//           preserveAspectRatio="none"
//           viewBox="0 0 1600 100"
//         >
//           <path
//             d="M0,30 C400,90 1200,0 1600,40 L1600,100 L0,100 Z"
//             fill="#FCF9F2"
//           ></path>
//         </svg>
//       </div>
//     </section>
//   );
// };

// export default SuccessStories;





import React from "react";
import { motion } from "framer-motion";

// Floating Hearts Component with inline CSS and adjusted z-index
const FloatingHearts = () => {
  const heartsArray = Array.from({ length: 6 }); // Fewer hearts for a cleaner look

  return (
    <>
      <style>
        {`
          @keyframes floatUp {
            0% {
              transform: translateY(100vh);
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            100% {
              transform: translateY(-20vh);
              opacity: 0;
            }
          }
          .hearts-container {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
            z-index: 5; /* Higher than background, below main content (z-index: 10) */
          }
          .heart {
            position: absolute;
            background: url('data:image/svg+xml;utf8,<svg fill="%23BB2A3C" viewBox="0 0 32 29.6" xmlns="http://www.w3.org/2000/svg"><path d="M23.6.3c-2.6 0-5 1-6.6 2.7C15.4 1.3 13 .3 10.4.3C4.7.3 0 5 0 10.7c0 4.5 2.5 8.6 6.4 10.7L16.1 29l9.7-7.6c3.9-2 6.4-6.2 6.4-10.7C32 5 27.3.3 21.6.3z"/></svg>') no-repeat center/contain;
            animation: floatUp 8s linear infinite;
            opacity: 0.8;
          }
        `}
      </style>
      <div className="hearts-container">
        {heartsArray.map((_, i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 5;
          const size = 30 + Math.random() * 20; // Size between 30px and 50px
          return (
            <span
              key={i}
              className="heart"
              style={{
                left: `${left}%`,
                animationDelay: `${delay}s`,
                width: `${size}px`,
                height: `${size}px`,
              }}
            />
          );
        })}
      </div>
    </>
  );
};

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

// Framer Motion variants for the flip effect
const cardVariants = {
  initial: { rotateY: 0 },
  hover: { rotateY: 180, transition: { duration: 0.6, ease: "easeInOut" } },
};

const frontVariants = {
  initial: { opacity: 1 },
  hover: { opacity: 0, transition: { duration: 0.3 } },
};

const backVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
};

const SuccessStories = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Floating Hearts */}
      <FloatingHearts />

      {/* Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg
          className="block w-[calc(100%+1.3px)] h-[80px]"
          preserveAspectRatio="none"
          viewBox="0 0 1600 100"
        >
          <path
            d="M0,30 C400,90 1200,0 1600,40 L1600,0 L0,0 Z"
            fill="#FCF9F2"
          ></path>
        </svg>
      </div>

      {/* Patterned Background */}
      <div
        className="relative z-0"
        style={{
          background:
            "url('https://www.transparenttextures.com/patterns/arabesque.png') repeat, linear-gradient(to bottom, #FFF7F0 0%, #FCF9F2 100%)",
        }}
      >
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center relative z-10">
          <h2
            className="text-4xl sm:text-5xl mb-2"
            style={{
              color: "#111111",
              fontFamily: "'Tiempos Headline', serif",
              fontWeight: 400,
            }}
          >
            Success Stories
          </h2>
          {/* Soft Subtitle/Description */}
          <p className="text-base sm:text-lg mb-12 text-gray-600 max-w-xl mx-auto">
            Real couples who found their perfect match and began a new journey together.
          </p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center">
            {stories.map((story, index) => (
              <motion.div
                key={index}
                whileHover="hover"
                initial="initial"
                className="relative w-64 h-80 perspective"
              >
                {/* Card container with flip animation */}
                <motion.div
                  variants={cardVariants}
                  className="relative w-full h-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front Side (Image) with subtle hover scale effect */}
                  <motion.div
                    variants={frontVariants}
                    className="absolute inset-0 backface-hidden rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                    style={{ WebkitBackfaceVisibility: "hidden" }}
                  >
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Back Side (Text with soft color) */}
                  <motion.div
                    variants={backVariants}
                    className="absolute inset-0 backface-hidden rounded-xl shadow-lg bg-white p-4 flex flex-col justify-center items-center"
                    style={{
                      transform: "rotateY(180deg)",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <h3
                      className="text-xl mb-2 font-semibold"
                      style={{
                        color: "#C55D7B",
                        fontFamily: "'Tiempos Headline', serif",
                      }}
                    >
                      {story.name}
                    </h3>
                    <p
                      className="text-sm sm:text-base italic"
                      style={{
                        color: "#4D4D4D",
                        fontFamily: "'Modern Era', sans-serif",
                      }}
                    >
                      {story.quote}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Optional "View More" Button */}
          <div className="mt-12">
            <a
              href="/all-success-stories"
              className="inline-block bg-[#C55D7B] text-white px-6 py-3 rounded-md hover:bg-[#b04e6d] transition-colors"
            >
              Start Your Love Story

            </a>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10 rotate-180">
        <svg
          className="block w-[calc(100%+1.3px)] h-[80px]"
          preserveAspectRatio="none"
          viewBox="0 0 1600 100"
        >
          <path
            d="M0,30 C400,90 1200,0 1600,40 L1600,100 L0,100 Z"
            fill="#FCF9F2"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default SuccessStories;
