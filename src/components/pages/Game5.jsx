import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/game5/logo.png";
import bg from "../../assets/game5/bg.PNG";
import ghost from "../../assets/game5/ghost.gif";
import q1 from "../../assets/game5/q1/q1.png";
import q1_c1 from "../../assets/game5/q1/c1.GIF";
import q1_c2 from "../../assets/game5/q1/c2.GIF";
import q1_c3 from "../../assets/game5/q1/c3.GIF";
import q1_c4 from "../../assets/game5/q1/c4.GIF";
import q1_c5 from "../../assets/game5/q1/c5.GIF";
import q1_c6 from "../../assets/game5/q1/c6.GIF";
import q1_c7 from "../../assets/game5/q1/c7.GIF";
import q1_c8 from "../../assets/game5/q1/c8.GIF";

const Game5 = () => {
  const navigate = useNavigate();
  const questions = [
    {
      question: q1,
      choices: [q1_c1, q1_c2, q1_c3, q1_c4, q1_c5, q1_c6, q1_c7, q1_c8],
      correctAnswer: [q1_c4, q1_c5, q1_c8],
    },
  ];

  const [showLogo, setShowLogo] = useState(true);
  const [qModal, setQModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [questionScores, setQuestionScores] = useState(
    new Array(questions.length).fill(0)
  );
  const [totalScore, setTotalScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleQModal = () => setQModal(!qModal);

  const handleChoiceClick = (choice) => {
    const currentQuestion = questions[currentQuestionIndex];
    const maxSelections = currentQuestion.correctAnswer.length;

    setSelectedChoices((prev) =>
      prev.includes(choice)
        ? prev.filter((c) => c !== choice)
        : prev.length < maxSelections
        ? [...prev, choice]
        : prev
    );
  };

  const checkAnswers = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctChoices = currentQuestion.correctAnswer;

    const correctCount = selectedChoices.filter((choice) =>
      correctChoices.includes(choice)
    ).length;

    setCorrectAnswersCount(correctCount);

    const isCompletelyCorrect =
      selectedChoices.length === correctChoices.length &&
      selectedChoices.every((choice) => correctChoices.includes(choice));

    if (isCompletelyCorrect) {
      setQuestionScores((prev) => {
        const newScores = [...prev];
        newScores[currentQuestionIndex] = 1;
        return newScores;
      });
      setTotalScore((prev) => prev + 1);

      if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedChoices([]);
          setCorrectAnswersCount(0);
        }, 500);
      }
    }
  };

  const renderQuestionContent = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (totalScore === questions.length) {
      return (
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-5xl font-semibold font-display mb-6 md:mb-10 mt-6 md:mt-10">
            ผ่านด่านที่ห้าแล้วจ้า
          </h1>
          <button
            className="btn btn-secondary font-display text-lg md:text-xl"
            onClick={() => navigate("/game6")}
          >
            ไปเกมถัดไป
          </button>
        </div>
      );
    }

    return (
      <div className="px-4 w-full max-w-7xl mx-auto">
        <img
          src={currentQuestion.question}
          alt="Question"
          className="w-full max-w-[600px] mx-auto transition delay-150 duration-300 ease-in-out hover:scale-105 mb-6 md:mb-10"
        />
        <div
          className="grid gap-3 md:gap-6 mb-6 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${
              window.innerWidth < 768 ? 2 : 4
            }, minmax(0, 1fr))`,
          }}
        >
          {currentQuestion.choices.map((choice, index) => (
            <div key={index} className="aspect-w-4 aspect-h-3">
              <img
                src={choice}
                alt={`Choice ${index + 1}`}
                className={`w-full h-full object-cover cursor-pointer transition delay-150 duration-300 ease-in-out hover:scale-105 ${
                  selectedChoices.includes(choice)
                    ? "border-4 border-green-500"
                    : ""
                }`}
                onClick={() => handleChoiceClick(choice)}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-center">
          <h1 className="text-2xl md:text-3xl font-medium font-display">
            ข้อที่ถูก: {correctAnswersCount}
          </h1>
          <button
            className="btn btn-primary font-display text-lg md:text-xl w-full md:w-auto"
            onClick={checkAnswers}
            disabled={selectedChoices.length === 0}
          >
            ตรวจคำตอบ
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full min-h-screen">
      <img
        src={bg}
        alt="Background"
        className={`w-full h-full object-cover fixed inset-0 ${
          showLogo ? "blur-lg" : ""
        }`}
      />
      {showLogo && (
        <div className="fixed inset-0 flex justify-center items-center z-50 animate-bounce p-4">
          <img
            src={logo}
            alt="Game Logo"
            className="max-w-full max-h-[70vh] object-contain"
          />
        </div>
      )}
      {!qModal && !showLogo && (
        <div className="fixed inset-x-0 bottom-0 flex justify-center">
          <img
            src={ghost}
            alt="Trigger"
            className="cursor-pointer object-contain w-24 md:w-auto"
            onClick={toggleQModal}
          />
        </div>
      )}
      {qModal && (
        <div className="fixed inset-0 flex justify-center items-center overflow-y-auto py-8">
          <div className="relative flex flex-col items-center justify-center w-full">
            {renderQuestionContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game5;
