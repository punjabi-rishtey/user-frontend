import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://backend-nm1z.onrender.com/testimonials/all")
      .then(response => response.json())
      .then(data => {
        const formattedReviews = data.map(item => ({
          rating: 5,  // Assuming a static rating as the API response does not include a rating
          title: "Featured Review",
          text: item.message,
          author: item.user_name,
          image: item.image_url || `http://localhost:5174${item.image}`, // Handling different image key scenarios
        }));
        setReviews(formattedReviews);
      })
      .catch(error => console.error("Failed to fetch reviews:", error));
  }, []);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      backgroundColor: '#FFB6C1',
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="bg-[#FCF9F2] py-12 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2
          className="text-3xl sm:text-5xl mb-6 sm:mb-12 text-[#111111]"
          style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
        >
          Everybody Loves Us
        </h2>
        <p
          className="text-lg sm:text-xl text-[#333333] mb-8 sm:mb-12"
          style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
        >
          Check out some of our recent product reviews.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-11 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
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
                  <Star key={i} className="text-[#FF3D57] w-6 h-6" fill="currentColor" />
                ))}
              </div>

              {/* Rating Number */}
              <p className="text-3xl font-bold text-[#111111]">{review.rating}.0</p>

              {/* Title */}
              <h3
                className="text-2xl text-[#111111]"
                style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
              >
                {review.title}
              </h3>

              {/* Review Text */}
              <p
                className="text-[#333333]"
                style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
              >
                {review.text}{" "}
                <span className="text-[#FF3D57] cursor-pointer hover:underline">
                  Read More
                </span>
              </p>

              {/* Author */}
              <p className="text-sm text-gray-600 mt-4 font-semibold">— {review.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
