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
      // Handle form submission (e.g., send data to server)
      console.log("Form submitted:", formData);
      // Clear form
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
    <div className="bg-[#F0ECE3] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-[#fdf8f4] py-16 px-6 md:px-20 relative">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-serif font-bold text-[#6b3e1f] text-center mb-8">
              Contact Us
            </h1>
            <div className="flex flex-col md:flex-row items-center">
              {/* Left Side - Contact Form */}
              <div className="w-full md:w-1/2 md:pr-16">
                <form
                  className="bg-white p-8 rounded-lg shadow-lg"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-4">
                    <label className="block text-[#4F2F1D] mb-2 font-semibold">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                      placeholder="Your Name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#4F2F1D] mb-2 font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                      placeholder="Your Email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#4F2F1D] mb-2 font-semibold">
                      Mobile
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                      placeholder="Your Mobile Number"
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-sm">{errors.mobile}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#4F2F1D] mb-2 font-semibold">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                      placeholder="Subject"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm">{errors.subject}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#4F2F1D] mb-2 font-semibold">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                      placeholder="Your Message"
                      rows="5"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm">{errors.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded-md transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Right Side - Contact Info */}
              <div className="w-full md:w-1/2 md:pl-16 mt-8 md:mt-0 text-center md:text-left">
                <h2 className="text-2xl font-bold text-[#6b3e1f] mb-4">
                  Get in Touch
                </h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions, feel free to reach out to us. We
                  are here to help you.
                </p>
                <div className="flex flex-col items-center md:items-start space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="bg-black text-white p-3 rounded-full">
                      📞
                    </span>
                    <div>
                      <p className="text-gray-500 text-sm">Phone</p>
                      <p className="font-semibold text-lg">+91-73546-19960</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-black text-white p-3 rounded-full">
                      ✉️
                    </span>
                    <div>
                      <p className="text-gray-500 text-sm">Email</p>
                      <p className="font-semibold text-lg">
                        support@punjabi-rishtey.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-black text-white p-3 rounded-full">
                      📍
                    </span>
                    <div>
                      <p className="text-gray-500 text-sm">Address</p>
                      <p className="font-semibold text-lg">
                        Mahalaxmi Nagar, Indore, M.P. 452010
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="mt-12">
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
