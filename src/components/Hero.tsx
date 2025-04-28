import React from "react";

import bannerImg from "../assets/banner.jpg";

interface HeroProps {
  navigate: (path: string) => void;
}

const Hero: React.FC<HeroProps> = ({ navigate }) => {
  return (
    <div
      className="w-full relative"
      style={{ fontFamily: "'Alegreya Sans', sans-serif" }}
    >
      {/* Green and white background container */}
      <div className="absolute inset-0 flex flex-col">
        <div className="h-2/4" style={{ backgroundColor: "#d4ff47" }}></div>
        <div className="h-2/4 bg-white"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10">
        {/* Text Banner Section */}
        <div className="py-16 px-4 text-center max-w-4xl mx-auto">
          <h1
            className="text-5xl sm:text-7xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "'Alegreya Sans', sans-serif" }}
          >
            A fairer future is possible
          </h1>
          <p
            className="text-xl sm:text-2xl text-gray-800 max-w-3xl mx-auto mb-8"
            style={{ fontFamily: "'Alegreya Sans', sans-serif" }}
          >
            Fairtrade changes the way trade works through better prices, decent
            working conditions, and a fairer deal for farmers and workers.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-medium py-3 px-8 rounded-full transition duration-300 mb-12"
            style={{ fontFamily: "'Alegreya Sans', sans-serif" }}
          >
            Learn more about Fairtrade
          </button>
        </div>

        {/* Image container positioned to overlap both backgrounds */}
        <div className="relative max-w-6xl mx-auto px-4 pb-16 sm:pb-32">
          <div className="w-full overflow-hidden rounded-lg shadow-xl">
            <img
              src={bannerImg}
              alt="Tea plantation with workers harvesting tea leaves"
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
