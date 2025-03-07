import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

const MembershipPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetch("https://backend-nm1z.onrender.com/api/memberships/all");
        if (!response.ok) throw new Error("Failed to fetch membership plans");
        
        const data = await response.json();
        setPlans(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, []);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-16 px-6">
        <h2 className="text-5xl text-center mb-12 text-[#4F2F1D]"
          style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}>
          Choose Your Perfect Plan
        </h2>

        {loading ? (
          <p className="text-center text-[#4F2F1D] text-xl">Loading membership plans...</p>
        ) : error ? (
          <p className="text-center text-red-600 text-xl">Error: {error}</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div key={index}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative w-full md:w-[380px] p-8 rounded-lg shadow-lg hover:ring-2 hover:ring-[#4F2F1D] bg-[#F5EDE7]"
              >
                {plan.mostPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#4F2F1D] text-[#E5D3C8] px-4 py-1 rounded-full z-10"
                    style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}>
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl mb-4 text-[#4F2F1D]"
                  style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}>
                  {plan.name}
                </h3>
                <p className="text-3xl mb-2 text-[#4F2F1D]"
                  style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}>
                  ₹{plan.price}
                  <span className="text-[#6B4132] text-lg ml-1"
                    style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}>
                    /month
                  </span>
                </p>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-[#6B4132]"
                      style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}>
                      {feature.available ? (
                        <span className="text-[#4F2F1D] mr-2">✓</span>
                      ) : (
                        <span className="text-[#8B7355] mr-2">✕</span>
                      )}
                      {feature.feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MembershipPage;
