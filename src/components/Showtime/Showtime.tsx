import React, { useState, useEffect } from "react";
import MovieDataService from "../../services/movie";
import { useNavigate } from "react-router-dom";
import "./ShowtimeStyle.css";

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
  const navigate = useNavigate();

  const handleShowtimeClick = ({ showtimeId }: { showtimeId: number }) => {
    navigate(`/movies/${id}/book/${showtimeId}`);
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
                        onClick={() =>
                          handleShowtimeClick({ showtimeId: show.id })
                        }
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
    </div>
  );
};

export default Showtime;
