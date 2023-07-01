import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/Auth/SignUp";
import LogIn from "./pages/Auth/LogIn";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

function App() {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetails />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
