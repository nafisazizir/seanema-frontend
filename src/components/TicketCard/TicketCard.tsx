import React from "react";
import "./TicketCardStyle.css";
import { BsFillTicketPerforatedFill } from "react-icons/bs";

interface TicketCardProps {
  id: number;
  posterUrl: string;
  title: string;
  seatNumbers: string;
  showDate: string;
  startTime: string;
  status: string;
}

const TicketCard: React.FC<TicketCardProps> = ({
  id,
  posterUrl,
  title,
  seatNumbers,
  showDate,
  startTime,
  status,
}) => {
  return (
    <div>
      <div className="ticket-card-grid">
        <div
          className="payment-poster-details"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${posterUrl})`,
          }}
        />
        <div className="ticket-card-details">
          <h6>{title}</h6>
          <div className="seat-numbers-ticket">
            <BsFillTicketPerforatedFill className="icon-ticket" />
            <div className="paragraph-normal">{seatNumbers}</div>
          </div>
          <div className="paragraph-normal">
            {new Date(showDate).toDateString()}, {startTime.slice(0, 5)}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "start",
              gap: "8px",
            }}
          >
            <div className="paragraph-small tag-id">#{id}</div>
            <div
              className={
                status == "not paid"
                  ? "paragraph-small tag-warning"
                  : status == "paid"
                  ? "paragraph-small tag-success"
                  : "paragraph-small tag-danger"
              }
            >
              {status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
