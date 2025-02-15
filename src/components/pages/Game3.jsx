import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useScore } from "../ScoreContext";
import ScoreDisplay from "../ScoreDisplay";
import logo from "../../assets/game3/logo.png";
import bg from "../../assets/game3/bg.jpeg";
import hand from "../../assets/game3/hand.gif";
import modalTrigger from "../../assets/game3/modelTrigger.gif";
import modal from "../../assets/game3/modal.png";
import q1 from "../../assets/game3/q1/q1.png";
import q1_c1 from "../../assets/game3/q1/c1.png";
import q1_c2 from "../../assets/game3/q1/c2.png";
import q1_c3 from "../../assets/game3/q1/c3.png";
import q1_c4 from "../../assets/game3/q1/c4.png";
import q1_c5 from "../../assets/game3/q1/c5.png";
import q1_c6 from "../../assets/game3/q1/c6.png";
import q1_c7 from "../../assets/game3/q1/c7.png";
import q1_c8 from "../../assets/game3/q1/c8.png";
import q2 from "../../assets/game3/q2/q2.png";
import q2_c1 from "../../assets/game3/q2/c1.png";
import q2_c2 from "../../assets/game3/q2/c2.png";
import q2_c3 from "../../assets/game3/q2/c3.png";
import q2_c4 from "../../assets/game3/q2/c4.png";
import q2_c5 from "../../assets/game3/q2/c5.png";
import q2_c6 from "../../assets/game3/q2/c6.png";
import q2_c7 from "../../assets/game3/q2/c7.png";
import q2_c8 from "../../assets/game3/q2/c8.png";
import q3 from "../../assets/game3/q3/q3.png";
import q3_c1 from "../../assets/game3/q3/c1.png";
import q3_c2 from "../../assets/game3/q3/c2.png";
import q3_c3 from "../../assets/game3/q3/c3.png";
import q3_c4 from "../../assets/game3/q3/c4.png";
import q3_c5 from "../../assets/game3/q3/c5.png";
import q3_c6 from "../../assets/game3/q3/c6.png";
import q4 from "../../assets/game3/q4/q4.png";
import q4_c1 from "../../assets/game3/q4/c1.png";
import q4_c2 from "../../assets/game3/q4/c2.png";
import q4_c3 from "../../assets/game3/q4/c3.png";
import q4_c4 from "../../assets/game3/q4/c4.png";
import q4_c5 from "../../assets/game3/q4/c5.png";
import q4_c6 from "../../assets/game3/q4/c6.png";

function Game3() {
  const { updateScore } = useScore();
  const navigate = useNavigate();
  const questions = [
    {
      question: q1,
      choices: [q1_c1, q1_c2, q1_c3, q1_c4, q1_c5, q1_c6, q1_c7, q1_c8],
      correctAnswer: [q1_c2, q1_c3, q1_c4],
    },
    {
      question: q2,
      choices: [q2_c3, q2_c2, q2_c4, q2_c7, q2_c6, q2_c1, q2_c8, q2_c5],
      correctAnswer: [q2_c1, q2_c2, q2_c3],
    },
    {
      question: q3,
      choices: [q3_c1, q3_c2, q3_c3, q3_c4, q3_c5, q3_c6],
      correctAnswer: [q3_c4],
    },
    {
      question: q4,
      choices: [q4_c1, q4_c2, q4_c3, q4_c4, q4_c5, q4_c6],
      correctAnswer: [q4_c6],
    },
  ];
  const [showLogo, setLogo] = useState(true);
  const [qModal, setQModal] = useState(false);
  const [isModalOpening, setIsModalOpening] = useState(false);
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
    setIsModalOpening(true);

    setTimeout(() => {
      setQModal(true);
      setIsModalOpening(false);
    }, 1000);
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

    if (isCompletelyCorrect) {
      setTotalScore((prevScore) => {
        const newScore = prevScore + 1;
        updateScore("game3", newScore); // Update global score
        return newScore;
      });

      setQuestionScores((prevScores) => {
        const newScores = [...prevScores];
        newScores[currentQuestionIndex] = 1;
        return newScores;
      });

      // Move to next question after a delay
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setSelectedChoices([]); // Reset choices for the new question
          setCorrectAnswersCount(0);
        }
      }, 500);
    }
  };

  const goToNextPage = () => navigate("/game4");

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <ScoreDisplay />
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
        {!qModal && !isModalOpening && !showLogo && (
          <div className="absolute inset-0 flex justify-center">
            <img
              src={hand}
              alt="Trigger"
              className="cursor-pointer object-contain"
              onClick={toggleQModal}
            />
          </div>
        )}
        {isModalOpening && (
          <div className="absolute inset-0 flex justify-center">
            <img
              src={modalTrigger}
              alt="Modal Trigger"
              className="cursor-pointer"
            />
          </div>
        )}
        {qModal && (
          <div className="absolute inset-0 flex justify-center items-center bg-black/60">
            <div className="relative">
              <img src={modal} alt="Modal" className="w-[900px] -mt-70" />
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
                          className={`relative w-[130px] h-[50px] cursor-pointer transition delay-150 duration-300 ease-in-out hover:scale-105 ${
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
                    <h1 className="text-5xl font-bold font-display mb-10">
                      ตอบถูก {totalScore} ข้อ
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

export default Game3;
