import React, { useState, useEffect } from "react";
import "./TicketStyle.css";
import Navbar from "../../components/Navbar/Navbar";
import TicketCard from "../../components/TicketCard/TicketCard";
import TicketDataService from "../../services/ticket";

interface Ticket {
  id: number;
  seat_number: string;
  transaction_date: string;
  total_cost: number;
  status: string;
  user_id: number;
  showtime_id: number;
  showtime: Showtime;
}

interface Showtime {
  id: number;
  show_date: string;
  start_time: string;
  end_time: string;
  movie_id: number;
  movie: Movie;
}

interface Movie {
  id: number;
  title: string;
  description: string;
  release_date: string;
  poster_url: string;
  age_rating: string;
  ticket_price: number;
}

const Ticket = () => {
  const [tickets, setTickets] = useState<Ticket[]>();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await TicketDataService.getTicketHistory();
        setTickets(response.data);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    };

    fetchMovieDetails();
  }, []);

  return (
    <>
      <Navbar />
      <div className="ticket-page">
        <h3 className="ticket-title">🎟️ My Tickets </h3>
        <div className="tickets-container">
          {tickets?.map((ticket) => (
            <TicketCard
              id={ticket.id}
              posterUrl={ticket.showtime.movie.poster_url}
              title={ticket.showtime.movie.title}
              seatNumbers={ticket.seat_number}
              showDate={ticket.showtime.show_date}
              startTime={ticket.showtime.start_time}
              status={ticket.status}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Ticket;
