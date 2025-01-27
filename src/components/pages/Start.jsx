import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/bg.mp4";
import character1 from "../../assets/character1.PNG";
import character2 from "../../assets/character2.PNG";

const Start = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/game1"); // Replace with your actual route
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background Video */}
      <video
        src={bg}
        autoPlay
        loop
        muted
        className="blur-lg w-full h-full object-cover"
      ></video>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-8 p-6 text-center">
          {/* Title */}
          <h1 className="text-white text-4xl font-bold font-display mb-4 bg-pink-500/80 rounded-full px-6 py-3 shadow-lg">
            เลือกตัวละคร
          </h1>

          {/* Characters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Character 1 */}
            <div className="flex flex-col items-center gap-4 bg-white/80 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer">
              <img
                src={character1}
                alt="Character 1"
                className="rounded-lg w-60 h-60 object-cover"
                onClick={handleNext}
              />
              <p className="text-lg text-black text-6xl font-semibold font-display">
                มานะ
              </p>
            </div>

            {/* Character 2 */}
            <div className="flex flex-col items-center gap-4 bg-white/80 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer">
              <img
                src={character2}
                alt="Character 2"
                className="rounded-lg w-60 h-60 object-cover"
                onClick={handleNext}
              />
              <p className="text-lg text-black text-6xl font-semibold font-display">
                มานี
              </p>
            </div>
          </div>

          {/* Navigation button */}
        </div>
      </div>
    </div>
  );
};

export default Start;
