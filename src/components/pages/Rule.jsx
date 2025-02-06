import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/bg.png";

const Rule = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/choose"); // Replace with your actual route
  };

  return (
    <div>
      <div className="relative w-full h-screen">
        <img src={bg} className="blur-lg w-full h-full object-cover"></img>

        {/* Content container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            {/* Instruction text */}
            <h2 className="text-white text-4xl font-bold font-display mb-4 bg-pink-500/80 rounded-full px-6 py-3 shadow-lg">
              แนะนำกติกาการเล่น
            </h2>

            {/* Video container */}
            <div className="w-[50vw] max-w-[800px] aspect-video bg-black/60 p-4 rounded-lg shadow-lg">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/ykzZXRi7wEs?si=PV9Kf0vPJAWzYp29"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>

            {/* Navigation button */}
            <button
              onClick={handleNext}
              className="btn btn-secondary font-display text-xl px-8 py-3 mt-4 hover:scale-105 transition-transform"
            >
              ไปหน้าถัดไป
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rule;
