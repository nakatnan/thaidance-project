import React from "react";
import bg from "../../assets/bg.mp4";
const Video = () => {
  return (
    <div>
      <div className="relative w-full h-screen">
        <video
          src={bg}
          autoPlay
          loop
          muted
          className="blur-sm w-full h-full object-cover"
        ></video>
      </div>
    </div>
  );
};

export default Video;
