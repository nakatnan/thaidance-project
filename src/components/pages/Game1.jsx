import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/game1/logo.PNG";
import bg from "../../assets/game1/bg.png";
import ss from "../../assets/game1/ss.gif";
import modal from "../../assets/game1/modal.png";
import q1 from "../../assets/game1/q1/q1.png";
import q1_c1 from "../../assets/game1/q1/q1_c1.png";
import q1_c2 from "../../assets/game1/q1/q1_c2.png";
import q1_c3 from "../../assets/game1/q1/q1_c3.png";
import q1_c4 from "../../assets/game1/q1/q1_c4.png";
import q1_c5 from "../../assets/game1/q1/q1_c5.png";
import q1_c6 from "../../assets/game1/q1/q1_c6.png";
import q1_c7 from "../../assets/game1/q1/q1_c7.png";
import q1_c8 from "../../assets/game1/q1/q1_c8.png";

function Game1() {
  const navigate = useNavigate();
  const questions = [
    {
      question: q1,
      choices: [q1_c1, q1_c2, q1_c3, q1_c4, q1_c5, q1_c6, q1_c7, q1_c8],
      correctAnswer: [q1_c1, q1_c6, q1_c3, q1_c4],
    },
  ];
  const [showLogo, setLogo] = useState(true);
  const [qModal, setQModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [questionScores, setQuestionScores] = useState([0, 0]);
  const [totalScore, setTotalScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogo(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleQModal = () => {
    setQModal(!qModal);
  };

  const handleChoiceClick = (choice) => {
    const currentQuestion = questions[currentQuestionIndex];
    const maxSelections = currentQuestion.correctAnswer.length;

    if (selectedChoices.includes(choice)) {
      setSelectedChoices(selectedChoices.filter((c) => c !== choice));
    } else if (selectedChoices.length < maxSelections) {
      setSelectedChoices([...selectedChoices, choice]);
    }
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

    const newQuestionScores = [...questionScores];
    if (isCompletelyCorrect) {
      newQuestionScores[currentQuestionIndex] = 1;
      setTotalScore((prevScore) => prevScore + 1);
    }

    setQuestionScores(newQuestionScores);

    if (isCompletelyCorrect && currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedChoices([]);
        setCorrectAnswersCount(0);
      }, 500);
    }
  };

  const goToNextPage = () => navigate("/game2");

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <div className="relative w-full h-screen">
        <img
          src={bg}
          alt="Background"
          className={`w-full h-full object-cover ${showLogo ? "blur-lg" : ""}`}
        />
        {showLogo && (
          <div className="absolute inset-0 flex justify-center items-center z-50 animate-bounce ">
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
              src={ss}
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
                {totalScore !== questions.length ? (
                  <>
                    <img
                      src={currentQuestion.question}
                      alt="Question"
                      className="w-[500px] transition delay-150 duration-300 ease-in-out hover:scale-120 mb-10"
                    />
                    <div
                      className="grid gap-6 mb-10"
                      style={{
                        gridTemplateColumns: `repeat(${
                          currentQuestion.choices.length <= 4
                            ? 2
                            : Math.ceil(currentQuestion.choices.length / 2)
                        }, minmax(0, 1fr))`,
                      }}
                    >
                      {currentQuestion.choices.map((choice, index) => (
                        <img
                          key={index}
                          src={choice}
                          alt={`Choice ${index + 1}`}
                          className={`relative w-[150px] h-[50px] cursor-pointer transition delay-150 duration-300 ease-in-out hover:scale-105 ${
                            selectedChoices.includes(choice)
                              ? "border-5 border-green-500 rounded-full"
                              : ""
                          }`}
                          onClick={() => handleChoiceClick(choice)}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-6 justify-center">
                      <div className="flex gap-2 "></div>
                      <h1 className="text-3xl font-medium font-display">
                        ข้อที่ถูก: {correctAnswersCount}
                      </h1>
                      <button
                        className="btn btn-primary font-display text-xl"
                        onClick={checkAnswers}
                        disabled={selectedChoices.length === 0}
                      >
                        ตรวจคำตอบ
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="text-5xl font-semibold font-display mb-10">
                      ผ่านด่านแรกแล้วจ้า
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

export default Game1;
