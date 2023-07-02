import React from "react";
import Modal from "react-modal";
import ButtonSmall from "../../components/Button/ButtonSmall";
import "./AgeRatingModalStyle.css";
import { MdDangerous } from "react-icons/md";

interface AgeRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AgeRatingModal: React.FC<AgeRatingModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="age-rating-modal"
      overlayClassName="age-rating-modal-overlay"
    >
      <MdDangerous className="age-rating-icon" />
      <h6>Sorry, you are not allowed to watch this movie.</h6>
      <ButtonSmall buttonText="Go Back" onClick={onClose} />
    </Modal>
  );
};

export default AgeRatingModal;
