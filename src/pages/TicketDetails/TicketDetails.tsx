import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import UserDataService from "../../services/user";
import TicketDataService from "../../services/ticket";
import MovieDataService from "../../services/movie";
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

interface Ticket {
  id: number;
  user_id: number;
  showtime_id: number;
  seat_number: string;
  transaction_date: string;
  total_cost: number;
  status: string;
}

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie>();
  const [showtime, setShowtime] = useState<Showtime>();
  const [user, setUser] = useState<User>();
  const [ticket, setTicket] = useState<Ticket>();
  const seatNumbers = ticket ? ticket?.seat_number.split(",").map(Number) : [];
  const [isBalanceEnough, setIsBalanceEnough] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await MovieDataService.getMovieDetails(
          showtime ? showtime.movie_id : 0
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    const fetchShowtimeDetails = async () => {
      try {
        const response = await MovieDataService.getShowtimeDetails(
          ticket ? ticket.showtime_id : 0
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

    const fetchTicket = async () => {
      try {
        const response = await TicketDataService.getTicketDetails(
          id ? parseInt(id) : 0
        );
        setTicket(response.data);
      } catch (error) {
        console.error("Failed to fetch ticket details:", error);
      }
    };

    fetchUser();
    fetchTicket();
    if (ticket) {
      fetchShowtimeDetails();
    }
    if (showtime) {
      fetchMovieDetails();
    }
  }, [ticket, showtime]);

  useEffect(() => {
    setIsBalanceEnough(
      user && ticket ? user?.balance >= ticket.total_cost : false
    );
  }, [user, movie]);

  const handlePayNow = () => {
    const updatePayment = async () => {
      try {
        const response = await TicketDataService.updatePayment(
          id ? parseInt(id) : 0
        );
        navigate("/tickets");
      } catch (error) {
        console.error("Failed to complete payment:", error);
      }
    };
    updatePayment();
  };

  const handleCancel = () => {
    const cancelPayment = async () => {
      try {
        const response = await TicketDataService.cancelPayment(
          id ? parseInt(id) : 0
        );
        navigate("/tickets");
      } catch (error) {
        console.error("Failed to complete payment:", error);
      }
    };
    cancelPayment();
  };

  const renderPaid = () => {
    return <ButtonMedium buttonText="Cancel" onClick={handleCancel} />;
  };

  const renderNotPaid = () => {
    return (
      <>
        <div className="my-balance-row">
          <div className="paragraph-normal">MY BALANCE</div>
          <div className="paragraph-normal selected-seats">
            Rp {user?.balance.toLocaleString()}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {!isBalanceEnough ? (
            <div className="paragraph-small color-danger message-payment">
              <CgDanger size={36} />
              Your balance is not sufficient, please top-up and you can come
              back to My Tickets to complete the payment
            </div>
          ) : null}

          <div className="cancel-topup-button">
            <ButtonMedium buttonText="Cancel" onClick={handleCancel} />
            {isBalanceEnough ? (
              <ButtonMedium buttonText="Pay Now" onClick={handlePayNow} />
            ) : (
              <ButtonMedium
                buttonText="Top Up"
                onClick={() => navigate("/balance")}
              />
            )}
          </div>
        </div>
      </>
    );
  };

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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
                justifyContent: "start",
                gap: "8px",
              }}
            >
              <div className="paragraph-small tag-id">#{ticket?.id}</div>
              <div
                className={
                  ticket?.status == "not paid"
                    ? "paragraph-small tag-warning"
                    : ticket?.status == "paid"
                    ? "paragraph-small tag-success"
                    : "paragraph-small tag-danger"
                }
              >
                {ticket?.status}
              </div>
            </div>
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
            <h6>Rp {ticket?.total_cost.toLocaleString()}</h6>
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
          {ticket?.status == "paid"
            ? renderPaid()
            : ticket?.status == "not paid"
            ? renderNotPaid()
            : null}
        </div>
      </div>
    </>
  );
};

export default TicketDetails;
