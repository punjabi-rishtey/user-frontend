import React from 'react';
import Header from './Header';
import Footer from './Footer';

const ContactUs = () => {
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
                                <form className="bg-white p-8 rounded-lg shadow-lg">
                                    <div className="mb-4">
                                        <label className="block text-[#4F2F1D] mb-2 font-semibold">Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-[#4F2F1D] mb-2 font-semibold">Email</label>
                                        <input
                                            type="email"
                                            className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                                            placeholder="Your Email"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-[#4F2F1D] mb-2 font-semibold">Message</label>
                                        <textarea
                                            className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                                            placeholder="Your Message"
                                            rows="5"
                                        ></textarea>
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
                                <h2 className="text-2xl font-bold text-[#6b3e1f] mb-4">Get in Touch</h2>
                                <p className="text-gray-700 mb-4">
                                    If you have any questions, feel free to reach out to us. We are here to help you.
                                </p>
                                <div className="flex flex-col items-center md:items-start space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <span className="bg-black text-white p-3 rounded-full">
                                            📞
                                        </span>
                                        <div>
                                            <p className="text-gray-500 text-sm">Phone</p>
                                            <p className="font-semibold text-lg">+01 2242 3366</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="bg-black text-white p-3 rounded-full">
                                            ✉️
                                        </span>
                                        <div>
                                            <p className="text-gray-500 text-sm">Email</p>
                                            <p className="font-semibold text-lg">info@example.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="bg-black text-white p-3 rounded-full">
                                            📍
                                        </span>
                                        <div>
                                            <p className="text-gray-500 text-sm">Address</p>
                                            <p className="font-semibold text-lg">1234 Street Name, City, Country</p>
                                        </div>
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