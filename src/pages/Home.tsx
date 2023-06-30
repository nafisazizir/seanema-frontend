import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "./HomeStyle.css";
import MovieCard from "../components/MovieCard/MovieCard";

const Home = () => {
  document.body.style.backgroundColor = "var(--color-white-100)";
  return (
    <>
      <Navbar />
      <div className="movies-page">
        <h2 className="hero-title">Now Playing in Seanema ⬇️</h2>
        <MovieCard
          id="1"
          title="Fast X"
          poster_url="https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg"
          age_rating="15"
        />
      </div>
    </>
  );
};

export default Home;
