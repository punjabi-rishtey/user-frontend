import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { apiUrl, BACKEND_BASE_URL } from "../config/constants";

const Testimonials = () => {
  const [selectedClient, setSelectedClient] = useState(0);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl("/api/testimonials/all"))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const formattedClients = data.map((client) => ({
          name: client.user_name,
          photo: client.image_url || `${BACKEND_BASE_URL}${client.image}`,
          quote: client.message,
        }));
        setClients(formattedClients);
        if (formattedClients.length > 0) {
          setSelectedClient(0);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch testimonials:", error);
        setError("Failed to load testimonials. Please try again later.");
        setLoading(false);
      });
  }, []);

  const selectClient = (index) => {
    setSelectedClient(index);
  };

  const nextClient = () => {
    setSelectedClient((prev) => (prev + 1) % clients.length);
  };

  const prevClient = () => {
    setSelectedClient((prev) => (prev - 1 + clients.length) % clients.length);
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-[#FCF9F2] flex flex-col">
      <Header />

      <main className="flex-grow py-10 sm:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl text-center mb-8 sm:mb-12 text-[#4F2F1D]"
            style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
          >
            Our Success Stories
          </motion.h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#4F2F1D]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg">
              {error}
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center text-[#6B4132] bg-[#F5EDE7] p-4 rounded-lg">
              No testimonials available at the moment.
            </div>
          ) : (
            <>
              {/* Featured Testimonial */}
              <div className="mb-12">
                <motion.div
                  key={selectedClient}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={fadeInUp}
                  className="bg-white rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image Container */}
                    <div className="w-full md:w-2/5 bg-[#F5EDE7]">
                      <div className="aspect-w-1 aspect-h-1 h-full w-full">
                        <motion.div
                          className="h-full flex items-center justify-center p-4 sm:p-6"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="rounded-full overflow-hidden border-4 border-[#4F2F1D] shadow-xl h-48 w-48 sm:h-64 sm:w-64">
                            <img
                              src={clients[selectedClient].photo}
                              alt={clients[selectedClient].name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Quote Container */}
                    <div className="w-full md:w-3/5 p-6 sm:p-8 flex flex-col justify-center">
                      <motion.blockquote
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-lg sm:text-xl text-[#6B4132] mb-6 italic"
                        style={{
                          fontFamily: "'Modern Era', sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        "{clients[selectedClient].quote}"
                      </motion.blockquote>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <h3
                          className="text-xl sm:text-2xl text-[#4F2F1D]"
                          style={{
                            fontFamily: "'Tiempos Headline', serif",
                            fontWeight: 400,
                          }}
                        >
                          {clients[selectedClient].name}
                        </h3>
                      </motion.div>

                      {/* Navigation Controls */}
                      <div className="flex justify-end items-center mt-6">
                        <button
                          onClick={prevClient}
                          className="bg-[#F5EDE7] hover:bg-[#E5D3C8] text-[#4F2F1D] p-2 rounded-full mr-2 transition-colors duration-200"
                          aria-label="Previous testimonial"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextClient}
                          className="bg-[#F5EDE7] hover:bg-[#E5D3C8] text-[#4F2F1D] p-2 rounded-full transition-colors duration-200"
                          aria-label="Next testimonial"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Thumbnail Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h3
                  className="text-xl sm:text-2xl text-center mb-6 text-[#4F2F1D]"
                  style={{
                    fontFamily: "'Tiempos Headline', serif",
                    fontWeight: 400,
                  }}
                >
                  Meet Our Happy Couples
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {clients.map((client, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`cursor-pointer overflow-hidden rounded-lg shadow-md ${
                        selectedClient === index
                          ? "ring-4 ring-[#4F2F1D] bg-[#F5EDE7]"
                          : "hover:ring-2 hover:ring-[#E5D3C8] bg-white"
                      }`}
                      onClick={() => selectClient(index)}
                    >
                      <div className="aspect-w-1 aspect-h-1">
                        <img
                          src={client.photo}
                          alt={client.name}
                          className="object-cover w-3xs h-72"
                        />
                      </div>
                      <div className="p-2 text-center">
                        <p
                          className="text-xs sm:text-sm truncate text-[#4F2F1D]"
                          style={{
                            fontFamily: "'Modern Era', sans-serif",
                            fontWeight: 400,
                          }}
                        >
                          {client.name}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;
