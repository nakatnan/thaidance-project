import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useScore } from "../ScoreContext";
import ScoreDisplay from "../ScoreDisplay";
import logo from "../../assets/game6/logo6.png";
import bg from "../../assets/game6/bg6.gif";
import q1 from "../../assets/game6/q1.wav";
import q2 from "../../assets/game6/q2.wav";

const questions = [
  {
    audio: q1,
    options: ["มานี", "มานะ"],
    correct: 0,
  },
  {
    audio: q2,
    options: ["มานี", "มานะ"],
    correct: 1,
  },
];

const Game6 = () => {
  const { updateScore } = useScore();
  const [showLogo, setShowLogo] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const audioRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleAnswer = (index) => {
    const currentQuestion = questions[currentStep];
    const isCorrect = index === currentQuestion.correct;

    setSelectedAnswer({
      index,
      isCorrect,
    });

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      updateScore("game6", newScore); // Update global score with correct game identifier

      setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setCurrentStep((prev) => prev + 1);
          setSelectedAnswer(null);
        } else {
          setIsComplete(true);
        }
      }, 1000);
    } else {
      // Add handling for incorrect answers
      setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setCurrentStep((prev) => prev + 1);
          setSelectedAnswer(null);
        } else {
          setIsComplete(true);
        }
      }, 1000);
    }
  };

  const renderQuestionContent = () => {
    const currentQuestion = questions[currentStep];

    return (
      <div className="container mx-auto max-w-md px-4 py-8 rounded-lg bg-white/90 shadow-lg">
        <img
          src={logo}
          alt="Logo"
          className="w-full max-w-[300px] mx-auto mb-8"
        />
        <h1 className="text-center text-slate-700 text-2xl md:text-2xl font-semibold font-display mb-8">
          ”ฟังดี ๆ มีคำตอบ“
        </h1>
        <h1 className="text-center text-slate-700 text-2xl md:text-2xl font-semibold font-display mb-8">
          จงเลือกผู้ที่พูดคำตอบถูกต้อง
        </h1>

        {!isComplete ? (
          <>
            <audio
              ref={audioRef}
              src={currentQuestion.audio}
              className="hidden"
            />

            <button
              onClick={handlePlayAudio}
              className="mx-auto mb-8 px-6 py-3 text-lg font-display bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              🔊 ฟังคำถาม
            </button>

            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`px-4 py-3 text-lg font-display rounded-lg transition-all duration-300
                    ${
                      selectedAnswer?.index === index
                        ? selectedAnswer.isCorrect
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : selectedAnswer !== null &&
                          index === currentQuestion.correct
                        ? "bg-green-500 text-white"
                        : "bg-red-300 hover:bg-red-600"
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <button
            className="btn btn-secondary mt-6 px-6 py-3 text-lg font-display text-white rounded-lg hover:bg-pink-700 transition-colors duration-300 w-full"
            onClick={() => navigate("/")}
          >
            ไปหน้าแรก
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen">
      <ScoreDisplay />
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

      {!showLogo && (
        <div className="absolute inset-0 flex justify-center items-center">
          {renderQuestionContent()}
        </div>
      )}
    </div>
  );
};

export default Game6;
