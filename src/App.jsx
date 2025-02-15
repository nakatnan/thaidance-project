import React from "react";
import Main from "./components/Main";
import Router from "./components/Routes.jsx";
import { ScoreProvider } from "./components/ScoreContext.jsx";
const App = () => {
  return (
    <ScoreProvider>
      <div>
        <Router />
      </div>
    </ScoreProvider>
  );
};

export default App;
