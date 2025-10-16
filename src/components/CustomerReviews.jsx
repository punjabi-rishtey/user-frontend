import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { apiUrl } from "../config/constants";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(apiUrl("/api/review/all"));
        const mappedReviews = response.data.map((review) => ({
          rating: review.ratings,
          title: review.user_name,
          text: review.message,
          author: review.user_name,
        }));
        setReviews(mappedReviews);
        setError("");
      } catch (err) {
        setError("Failed to fetch reviews");
        console.error(err);
      }
    };

    fetchReviews();
  }, []);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      backgroundColor: "#FFB6C1",
      transition: { duration: 0.3 },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const openModal = (review) => {
    setSelectedReview(review);
  };

  const closeModal = () => {
    setSelectedReview(null);
  };

  return (
    <div className="bg-[#FCF9F2] py-8 sm:py-12 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8 md:mb-12 text-[#111111]"
          style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
        >
          Everybody Loves Us
        </h2>
        <p
          className="text-base sm:text-lg md:text-xl text-[#333333] mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto"
          style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
        >
          Check out some of our recent product reviews.
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-11 max-w-7xl mx-auto">
          {reviews.length === 0 && !error ? (
            <p className="text-gray-500 col-span-1 sm:col-span-2 md:col-span-3">
              No reviews available
            </p>
          ) : (
            reviews.map((review, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-[#FCF9F2] px-4 py-6 rounded-lg shadow-lg border border-[#D1BFA7]"
              >
                {/* Star Rating */}
                <div className="flex justify-center mb-3 space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-[#FF3D57] w-5 sm:w-6 h-5 sm:h-6"
                      fill="currentColor"
                    />
                  ))}
                </div>

                {/* Rating Number */}
                <p className="text-2xl sm:text-3xl font-bold text-[#111111]">
                  {review.rating}.0
                </p>

                {/* Title */}
                <h3
                  className="text-xl sm:text-2xl text-[#111111] mt-2"
                  style={{
                    fontFamily: "'Tiempos Headline', serif",
                    fontWeight: 400,
                  }}
                >
                  {review.title}
                </h3>

                {/* Review Text */}
                <p
                  className="text-[#333333] text-sm sm:text-base mt-2"
                  style={{
                    fontFamily: "'Modern Era', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {review.text.length > 100
                    ? `${review.text.substring(0, 100)}... `
                    : `${review.text} `}
                  <span
                    className="text-[#FF3D57] cursor-pointer hover:underline"
                    onClick={() => openModal(review)}
                  >
                    Read More
                  </span>
                </p>

                {/* Author */}
                <p className="text-sm text-gray-600 mt-4 font-semibold">
                  — {review.author}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedReview && (
          <>
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black z-50"
              onClick={closeModal}
            />
            {/* Modal Content */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl p-6 sm:p-8 w-[90%] sm:w-[80%] md:w-[50%] max-w-lg z-50 max-h-[80vh] overflow-y-auto"
            >
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-0 right-0 text-[#FF3D57] hover:text-[#FF5A71] text-xl font-bold"
                >
                  &times;
                </button>
                {/* Modal Header */}
                <h3
                  className="text-2xl sm:text-3xl text-[#111111] mb-4"
                  style={{
                    fontFamily: "'Tiempos Headline', serif",
                    fontWeight: 400,
                  }}
                >
                  {selectedReview.title}
                </h3>
                {/* Star Rating */}
                <div className="flex mb-4">
                  {[...Array(selectedReview.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-[#FF3D57] w-5 sm:w-6 h-5 sm:h-6"
                      fill="currentColor"
                    />
                  ))}
                </div>
                {/* Full Review Text */}
                <p
                  className="text-[#333333] text-sm sm:text-base leading-relaxed"
                  style={{
                    fontFamily: "'Modern Era', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  &ldquo;{selectedReview.text}&rdquo;
                </p>
                {/* Author */}
                <p className="text-sm text-gray-600 mt-4 font-semibold">
                  — {selectedReview.author}
                </p>
                {/* Decorative Accent */}
                <div className="absolute -bottom-4 -right-4 w-12 sm:w-16 h-12 sm:h-16 bg-[#FFE8EB] rounded-full -z-10" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerReviews;

// import React, { useState, useEffect } from "react";
// import { Star } from "lucide-react";
// import { motion } from "framer-motion";

// const CustomerReviews = () => {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     fetch("https://backend-nm1z.onrender.com/api/testimonials/all")
//       .then(response => response.json())
//       .then(data => {
//         const formattedReviews = data.map(item => ({
//           rating: 5,  // Assuming a static rating as the API response does not include a rating
//           title: "Featured Review",
//           text: item.message,
//           author: item.user_name,
//           image: item.image_url || `https://backend-nm1z.onrender.com${item.image}`, // Handling different image key scenarios
//         }));
//         setReviews(formattedReviews);
//       })
//       .catch(error => console.error("Failed to fetch reviews:", error));
//   }, []);

//   const cardVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     hover: {
//       scale: 1.05,
//       backgroundColor: '#FFB6C1',
//       transition: { duration: 0.3 },
//     },
//   };

//   return (
//     <div className="bg-[#FCF9F2] py-12 overflow-hidden">
//       <div className="container mx-auto px-4 text-center">
//         <h2
//           className="text-3xl sm:text-5xl mb-6 sm:mb-12 text-[#111111]"
//           style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
//         >
//           Everybody Loves Us
//         </h2>
//         <p
//           className="text-lg sm:text-xl text-[#333333] mb-8 sm:mb-12"
//           style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
//         >
//           Check out some of our recent product reviews.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-11 max-w-7xl mx-auto">
//           {reviews.map((review, index) => (
//             <motion.div
//               key={index}
//               variants={cardVariants}
//               initial="initial"
//               animate="animate"
//               whileHover="hover"
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className="bg-[#FCF9F2] px-4 py-6 rounded-lg shadow-lg border border-[#D1BFA7]"
//             >
//               {/* Star Rating */}
//               <div className="flex justify-center mb-3 space-x-1">
//                 {[...Array(review.rating)].map((_, i) => (
//                   <Star key={i} className="text-[#FF3D57] w-6 h-6" fill="currentColor" />
//                 ))}
//               </div>

//               {/* Rating Number */}
//               <p className="text-3xl font-bold text-[#111111]">{review.rating}.0</p>

//               {/* Title */}
//               <h3
//                 className="text-2xl text-[#111111]"
//                 style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
//               >
//                 {review.title}
//               </h3>

//               {/* Review Text */}
//               <p
//                 className="text-[#333333]"
//                 style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
//               >
//                 {review.text}{" "}
//                 <span className="text-[#FF3D57] cursor-pointer hover:underline">
//                   Read More
//                 </span>
//               </p>

//               {/* Author */}
//               <p className="text-sm text-gray-600 mt-4 font-semibold">— {review.author}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerReviews;
