import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import UserDataService from "../../services/user";
import TicketDataService from "../../services/ticket";
import MovieDataService from "../../services/movie";
import "./PaymentStyle.css";

interface Movie extends Record<string, number | string | Date> {
  id: number;
  title: string;
  description: string;
  release_date: string;
  poster_url: string;
  age_rating: string;
  ticket_price: number;
}

const Payment = () => {
  const { movieId, showtimeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const seatNumbersString = Array.from(searchParams.getAll("seatNumbers"));
  const seatNumbers = seatNumbersString ? seatNumbersString.map(Number) : [];
  const [movie, setMovie] = useState<Movie>();
  const [showtime, setShowtime] = useState();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await MovieDataService.getMovieDetails(
          movieId ? parseInt(movieId) : 0
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch available seats:", error);
      }
    };
    
    fetchMovieDetails();
  }, []);

  return (
    <>
      <Navbar />
      <div className="payment-page"></div>
    </>
  );
};

export default Payment;
