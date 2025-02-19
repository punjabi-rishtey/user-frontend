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

  const getProfilesWithMatchScore = () => {
    if (!user?.preferences) {
      return profiles.map(profile => ({ ...profile, matchScore: 0 }));
    }

    const prefs = user.preferences;
    const weightage = {
      height: 1,
      caste: 2,
      manglik: 2,
      location: 1,
      familyValues: 1,
      diet: 1
    };
    const totalWeight = Object.values(weightage).reduce((a, b) => a + b, 0);

    return profiles.map(profile => {
      let matchScore = 0;

      // ... other preference checks ...

      // Updated manglik check to handle partial matches
      if (prefs.manglik) {
        if (prefs.manglik === profile.manglik) {
          matchScore += weightage.manglik;
        } else if (
          (prefs.manglik === "partial_manglik" && 
           (profile.manglik === "manglik" || profile.manglik === "non_manglik")) ||
          ((prefs.manglik === "manglik" || prefs.manglik === "non_manglik") && 
           profile.manglik === "partial_manglik")
        ) {
          matchScore += weightage.manglik / 2; // Half score for partial matches
        }
      }

      // ... rest of the scoring logic ...

      return {
        ...profile,
        matchScore: (matchScore / totalWeight) * 100
      };
    });
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
