import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";

const Testimonials = () => {
  const [selectedClient, setSelectedClient] = useState(0);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("https://backend-nm1z.onrender.com/api/testimonials/all")
      .then(response => response.json())
      .then(data => {
        const formattedClients = data.map(client => ({
          name: client.user_name,
          photo: client.image_url || `https://backend-nm1z.onrender.com${client.image}`,
          quote: client.message,
        }));
        setClients(formattedClients);
        if (formattedClients.length > 0) {
          selectClient(0);
        }
      })
      .catch(error => console.error("Failed to fetch testimonials:", error));
  }, []);

  const selectClient = (index) => {
    setSelectedClient(index);
  };

  return (
    <div className="min-h-screen bg-[#FCF9F2] flex flex-col">
      <Header />

      <main className="flex-grow py-16 px-4">
        <div className="container mx-auto">
          <h2
            className="text-5xl text-center mb-12 text-[#4F2F1D]"
            style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
          >
            Our Success Stories
          </h2>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* Left Side - Client Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full md:w-1/2">
              {clients.map((client, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`cursor-pointer overflow-hidden rounded-lg shadow-lg ${selectedClient === index ? "ring-2 ring-[#4F2F1D] bg-[#F5EDE7]" : "bg-[#FCF9F2]"}`}
                  onClick={() => selectClient(index)}
                >
                  <img
                    src={client.photo}
                    alt={client.name}
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
              ))}
            </div>

            {/* Right Side - Selected Client */}
            {clients.length > 0 && (
              <div className="w-full md:w-1/2 flex flex-col items-center">
                {/* Image Container - Outside blockquote */}
                <motion.div
                  id="client-photo"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-64 h-64 mb-8"
                >
                  <img
                    src={clients[selectedClient].photo}
                    alt={clients[selectedClient].name}
                    className="w-full h-full object-cover rounded-full shadow-lg ring-2 ring-[#4F2F1D]"
                  />
                </motion.div>

                {/* Quote and Name Container */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center bg-[#F5EDE7] p-6 rounded-lg shadow-lg w-full max-w-xl"
                >
                  <motion.blockquote
                    id="client-quote"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl text-[#6B4132] mb-4 mx-auto px-4"
                    style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                  >
                    "{clients[selectedClient].quote}"
                  </motion.blockquote>

                  <motion.p
                    id="client-name"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl text-[#4F2F1D]"
                    style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
                  >
                    {clients[selectedClient].name}
                  </motion.p>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;
