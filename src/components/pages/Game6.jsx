import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/game6/logo6.png";
import bg from "../../assets/game6/bg6.gif";
import q1 from "../../assets/game6/q1.wav";
import q2 from "../../assets/game6/q2.wav";
import win from "../../assets/game6/win.JPG";
import lose from "../../assets/game6/lose.JPG";

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
  const [showLogo, setShowLogo] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
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
    setSelectedAnswer({
      index,
      isCorrect: index === currentQuestion.correct,
    });

    if (index === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        if (
          score + (index === currentQuestion.correct ? 1 : 0) ===
          questions.length
        ) {
          setGameComplete(true);
        } else {
          setShowResult(true);
          setTimeout(() => {
            setShowResult(false);
            setCurrentStep(0);
            setScore(0);
            setSelectedAnswer(null);
          }, 3000);
        }
      }
    }, 1500);
  };

  const renderQuestionContent = () => {
    const currentQuestion = questions[currentStep];

    if (gameComplete) {
      return (
        <div className="text-center px-4">
          <button
            className="btn btn-secondary font-display text-lg md:text-xl"
            onClick={() => navigate("/")}
          >
            ไปหน้าแรก
          </button>
        </div>
      );
    }

    return (
      <div className="container mx-auto max-w-md px-4 py-8 rounded-lg bg-white/90 shadow-lg">
        <img
          src={logo}
          alt="Logo"
          className="w-full max-w-[300px] mx-auto mb-8"
        />

        <audio ref={audioRef} src={currentQuestion.audio} className="hidden" />

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
                      ? "bg-green-500 text-white animate-pulse"
                      : "bg-red-500 text-white animate-pulse"
                    : selectedAnswer !== null &&
                      index === currentQuestion.correct
                    ? "bg-green-500 text-white animate-pulse"
                    : "bg-red-300 hover:bg-red-600"
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
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

      {!showLogo && (
        <div className="absolute inset-0 flex justify-center items-center">
          {renderQuestionContent()}
        </div>
      )}

      {showResult && !gameComplete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="p-4 max-w-[90%] md:max-w-[600px]">
            <img
              src={score === questions.length ? win : lose}
              alt="Result"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Game6;
