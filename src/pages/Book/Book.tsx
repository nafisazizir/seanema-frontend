import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import UserDataService from "../../services/user";
import TicketDataService from "../../services/ticket";
import AgeRatingModal from "./AgeRatingModal";
import "./BookStyle.css";

const Book = () => {
  const { showtimeId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let amount = searchParams.get("amount");
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(true);
  const [availableSeats, setAvailableSeats] = useState<number[]>([]);

  const handleNotAllowedUser = () => {
    navigate("/movies");
  };

  useEffect(() => {
    if (amount && parseInt(amount) > 6) {
      navigate("/movies");
    }

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

    checkAgeRating();
    fetchAvailableSeats();
  }, []);

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatClick = (seat: number) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      setSelectedSeats([...selectedSeats, seat]);
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

  console.log(selectedSeats);

  return (
    <>
      <Navbar />
      <AgeRatingModal isOpen={!isAllowed} onClose={handleNotAllowedUser} />
      <div className="page-template">
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

        <div className="seat-grid">{renderSeats()}</div>

        <div className="seat-summary-grid">
          <div className="total-price-container">TOTAL PRICE</div>
          <div className="selected-seats-container">SELECTED SEATS</div>
        </div>
      </div>
    </>
  );
};

export default Book;
