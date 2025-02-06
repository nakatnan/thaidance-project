import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { motion as m } from "motion";
import bg from "../assets/bg.png";
import logo from "../assets/logo.png";
import teach1 from "../assets/teach1.png";
import teach2 from "../assets/teach2.png";
import teach3 from "../assets/teach3.png";
import teach4 from "../assets/teach4.png";

const Main = () => {
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [teach1, teach2, teach3, teach4];

  const handlePreviousClick = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div>
      <div className="relative w-full h-screen">
        <img src={bg} className="blur-sm w-full h-full object-cover"></img>
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <div>
            <img
              src={logo}
              alt="logo"
              className="w-120 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-130"
            />
          </div>

          <button
            className="btn btn-secondary rounded-full outline-0 shadow-xl mt-15 py-7 px-10 h-fit font-display text-5xl transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-130"
            onClick={() => navigate("/rule")}
          >
            เริ่มเล่นเกม
          </button>

          <button
            className="btn btn-ghost mt-10 font-display font-bold text-2xl py-7 px-10 rounded-full "
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            วิธีการเล่น
          </button>
          <dialog id="my_modal_4" class="modal">
            <div class="modal-box w-200 max-w-5xl relative">
              {/* <h3 class="text-lg font-bold font-display mb-6">
                คู่มือประกอบการเล่น
              </h3> */}
              <div>
                <img
                  src={images[currentImageIndex]}
                  alt={`teach${currentImageIndex + 1}`}
                  className="mt-6 mb-10"
                />
              </div>
              <div class="modal-action">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                  <div className="flex justify-between">
                    <div className="absolute bottom-4 left-4">
                      {currentImageIndex > 0 && (
                        <svg
                          onClick={handlePreviousClick}
                          className="h-6 w-6 fill-current md:h-8 md:w-8 rtl:rotate-180 cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-130"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                        </svg>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4">
                      {currentImageIndex < images.length - 1 && (
                        <svg
                          onClick={handleNextClick}
                          className="h-6 w-6 fill-current md:h-8 md:w-8 rtl:rotate-180 cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-130"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                        </svg>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Main;
