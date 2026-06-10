import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { apiUrl } from "../config/constants";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitStatus(null);
  };

  const validateForm = () => {
    const newErrors = {};
    const trimmed = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    if (!trimmed.name) newErrors.name = "Name is required";
    if (!trimmed.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!trimmed.phone) {
      newErrors.phone = "Mobile number is required";
    } else if (trimmed.phone.replace(/\D/g, "").length < 7) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!trimmed.subject) newErrors.subject = "Subject is required";
    if (!trimmed.message) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus({
        type: "error",
        message: "Please fix the highlighted fields and try again.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };
      const response = await fetch(apiUrl("/api/users/inquiries/submit"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setErrors({});
      setSubmitStatus({
        type: "success",
        message: "Thank you. Your message has been sent successfully.",
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setSubmitStatus({
        type: "error",
        message:
          error.message ||
          "An error occurred while submitting the inquiry. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 px-6 md:px-20 relative">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row w-full">
              {/* LEFT PANEL (Contact Form) */}
              <div
                className="
                w-full md:w-1/2
                bg-[#F5EDE7]
                p-8
                mb-6 md:mb-0
                md:mr-6
                rounded-lg
              "
              >
                <form onSubmit={handleSubmit}>
                  {submitStatus && (
                    <div
                      className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
                        submitStatus.type === "success"
                          ? "border-green-200 bg-green-50 text-green-800"
                          : "border-red-200 bg-red-50 text-red-700"
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  {["name", "email", "phone", "subject"].map((field) => (
                    <div key={field} className="mb-6">
                      <label
                        htmlFor={`contact-${field}`}
                        className="block text-[#4F2F1D] mb-2"
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        id={`contact-${field}`}
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full p-3 border border-[#6B4132] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
                        placeholder={`Your ${field}`}
                      />
                      {errors[field] && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors[field]}
                        </p>
                      )}
                    </div>
                  ))}

                  <div className="mb-6">
                    <label
                      htmlFor="contact-message"
                      className="block text-[#4F2F1D] mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 border border-[#6B4132] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F2F1D] bg-white"
                      placeholder="Your message"
                      rows="5"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg transition-all duration-300 bg-[#4F2F1D] text-[#E5D3C8] hover:bg-[#6B4132] disabled:cursor-wait disabled:opacity-70"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>

              {/* RIGHT PANEL (Contact Info) - Fixed height with vertical centering */}
              <div
                className="
                w-full md:w-1/2
                bg-[#F5EDE7]
                p-8
                rounded-lg
                flex
                flex-col
                justify-center
                md:h-auto
              "
              >
                <div className="flex flex-col h-full justify-center">
                  <h2 className="text-2xl mb-6 text-[#4F2F1D]">Get in Touch</h2>
                  <p className="text-[#6B4132] mb-8">
                    If you have any questions, feel free to reach out to us. We
                    are here to help you.
                  </p>

                  <div className="space-y-6">
                    {[
                      { icon: "📞", label: "Phone", value: "+91-73546-19960" },
                      {
                        icon: "✉️",
                        label: "Email",
                        value: "support@punjabi-rishtey.com",
                      },
                      {
                        icon: "📍",
                        label: "Address",
                        value: "Mahalaxmi Nagar, Indore, M.P. 452010",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center space-x-4"
                      >
                        <span className="bg-[#FCF9F2] p-3 rounded-full">
                          {item.icon}
                        </span>
                        <div>
                          <p className="text-[#8B7355] text-sm">{item.label}</p>
                          <p className="text-[#4F2F1D]">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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
