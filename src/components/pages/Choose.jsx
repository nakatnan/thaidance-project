import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/bg.mp4";

const Choose = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/start"); // Replace with your actual route
  };

  return (
    <div>
      <div className="relative w-full h-screen">
        <video
          src={bg}
          autoPlay
          loop
          muted
          className="blur-lg w-full h-full object-cover"
        ></video>

        {/* Content container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            {/* Instruction text */}
            <h2 className="text-white text-3xl font-semibold font-display mb-2 text-center">
              กรุณารับชมวิดีโอก่อนนะคะ
            </h2>

            {/* Video container */}
            <div className="w-[800px] h-[450px] bg-black/60 p-4 rounded-lg shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/po-4gq94Pr4?si=xA4s0c7fEyWCaDuJ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>

            {/* Navigation button */}
            <button
              onClick={handleNext}
              className="btn btn-primary font-display text-xl px-8 py-3 mt-4 hover:scale-105 transition-transform"
            >
              ไปหน้าถัดไป
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
