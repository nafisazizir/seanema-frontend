import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import UserDataService from "../../services/user";
import TicketDataService from "../../services/ticket";
import MovieDataService from "../../services/movie";
import AgeRatingModal from "./AgeRatingModal";
import "./BookStyle.css";
import queryString from "query-string";
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

const Book = () => {
  const { movieId, showtimeId } = useParams();
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(true);
  const [availableSeats, setAvailableSeats] = useState<number[]>([]);
  const [movie, setMovie] = useState<Movie>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleNotAllowedUser = () => {
    navigate("/movies");
  };

  useEffect(() => {
    const checkAgeRating = async () => {
      try {
        const response = await UserDataService.checkAge(
          showtimeId ? parseInt(showtimeId) : 0
        );
        setIsAllowed(response.data.isAllowed === "true");
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    const fetchAvailableSeats = async () => {
      try {
        const response = await TicketDataService.getAvailableSeats(
          showtimeId ? parseInt(showtimeId) : 0
        );
        setAvailableSeats(response.data.availableSeats);
      } catch (error) {
        console.error("Failed to fetch available seats:", error);
      }
    };

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

    checkAgeRating();
    fetchAvailableSeats();
    fetchMovieDetails();
  }, []);

  useEffect(() => {
    setTotalPrice(movie ? movie?.ticket_price * selectedSeats.length : 0);
  }, [selectedSeats]);

  const handleSeatClick = (seat: number) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      if (selectedSeats.length < 6) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const renderSeats = () => {
    const seats = [];

    for (let seat = 1; seat <= 64; seat++) {
      const seatClassName = availableSeats.includes(seat)
        ? selectedSeats.includes(seat)
          ? "seat seat-selected"
          : "seat seat-available"
        : "seat seat-disabled";

      const seatDiv = (
        <div
          className={seatClassName}
          key={seat}
          onClick={
            seatClassName !== "seat seat-disabled"
              ? () => handleSeatClick(seat)
              : undefined
          }
        >
          <div className="paragraph-normal">{seat}</div>
        </div>
      );
      seats.push(seatDiv);
    }

    return seats;
  };

  const handleContinueClick = () => {
    navigate(
      `/movies/${movieId}/book/${showtimeId}/payment?${queryString.stringify({
        seatNumbers: selectedSeats,
      })}`
    );
  };

  return (
    <>
      <Navbar />
      <AgeRatingModal isOpen={!isAllowed} onClose={handleNotAllowedUser} />
      <div className="book-page">
        <div className="seat-legend paragraph-small">
          <div className="seat-legend-item">
            <div className="seat seat-disabled" />
            <div>Not Available</div>
          </div>
          <div className="seat-legend-item">
            <div className="seat seat-available" />
            <div>Available</div>
          </div>
          <div className="seat-legend-item">
            <div className="seat seat-selected" />
            <div>Your Choice</div>
          </div>
        </div>

        <h6>SCREEN</h6>
        <div className="seat-grid">{renderSeats()}</div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div className="warning-max-seat paragraph-small">
            Max. number of tickets are 6 per transaction
          </div>

          <div className="seat-summary-grid">
            <div className="total-price-container">
              <div className="paragraph-normal">TOTAL PRICE</div>
              <h6>Rp {totalPrice.toLocaleString()}</h6>
            </div>
            <div className="selected-seats-container">
              <div className="paragraph-normal">SELECTED SEATS</div>
              <h6>
                {selectedSeats.length > 0
                  ? selectedSeats.toString()
                  : "No seat selected"}
              </h6>
            </div>
          </div>
        </div>

        {selectedSeats.length > 0 && (
          <ButtonMedium buttonText="Continue" onClick={handleContinueClick} />
        )}
      </div>
    </>
  );
};

export default Book;
