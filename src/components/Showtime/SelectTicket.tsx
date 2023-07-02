import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectTicketStyle.css";
import Modal from "react-modal";
import ButtonSmall from "../Button/ButtonSmall";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface SelectTicketProps {
  isOpen: boolean;
  onClose: () => void;
  showtimeId: number;
}
const SelectTicket: React.FC<SelectTicketProps> = ({
  isOpen,
  onClose,
  showtimeId,
}) => {
  const [ticketCount, setTicketCount] = useState(0);
  const navigate = useNavigate();

  // Function to handle incrementing the ticket count
  const incrementTicketCount = () => {
    if (ticketCount < 6) {
      setTicketCount(ticketCount + 1);
    }
  };

  // Function to handle decrementing the ticket count
  const decrementTicketCount = () => {
    if (ticketCount > 0) {
      setTicketCount(ticketCount - 1);
    }
  };

  // Function to handle submitting the ticket count and closing the modal
  const handleSubmit = () => {
    if (ticketCount > 0) {
      navigate(`/movies/book/${showtimeId}?amount=${ticketCount}`);
      onClose();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="ticket-modal"
      overlayClassName="ticket-modal-overlay"
    >
      <h6>Select Tickets</h6>
      <div className="ticket-counter">
        <div
          onClick={decrementTicketCount}
          className={ticketCount > 0 ? "counter-icon" : "disable"}
        >
          <AiOutlineMinus />
        </div>
        <h2>{ticketCount}</h2>
        <div
          onClick={incrementTicketCount}
          className={ticketCount < 6 ? "counter-icon" : "disable"}
        >
          <AiOutlinePlus />
        </div>
      </div>
      <div className="select-ticket-button-container">
        <ButtonSmall buttonText="Cancel" onClick={handleSubmit} />
        <ButtonSmall buttonText="Continue" onClick={handleSubmit} />
      </div>
    </Modal>
  );
};

export default SelectTicket;
