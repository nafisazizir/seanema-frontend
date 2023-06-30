import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "./HomeStyle.css";

const Home = () => {
  document.body.style.backgroundColor = "var(--color-white-100)";
  return (
    <>
      <Navbar />
      <div className="movies-page">
        <h2 className="hero-title">Now Playing in Seanema ⬇️</h2>
      </div>
    </>
  );
};

export default Home;
