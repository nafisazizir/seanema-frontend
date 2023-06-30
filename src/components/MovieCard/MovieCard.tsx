import React from "react";
import "./MovieCardStyle.css";

interface MovieCardProps {
  id: number;
  title: string;
  age_rating: string;
  poster_url: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  age_rating,
  poster_url,
}) => {
  return (
    <div className="movie-card-container">
      <div
        className="poster"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${poster_url})`,
        }}
      ></div>
      <div>
        <h6 className="card-movie-title">{title}</h6>
        <div className="headline-text age-rating">{age_rating}+</div>
      </div>
    </div>
  );
};

export default MovieCard;
