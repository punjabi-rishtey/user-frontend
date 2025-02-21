import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";

const Testimonials = () => {
  const [selectedClient, setSelectedClient] = useState(0);
  const [clientObj, setClientObj] = useState({
    name: "",
    photo: "",
    quote: "",
  });

  const clients = [
    {
      name: "Shalini & Vicky",
      photo: "https://punjabi-rishtey.com/uploads/stories/20230329152147.jpg",
      quote:
        "Found our perfect match through Punjabi Rishtey. The platform made everything so seamless!",
    },
    {
      name: "Taranjeet & Simran",
      photo: "https://punjabi-rishtey.com/uploads/stories/20230329140724.jpg",
      quote:
        "Grateful to this platform for helping us find each other. Our journey has been beautiful!",
    },
    {
      name: "Vivek & Sakshi",
      photo: "https://punjabi-rishtey.com/uploads/stories/20221203124705.jpg",
      quote:
        "The perfect match! This platform made it incredibly easy to connect with someone who truly understands me.",
    },
    {
      name: "Lakshita & Rachit",
      photo: "https://punjabi-rishtey.com/uploads/stories/20221203124846.jpg",
      quote:
        "We never imagined finding someone so perfect. Thank you for bringing us together!",
    },
  ];

  useEffect(() => {
    selectClient(selectedClient);
  }, []);

  const selectClient = (index) => {
    setSelectedClient(index);
    setClientObj({
      name: clients[index].name,
      photo: clients[index].photo,
      quote: clients[index].quote,
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col">
      <Header />

      <main className="flex-grow py-16 px-4">
        <div className="container mx-auto">
          <h2
            className="text-5xl text-center mb-12 text-[#111111]"
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
                  className={`cursor-pointer overflow-hidden rounded-lg shadow-lg ${
                    selectedClient === index 
                      ? "ring-2 ring-[#FF3D57] bg-[#FEEAEA]" 
                      : "bg-[#FEEAEA]"
                  }`}
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
<div className="w-full md:w-1/2 flex flex-col items-center">
  {/* Image Container - Outside blockquote */}
  <motion.div
    id="client-photo"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="w-64 h-64 mb-8"
  >
    <img
      src={clientObj.photo}
      alt={clientObj.name}
      className="w-full h-full object-cover rounded-full shadow-lg ring-2 ring-[#FF3D57]"
    />
  </motion.div>

  {/* Quote and Name Container */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center bg-[#FEEAEA] p-6 rounded-lg shadow-lg w-full max-w-xl"
  >
    <motion.blockquote
      id="client-quote"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-xl text-[#333333] mb-4 mx-auto px-4"
      style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
    >
      "{clientObj.quote}"
    </motion.blockquote>

    <motion.p
      id="client-name"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-2xl text-[#FF3D57]"
      style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
    >
      {clientObj.name}
    </motion.p>
  </motion.div>
</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;