import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/game4/logo.png";
import bg from "../../assets/game4/bg.jpeg";
import swing from "../../assets/game4/swing.gif";
import q1 from "../../assets/game4/q1/q1.png";
import q1_c1 from "../../assets/game4/q1/q1_c1.png";
import q2 from "../../assets/game4/q2/q2.png";
import q2_c1 from "../../assets/game4/q2/q2_c1.png";
import q3 from "../../assets/game4/q3/q3.png";
import q3_c1 from "../../assets/game4/q3/q3_c1.png";
import q4 from "../../assets/game4/q4/q4.png";
import q4_c1 from "../../assets/game4/q4/q4_c1.png";
import q5 from "../../assets/game4/q5/q5.png";
import q5_c1 from "../../assets/game4/q5/q5_c1.png";

function Game4() {
  const navigate = useNavigate();
  const questions = [
    {
      image: q1,
      choice: q1_c1,
      answer: "ละครเสภา",
    },
    {
      image: q2,
      choice: q2_c1,
      answer: "ละครดึกดำบรรพ์",
    },
    {
      image: q3,
      choice: q3_c1,
      answer: [
        "ปริ้นเธียเตอร์",
        "ปริ๊นเธียเตอร์",
        "ปริ้นซ์เธียเตอร์",
        "ปริ๊นซ์เธียเตอร์",
        "ปริ้นเทียเตอร์",
        "ปริ๊นเทียเตอร์",
        "ปริ้นซ์เทียเตอร์",
        "ปริ๊นซ์เทียเตอร์",
      ],
    },
    {
      image: q4,
      choice: q4_c1,
      answer: "ละครพันทาง",
    },
    {
      image: q5,
      choice: q5_c1,
      answer: "ไกรทอง",
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

    // Convert answer to array if it's a single string
    const correctAnswers = Array.isArray(currentQuestion.answer)
      ? currentQuestion.answer.map((ans) => ans.toLowerCase())
      : [currentQuestion.answer.toLowerCase()];

    if (correctAnswers.includes(userAnswer)) {
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

  const goToNextPage = () => navigate("/game5");

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
              src={swing}
              alt="Trigger"
              className="cursor-pointer object-contain"
              onClick={toggleQModal}
            />
          </div>
        )}
        {qModal && (
          <div className="absolute inset-0 flex justify-center items-center bg-black/60">
            <div>
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
                        className="max-w-[300px] transition delay-150 duration-300 ease-in-out hover:scale-105 mb-6"
                      />
                      <img
                        src={questions[currentQuestionIndex].choice}
                        alt="Choice"
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

export default Game4;
