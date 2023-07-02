import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";
import SignUp from "./pages/Auth/SignUp";
import LogIn from "./pages/Auth/LogIn";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Balance from "./pages/Balance/Balance";
import Book from "./pages/Book/Book";
import Payment from "./pages/Payment/Payment";

function App() {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/movies/:movieId/book/:showtimeId" element={<Book />} />
          <Route
            path="/movies/:movieId/book/:showtimeId/payment"
            element={<Payment />}
          />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />

          <Route
            path="/balance"
            element={useAuth() == true ? <Balance /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
