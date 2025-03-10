import React from "react";

const BlockingPage = () => {
  return (
    <div className="min-h-screen bg-[#fff8f0] flex flex-col justify-center items-center px-4">
      {/* You can tweak the bg color (#fff8f0) and text color (#4c2e08) 
          to match the rest of your theme */}
      <div className="max-w-lg w-full bg-white rounded-lg shadow-xl p-8 text-center">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-[#4c2e08] mb-4">
          You don't have an <br />Active Membership!
        </h1>

        {/* Description */}
        <p className="text-gray-700 mb-6">
          It looks like you don’t have an active membership. To continue enjoying
          all the features of our matrimonial service, please purchase or renew
          your plan as soon as possible.
        </p>

        {/* Buy Now Button */}
        <button
          onClick={() => {
            window.location.href = "/membership";
          }}
          className="inline-block px-6 py-3 rounded-md text-white bg-[#4c2e08] hover:bg-[#3b2306] transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default BlockingPage;
