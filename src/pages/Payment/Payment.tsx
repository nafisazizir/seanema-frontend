import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import UserDataService from "../../services/user";
import TicketDataService from "../../services/ticket";
import MovieDataService from "../../services/movie";
import "./PaymentStyle.css";
import ButtonMedium from "../../components/Button/ButtonMedium";
import { CgDanger } from "react-icons/cg";

interface Movie extends Record<string, number | string | Date> {
  id: number;
  title: string;
  description: string;
  release_date: string;
  poster_url: string;
  age_rating: string;
  ticket_price: number;
}

interface Showtime {
  id: number;
  show_date: string;
  start_time: string;
  end_time: string;
  movie_id: number;
}

interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  age: number;
  balance: number;
}

const Payment = () => {
  const { movieId, showtimeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const seatNumbersString = Array.from(searchParams.getAll("seatNumbers"));
  const seatNumbers = seatNumbersString ? seatNumbersString.map(Number) : [];
  const [movie, setMovie] = useState<Movie>();
  const [showtime, setShowtime] = useState<Showtime>();
  const [user, setUser] = useState<User>();
  const [isBalanceEnough, setIsBalanceEnough] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await MovieDataService.getMovieDetails(
          movieId ? parseInt(movieId) : 0
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    const fetchShowtimeDetails = async () => {
      try {
        const response = await MovieDataService.getShowtimeDetails(
          showtimeId ? parseInt(showtimeId) : 0
        );
        setShowtime(response.data);
      } catch (error) {
        console.error("Failed to fetch showtime details", error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await UserDataService.getBalance();
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user's balance:", error);
      }
    };

    fetchMovieDetails();
    fetchShowtimeDetails();
    fetchUser();
  }, []);

  useEffect(() => {
    setIsBalanceEnough(user ? user?.balance >= totalPrice : false);
  }, [user, movie]);

  const totalPrice = movie ? movie?.ticket_price * seatNumbers.length : 0;

  return (
    <>
      <Navbar />
      <div className="payment-page">
        <div className="payment-movie-details">
          <div
            className="payment-poster-details"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${movie?.poster_url})`,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "space-evenly",
            }}
          >
            <h4>{movie?.title}</h4>
            <div className="headline-text">
              {showtime ? new Date(showtime.show_date).toDateString() : ""},{" "}
              {showtime ? showtime.start_time.slice(0, 5) : ""}
            </div>
          </div>
        </div>

        <div className="line" />

        <div className="transaction-details-payment">
          <h6>Transaction Details</h6>
          <div className="row-payment">
            <div className="paragraph-normal">{seatNumbers.length} TICKET</div>
            <div className="paragraph-normal selected-seats">
              {seatNumbers.toString()}
            </div>
          </div>
          <div className="row-payment">
            <div className="paragraph-normal">REGULAR SEAT</div>
            <div className="paragraph-normal selected-seats">
              Rp {movie?.ticket_price.toLocaleString()} x {seatNumbers.length}
            </div>
          </div>
          <div className="row-payment">
            <div className="paragraph-normal">SERVICE FEE</div>
            <div className="paragraph-normal selected-seats">Rp 0</div>
          </div>
          <div className="row-total-price">
            <div className="paragraph-normal">TOTAL PRICE</div>
            <h6>Rp {totalPrice.toLocaleString()}</h6>
          </div>
        </div>

        <div className="line" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div className="my-balance-row">
            <div className="paragraph-normal">MY BALANCE</div>
            <div className="paragraph-normal selected-seats">
              Rp {user?.balance.toLocaleString()}
            </div>
          </div>

          {false ? (
            <ButtonMedium
              buttonText="Pay Now"
              onClick={() => console.log("yeay")}
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div className="paragraph-small color-danger message-payment">
                <CgDanger size={36} />
                Your balance is not sufficient, please top-up and you can come
                back to My Tickets to complete the payment
              </div>
              <div className="cancel-topup-button">
                <ButtonMedium
                  buttonText="Cancel"
                  onClick={() => console.log("yeay")}
                />
                <ButtonMedium
                  buttonText="Top Up"
                  onClick={() => console.log("yeay")}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
