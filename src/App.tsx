import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/Auth/SignUp";
import LogIn from "./pages/Auth/LogIn";

function App() {
  const [color, changeColor] = useState("var(--color-primary-10)");
  document.body.style.backgroundColor = color;

  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
