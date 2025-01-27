import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/game2/logo.png";
import bg from "../../assets/game2/bg.JPG";
import egg from "../../assets/game2/egg.gif";
import modal from "../../assets/game2/modal.png";
import q1 from "../../assets/game2/q1.png";
import q2 from "../../assets/game2/q2.png";

function Game2() {
  const navigate = useNavigate();
  const questions = [
    {
      image: q1,
      answer: "ระบำนพรัตน์",
    },
    {
      image: q2,
      answer: "รำบายศรีสู่ขวัญ",
    },
  ];

  const [showLogo, setLogo] = useState(true);
  const [qModal, setQModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [buttonState, setButtonState] = useState(""); // "" | "correct" | "wrong"

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogo(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleQModal = () => {
    if (!gameCompleted) {
      setQModal(!qModal);
    }
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    const userAnswer = e.target.answer.value.trim().toLowerCase();
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer === currentQuestion.answer.toLowerCase()) {
      // Correct answer
      setButtonState("correct");
      setScore(score + 1);

      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          // Move to next question
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setButtonState("");
          e.target.reset();
        } else {
          // All questions completed
          setGameCompleted(true);
        }
      }, 1000);
    } else {
      // Wrong answer
      setButtonState("wrong");
      setTimeout(() => {
        setButtonState("");
      }, 1000);
    }
  };

  const goToNextPage = () => navigate("/game3");

  return (
    <div>
      <div className="relative w-full h-screen">
        <img
          src={bg}
          alt="Background"
          className={`w-full h-full object-cover ${showLogo ? "blur-lg" : ""}`}
        />
        {showLogo && (
          <div className="absolute inset-0 flex justify-center items-center z-50 animate-bounce">
            <img
              src={logo}
              alt="Game Logo"
              className="max-w-[70%] max-h-[70%] object-contain"
            />
          </div>
        )}
        {!qModal && !showLogo && (
          <div className="absolute inset-x-0 bottom-0 flex justify-center">
            <img
              src={egg}
              alt="Trigger"
              className="cursor-pointer object-contain"
              onClick={toggleQModal}
            />
          </div>
        )}
        {qModal && (
          <div className="absolute inset-0 flex justify-center items-center bg-black/60">
            <div className="relative">
              <img src={modal} alt="Modal" className="w-[1000px]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {!gameCompleted ? (
                  <>
                    {/* <div className="text-4xl font-semibold font-display mb-6">
                      คะแนนที่ได้: {score}
                    </div> */}
                    <form
                      onSubmit={handleSubmitAnswer}
                      className="flex flex-col items-center gap-4"
                    >
                      <img
                        src={questions[currentQuestionIndex].image}
                        alt="Question"
                        className="max-w-[500px] transition delay-150 duration-300 ease-in-out hover:scale-105 mb-6"
                      />
                      <input
                        type="text"
                        name="answer"
                        className="font-semibold font-display input input-bordered input-primary w-4/5 p-2 text-lg"
                        placeholder="พิมพ์คำตอบ"
                        required
                      />
                      <button
                        type="submit"
                        className={`btn font-display text-xl transition-colors duration-300
                          ${
                            buttonState === "correct"
                              ? "bg-green-500 hover:bg-green-600 border-green-500"
                              : buttonState === "wrong"
                              ? "bg-red-500 hover:bg-red-600 border-red-500"
                              : "btn-primary"
                          }`}
                      >
                        ส่งคำตอบ
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <h1 className="text-5xl font-semibold font-display mb-10">
                      ผ่านด่านแล้วจ้า
                    </h1>
                    <div className="flex flex-col items-center">
                      <button
                        className="btn btn-secondary font-display text-xl"
                        onClick={goToNextPage}
                      >
                        ไปหน้าถัดไป
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game2;
