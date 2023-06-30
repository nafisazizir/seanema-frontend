import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import "./HomeStyle.css";
import MovieCard from "../components/MovieCard/MovieCard";
import MovieDataService from "../services/movie";

interface Movie {
  id: number;
  title: string;
  poster_url: string;
  age_rating: string;
}

const Home = () => {
  document.body.style.backgroundColor = "var(--color-white-100)";
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Fetch movies from the API
    const fetchMovies = async () => {
      try {
        const response = await MovieDataService.getAllMovies();
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <Navbar />
      <div className="movies-page">
        <h2 className="hero-title">Now Playing in Seanema ⬇️</h2>
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_url={movie.poster_url}
              age_rating={movie.age_rating}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
