import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import UserDataService from "../../services/user";
import AgeRatingModal from "./AgeRatingModal";
import "./BookStyle.css";

const Book = () => {
  const { showtimeId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let amount = searchParams.get("amount");
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(true);

  const handleNotAllowedUser = () => {
    navigate("/movies");
  };

  useEffect(() => {
    if (amount && parseInt(amount) > 6) {
      navigate("/movies");
    }

    const fetchMovie = async () => {
      try {
        const response = await UserDataService.checkAge(
          showtimeId ? parseInt(showtimeId) : 0
        );
        setIsAllowed(response.data.isAllowed === "true");
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovie();
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
      const seatDiv = (
        <div className="seat seat-available">
          <div className="paragraph-normal">{seat}</div>
        </div>
      );
      seats.push(seatDiv);
    }

    return seats;
  };

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
      </div>
    </>
  );
};

export default Book;
