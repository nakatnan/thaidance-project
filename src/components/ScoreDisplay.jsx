import React from "react";
import { useScore } from "./ScoreContext";

const ScoreDisplay = () => {
  const { scores } = useScore();

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/60 rounded-lg p-4 text-white font-display">
      <h3 className="text-lg font-semibold mb-2">คะแนนสะสม</h3>
      <div className="space-y-1">
        {Object.entries(scores).map(([game, score]) => (
          <div key={game} className="flex justify-between gap-4">
            <span>เกมที่ {game.replace("game", "")}</span>
            <span>{score} คะแนน</span>
          </div>
        ))}
        <div className="border-t border-white/30 mt-2 pt-2">
          <div className="flex justify-between font-semibold">
            <span>รวม</span>
            <span>
              {Object.values(scores).reduce((a, b) => a + b, 0)} คะแนน
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
