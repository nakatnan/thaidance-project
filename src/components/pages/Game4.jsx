import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/game4/logo.png";
import bg from "../../assets/game4/bg.jpeg";
import swing from "../../assets/game4/swing.gif";
import modal from "../../assets/game4/modal.png";
import q1 from "../../assets/game4/q1/q1.png";
import q1_c1 from "../../assets/game4/q1/c1.png";
import q1_c2 from "../../assets/game4/q1/c2.png";
import q1_c3 from "../../assets/game4/q1/c3.png";
import q1_c4 from "../../assets/game4/q1/c4.png";
import q2 from "../../assets/game4/q2/q2.png";
import q2_c1 from "../../assets/game4/q2/c1.png";
import q2_c2 from "../../assets/game4/q2/c2.png";
import q2_c3 from "../../assets/game4/q2/c3.png";
import q2_c4 from "../../assets/game4/q2/c4.png";
import q3 from "../../assets/game4/q3/q3.png";
import q3_c1 from "../../assets/game4/q3/c1.png";
import q3_c2 from "../../assets/game4/q3/c2.png";
import q3_c3 from "../../assets/game4/q3/c3.png";
import q3_c4 from "../../assets/game4/q3/c4.png";
import q4 from "../../assets/game4/q4/q4.png";
import q4_c1 from "../../assets/game4/q4/c1.png";
import q4_c2 from "../../assets/game4/q4/c2.png";
import q4_c3 from "../../assets/game4/q4/c3.png";
import q4_c4 from "../../assets/game4/q4/c4.png";

const Game4 = () => {
  const navigate = useNavigate();
  const questions = [
    {
      question: q1,
      choices: [q1_c1, q1_c2, q1_c3, q1_c4],
      correctAnswer: [q1_c1],
    },
    {
      question: q2,
      choices: [q2_c1, q2_c2, q2_c3, q2_c4],
      correctAnswer: [q2_c3],
    },
    {
      question: q3,
      choices: [q3_c1, q3_c2, q3_c3, q3_c4],
      correctAnswer: [q3_c1],
    },
    {
      question: q4,
      choices: [q4_c1, q4_c2, q4_c3, q4_c4],
      correctAnswer: [q4_c2],
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
            ผ่านด่านที่สี่แล้วจ้า
          </h1>
          <button
            className="btn btn-secondary font-display text-lg md:text-xl"
            onClick={() => navigate("/game5")}
          >
            ไปเกมถัดไป
          </button>
        </div>
      );
    }

    return (
      <div className="px-4 w-full max-w-4xl mx-auto">
        <img
          src={currentQuestion.question}
          alt="Question"
          className="w-full max-w-[300px] md:max-w-[400px] mx-auto transition delay-150 duration-300 ease-in-out hover:scale-105 mb-6 md:mb-10"
        />
        <div
          className="grid gap-3 md:gap-6 mb-6 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${
              window.innerWidth < 768 ? 2 : 4
            }, minmax(0, 1fr))`,
          }}
        ></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-15">
          {currentQuestion.choices.map((choice, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={choice}
                alt={`Choice ${index + 1}`}
                className={`w-full max-w-[120px] md:max-w-[150px] h-auto aspect-[150/55] cursor-pointer transition delay-150 duration-300 ease-in-out hover:scale-105 ${
                  selectedChoices.includes(choice)
                    ? "border-4 md:border-6 border-green-500 rounded-full"
                    : ""
                }`}
                onClick={() => handleChoiceClick(choice)}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-center">
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
        <div className="fixed bottom-0 left-0 md:left-20">
          <img
            src={swing}
            alt="Trigger"
            className="cursor-pointer object-contain w-32 md:w-auto"
            onClick={toggleQModal}
          />
        </div>
      )}
      {qModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 p-4">
          <div className="relative flex flex-col items-center justify-center w-full">
            {renderQuestionContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game4;
