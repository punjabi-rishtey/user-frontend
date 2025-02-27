import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Form submitted:", formData);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 px-6 md:px-20 relative">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-8">
            {/* Flex container for both side contents */}
            <div className="flex flex-col md:flex-row w-full">
              {/* Left Side - Contact Form */}
              <div className="flex flex-col flex-grow bg-[#F5EDE7] p-8 mr-6 rounded-lg ">
                <form onSubmit={handleSubmit} className="flex-grow">
                  {["name", "email", "mobile", "subject"].map((field) => (
                    <div key={field} className="mb-6">
                      <label
                        className="block text-[#4F2F1D] mb-2"
                        style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full p-3 border border-[#6B4132] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
                        placeholder={`Your ${field}`}
                      />
                      {errors[field] && (
                        <p className="text-[#4F2F1D] text-sm mt-1">{errors[field]}</p>
                      )}
                    </div>
                  ))}

                  <div className="mb-6">
                    <label
                      className="block text-[#4F2F1D] mb-2"
                      style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 border border-[#6B4132] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
                      placeholder="Your message"
                      rows="5"
                    ></textarea>
                    {errors.message && (
                      <p className="text-[#4F2F1D] text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg transition-all duration-300 bg-[#4F2F1D] text-[#E5D3C8] hover:bg-[#6B4132]"
                    style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Right Side - Contact Info and Map */}
              <div className="flex flex-col flex-grow bg-[#F5EDE7] p-8 rounded-lg">
                <div className="flex-grow">
                  <h2
                    className="text-2xl mb-6 text-[#4F2F1D]"
                    style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
                  >
                    Get in Touch
                  </h2>
                  <p
                    className="text-[#6B4132] mb-8"
                    style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                  >
                    If you have any questions, feel free to reach out to us. We are here to help you.
                  </p>

                  <div className="space-y-6">
                    {[
                      { icon: "📞", label: "Phone", value: "+91-73546-19960" },
                      { icon: "✉️", label: "Email", value: "support@punjabi-rishtey.com" },
                      { icon: "📍", label: "Address", value: "Mahalaxmi Nagar, Indore, M.P. 452010" }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center space-x-4">
                        <span className="bg-[#FCF9F2] p-3 rounded-full hover:bg-[#E5D3C8] transition-all duration-300">
                          {item.icon}
                        </span>
                        <div>
                          <p
                            className="text-[#8B7355] text-sm"
                            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                          >
                            {item.label}
                          </p>
                          <p
                            className="text-[#4F2F1D]"
                            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                          >
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Section */}
                <div className="mt-12 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.1979448425536!2d75.90972427496939!3d22.75803417936002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39631dc98ba6d683%3A0x64f13661e6711e45!2sPunjabi%20Rishtey!5e0!3m2!1sen!2sin!4v1739554919003!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Maps"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
