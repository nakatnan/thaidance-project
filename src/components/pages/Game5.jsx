import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";

import bg from "../../assets/game5/bg.PNG";
import ghost from "../../assets/game5/ghost.gif";
import logo from "../../assets/game5/logo.png";

import q1_c1 from "../../assets/game5/q1/q1_c1.png";
import q1_c2 from "../../assets/game5/q1/q1_c2.png";
import q1_c3 from "../../assets/game5/q1/q1_c3.png";
import q1_c4 from "../../assets/game5/q1/q1_c4.png";
import q2_c1 from "../../assets/game5/q2/q2_c1.png";
import q2_c2 from "../../assets/game5/q2/q2_c2.png";
import q2_c3 from "../../assets/game5/q2/q2_c3.png";
import q2_c4 from "../../assets/game5/q2/q2_c4.png";
import q3_c1 from "../../assets/game5/q3/q3_c1.png";
import q3_c2 from "../../assets/game5/q3/q3_c2.png";
import q3_c3 from "../../assets/game5/q3/q3_c3.png";
import q3_c4 from "../../assets/game5/q3/q3_c4.png";
import q4_c1 from "../../assets/game5/q4/q4_c1.png";
import q4_c2 from "../../assets/game5/q4/q4_c2.png";
import q4_c3 from "../../assets/game5/q4/q4_c3.png";
import q4_c4 from "../../assets/game5/q4/q4_c4.png";
import q5_c1 from "../../assets/game5/q5/q5_c1.png";
import q5_c2 from "../../assets/game5/q5/q5_c2.png";
import q5_c3 from "../../assets/game5/q5/q5_c3.png";
import q5_c4 from "../../assets/game5/q5/q5_c4.png";

const questions = [
  {
    id: 1,
    frameLeft: "ละครร้อง",
    frameRight: "ละครพูด",
    images: [
      { id: 1, src: q1_c1, frame: "left" },
      { id: 2, src: q1_c2, frame: "left" },
      { id: 3, src: q1_c3, frame: "right" },
      { id: 4, src: q1_c4, frame: "right" },
    ],
  },
  {
    id: 2,
    frameLeft: "ละครสังคีต",
    frameRight: "ละครหลวงวิจิตรวาทการ",
    images: [
      { id: 5, src: q2_c1, frame: "right" },
      { id: 6, src: q2_c2, frame: "left" },
      { id: 7, src: q2_c3, frame: "left" },
      { id: 8, src: q2_c4, frame: "right" },
    ],
  },
  {
    id: 3,
    frameLeft: "ละครร้อง",
    frameRight: "ละครสังคีต",
    images: [
      { id: 9, src: q3_c1, frame: "left" },
      { id: 10, src: q3_c2, frame: "left" },
      { id: 11, src: q3_c3, frame: "right" },
      { id: 12, src: q3_c4, frame: "right" },
    ],
  },
  {
    id: 4,
    frameLeft: "ละครพูด",
    frameRight: "ละครหลวงวิจิตรวาทการ",
    images: [
      { id: 13, src: q4_c1, frame: "left" },
      { id: 14, src: q4_c2, frame: "left" },
      { id: 15, src: q4_c3, frame: "right" },
      { id: 16, src: q4_c4, frame: "right" },
    ],
  },
  {
    id: 5,
    frameLeft: "ละครสังคีต",
    frameRight: "ละครพูด",
    images: [
      { id: 17, src: q5_c1, frame: "left" },
      { id: 18, src: q5_c2, frame: "right" },
      { id: 19, src: q5_c3, frame: "left" },
      { id: 20, src: q5_c4, frame: "right" },
    ],
  },
];

const DraggableImage = ({ id, src, correctFrame }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id, src, correctFrame },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={src}
      alt={`Image ${id}`}
      className={`w-80 max-w-[300px] h-25 mx-auto transition delay-150 duration-300 ease-in-out hover:scale-105 mb-4 md:mb-10 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    />
  );
};

const DropFrame = ({ frame, images, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => onDrop(item, frame),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-full md:w-150 min-h-[200px] border-4 border-dashed p-4 md:p-6 rounded-lg shadow-md flex flex-wrap gap-2 ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      {images.map((img) => (
        <img
          key={img.id}
          src={img.src}
          alt={`Placed ${img.id}`}
          className="w-60 h-20 object-contain"
        />
      ))}
    </div>
  );
};

const Game5 = () => {
  const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(true);
  const [qModal, setQModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [leftFrame, setLeftFrame] = useState([]);
  const [rightFrame, setRightFrame] = useState([]);
  const [placedImages, setPlacedImages] = useState(new Set());
  const [buttonState, setButtonState] = useState("");
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleQModal = () => setQModal(!qModal);

  const availableImages = questions[currentQuestion].images.filter(
    (img) => !placedImages.has(img.id)
  );

  const handleDrop = (item, targetFrame) => {
    if (placedImages.has(item.id)) return;

    setPlacedImages((prev) => new Set(prev).add(item.id));

    if (targetFrame === "left") {
      setLeftFrame((prev) => [...prev, item]);
    } else {
      setRightFrame((prev) => [...prev, item]);
    }
  };

  const checkAnswer = () => {
    const allImagesPlaced =
      leftFrame.length + rightFrame.length ===
      questions[currentQuestion].images.length;

    if (!allImagesPlaced) {
      setIsWrongAnswer(true);
      setTimeout(() => setIsWrongAnswer(false), 2000);
      return;
    }

    const isCorrect =
      leftFrame.every(
        (img) =>
          questions[currentQuestion].images.find((q) => q.id === img.id)
            ?.frame === "left"
      ) &&
      rightFrame.every(
        (img) =>
          questions[currentQuestion].images.find((q) => q.id === img.id)
            ?.frame === "right"
      );

    if (isCorrect) {
      setButtonState("correct");
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
          resetQuestion();
          setButtonState("");
        } else {
          setIsGameComplete(true);
        }
      }, 2000);
    } else {
      setButtonState("wrong");
      setTimeout(() => setButtonState(""), 2000);
    }
  };

  const resetQuestion = () => {
    setLeftFrame([]);
    setRightFrame([]);
    setPlacedImages(new Set());
  };

  const renderGameContent = () => {
    if (isGameComplete) {
      return (
        <div className="flex flex-col justify-center items-center text-center px-4 mt-50">
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
      <DndProvider backend={HTML5Backend}>
        <div className="px-4 w-full max-w-7xl mx-auto text-center mt-10">
          <h1 className="text-2xl md:text-4xl font-semibold font-display mb-8">
            จงแยกประเภทคำตอบต่อไปนี้ให้ถูกต้อง
          </h1>
          <h1 className="text-2xl md:text-2xl font-semibold font-display mb-8">
            ข้อที่: {currentQuestion + 1}
          </h1>

          <div className="mb-8">
            <div className="flex gap-4 flex-wrap justify-center">
              {availableImages.map((img) => (
                <DraggableImage key={img.id} {...img} />
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8 mb-8">
            <div className="text-center">
              <h3 className="mb-2 font-display text-2xl">
                {questions[currentQuestion].frameLeft}
              </h3>
              <DropFrame frame="left" images={leftFrame} onDrop={handleDrop} />
            </div>
            <div className="text-center">
              <h3 className="mb-2 font-display text-2xl">
                {questions[currentQuestion].frameRight}
              </h3>
              <DropFrame
                frame="right"
                images={rightFrame}
                onDrop={handleDrop}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={checkAnswer}
              className={`btn btn-primary font-display text-lg md:text-xl w-auto md:w-auto ${
                buttonState === "correct"
                  ? "bg-green-500 hover:bg-green-600 border-green-500"
                  : buttonState === "wrong"
                  ? "bg-red-500 hover:bg-red-600 border-red-500"
                  : "btn-primary"
              }`}
            >
              ตรวจคำตอบ
            </button>
            <button
              onClick={resetQuestion}
              className="btn btn-neutral font-display text-lg md:text-xl w-auto md:w-auto"
            >
              รีเซ็ต
            </button>
          </div>
        </div>
      </DndProvider>
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
        <div className="flex justify-center items-center overflow-y-auto py-8 bg-opacity-50">
          <div className="relative flex flex-col items-center justify-center w-full rounded-lg p-4">
            {renderGameContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game5;
