import React, { useState } from "react";
import "./SelectTicketStyle.css";
import Modal from "react-modal";
import ButtonSmall from "../Button/ButtonSmall";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface SelectTicketProps {
  isOpen: boolean;
  onClose: () => void;
}
const SelectTicket: React.FC<SelectTicketProps> = ({ isOpen, onClose }) => {
  const [ticketCount, setTicketCount] = useState(0);

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
    // Do something with the selected ticket count
    console.log("Selected ticket count:", ticketCount);

    // Close the modal
    onClose();
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
