import React, { useState, useEffect } from "react";
import "./MovieDetailsStyle.css";
import Navbar from "../../components/Navbar/Navbar";
import MovieDataService from "../../services/movie";
import ButtonMedium from "../../components/Button/ButtonMedium";

interface Movie extends Record<string, number | string | Date> {
  id: number;
  title: string;
  description: string;
  release_date: string;
  poster_url: string;
  age_rating: string;
  ticket_price: number;
}

const MovieDetails = () => {
  document.body.style.backgroundColor = "var(--color-white-100)";
  const [movie, setMovie] = useState<Movie>();
  const dateReadable = movie
    ? new Date(movie?.release_date).toDateString()
    : "";
  const formattedPrice = movie
    ? `Rp ${movie.ticket_price.toLocaleString()}`
    : "";

  useEffect(() => {
    // Fetch movie details from the API
    const fetchMovie = async () => {
      try {
        const response = await MovieDataService.getMovieDetails(6);
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovie();
  }, []);

  return (
    <>
      <Navbar />
      <div className="movie-details-page">
        <div
          className="poster-details"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${movie?.poster_url})`,
          }}
        />
        <div>
          <h4 className="title-details">{movie?.title}</h4>
          <div className="price-age-container-details">
            <h5 className="price-details">{formattedPrice}</h5>
            <div className="age-rating-details paragraph-normal">
              Rated for {movie?.age_rating}+
            </div>
          </div>
          <div className="headline-text description-details">
            {movie?.description}
          </div>
          <div className="paragraph-small released-details">Released at: {dateReadable}</div>
          <ButtonMedium
            buttonText="Buy Ticket"
            onClick={() => console.log("yeay")}
          />
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
