import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Main.jsx";
import Rule from "./pages/Rule.jsx";
import Choose from "./pages/Choose.jsx";
import Start from "./pages/Start.jsx";
import Game1 from "./pages/Game1.jsx";
import Game2 from "./pages/Game2.jsx";
import Game3 from "./pages/Game3.jsx";
import Game4 from "./pages/Game4.jsx";
import Game5 from "./pages/Game5.jsx";
import Game6 from "./pages/Game6.jsx";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/rule" element={<Rule />} />
      <Route path="/choose" element={<Choose />} />
      <Route path="/start" element={<Start />} />
      <Route path="/game1" element={<Game1 />} />
      <Route path="/game2" element={<Game2 />} />
      <Route path="/game3" element={<Game3 />} />
      <Route path="/game4" element={<Game4 />} />
      <Route path="/game5" element={<Game5 />} />
      <Route path="/game6" element={<Game6 />} />
    </Routes>
  );
};

export default Router;
