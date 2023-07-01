import React from "react";
import "./MovieCardStyle.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="movie-card-container" onClick={handleClick}>
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
function useParams(): { course_code: any; curriculum: any; } {
  throw new Error("Function not implemented.");
}

