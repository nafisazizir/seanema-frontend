import React, { useState, useEffect } from "react";
import MovieDataService from "../../services/movie";
import "./ShowtimeStyle.css";
import SelectTicket from "./SelectTicket";

interface SHowtimeProps {
  id: number;
}

interface ShowtimesByDate {
  [date: string]: Showtime[];
}

interface Showtime {
  id: number;
  show_date: string;
  start_time: string;
  end_time: string;
  movie_id: number;
}

const Showtime: React.FC<SHowtimeProps> = ({ id }) => {
  const [showtime, setShowtime] = useState<ShowtimesByDate>({});
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await MovieDataService.getShowtimes(id);
        setShowtime(response.data);
      } catch (error) {
        console.error("Failed to fetch showtimes:", error);
      }
    };

    fetchMovie();
  }, []);

  return (
    <div className="shotime-section" id="showtimes">
      <h5 className="ticket-showtime-title">Tickets</h5>
      <div className="line"></div>
      <div className="showtime-container">
        {Object.keys(showtime).map((date) => {
          const shows = showtime[date];
          const dateReadable = new Date(date).toDateString();
          return (
            <div className="showdate-container">
              <div className="headline-text">{dateReadable}</div>
              <div className="showtime-item-container">
                {shows.map((show) => {
                  return (
                    <>
                      <div
                        className="showtime-item headline-text"
                        onClick={handleOpenModal}
                      >
                        {show.start_time.slice(0, 5)}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <SelectTicket isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Showtime;
