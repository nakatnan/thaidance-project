import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/game1/logo.png";
import bg from "../../assets/game2/bg.JPG";
import egg from "../../assets/game2/egg.gif";
import modal from "../../assets/game1/modal.png";
import q1 from "../../assets/game2/q1.png";
import q2 from "../../assets/game2/q2.png";

function Game7() {
  const navigate = useNavigate();
  const questions = [
    {
      image: q1,
      answer: "ระบำนพรัตน์",
    },
    {
      image: q2,
      answer: "บายศรีสู่ขวัญ",
    },
  ];

  const [showLogo, setLogo] = useState(true);
  const [qModal, setQModal] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
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
      if (!qModal) {
        selectNewQuestion();
      }
    }
  };

  const selectNewQuestion = () => {
    const unansweredQuestions = questions.filter(
      (_, index) => !answeredQuestions.has(index)
    );
    if (unansweredQuestions.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * unansweredQuestions.length
      );
      setActiveQuestion(unansweredQuestions[randomIndex]);
    }
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    const userAnswer = e.target.answer.value.trim().toLowerCase();

    if (activeQuestion && userAnswer === activeQuestion.answer.toLowerCase()) {
      // Correct answer
      setButtonState("correct");
      const newScore = score + 1;
      setScore(newScore);

      // Add the answered question to the set
      const currentQuestionIndex = questions.findIndex(
        (q) => q.answer === activeQuestion.answer
      );
      const newAnsweredQuestions = new Set(answeredQuestions);
      newAnsweredQuestions.add(currentQuestionIndex);
      setAnsweredQuestions(newAnsweredQuestions);

      // Check if all questions are answered
      if (newAnsweredQuestions.size === questions.length) {
        setTimeout(() => {
          setGameCompleted(true);
        }, 1000);
      } else {
        // Move to next question after delay
        setTimeout(() => {
          setButtonState("");
          setActiveQuestion(null);
          selectNewQuestion();
          e.target.reset();
        }, 1000);
      }
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
                    <div className="text-4xl font-semibold font-display mb-6">
                      คะแนนที่ได้: {score}
                    </div>
                    {activeQuestion && (
                      <form
                        onSubmit={handleSubmitAnswer}
                        className="flex flex-col items-center gap-4"
                      >
                        <img
                          src={activeQuestion.image}
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
                    )}
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

export default Game7;
