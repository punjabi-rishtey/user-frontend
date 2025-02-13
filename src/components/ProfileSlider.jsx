import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import profiles from './profiles.json'; // Import profile data from a JSON file

const ProfileSlider = () => {
  // Configuration for the Slick Slider
  const settings = {
    dots: true, // Show dot indicators at the bottom of the slider
    infinite: true, // Enable infinite looping of slides
    speed: 500, // Transition speed between slides
    slidesToShow: 5, // Number of slides visible at once
    slidesToScroll: 1, // Number of slides to scroll per transition
    autoplay: true, // Enable auto-scrolling
    autoplaySpeed: 3000, // Auto-scroll interval (ms)
    responsive: [
      {
        breakpoint: 1024, // Tablets and small desktops
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600, // Large phones
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480, // Small phones
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="container mx-auto px-2 py-6"> {/* Reduced overall padding */}
      {/* Slider Title */}
      <h2 className="text-xl font-semibold text-center mb-4">Top Picks for You</h2> {/* Smaller title */}

      {/* Slick Slider Component */}
      <Slider {...settings}>
        {profiles.map((profile) => (
          <div key={profile.id} className="p-1"> {/* Reduced padding */}
            <div className="relative overflow-hidden rounded-md shadow-md h-[250px] w-[220px] mx-auto"> {/* Fixed portrait frame */}
              {/* Profile Image */}
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-cover object-center" // Ensures all images fit portrait frame
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="p-1"> {/* Reduced padding */}
                  <h5 className="text-sm font-medium">{profile.name}</h5> {/* Smaller text */}
                  <p className="text-xs">{profile.city}, {profile.age} Years old</p> {/* Smaller text */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProfileSlider;
