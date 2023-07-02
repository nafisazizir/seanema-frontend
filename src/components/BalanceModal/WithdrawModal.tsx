import React, { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import ButtonSmall from "../Button/ButtonSmall";
import "./BalanceModalStyle.css";
import UserDataService from "../../services/user";
import { AxiosError } from "axios";
import { CgDanger } from "react-icons/cg";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState(0);
  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(event.target.value);
    if (newAmount > 500000) {
      setAmount(500000);
      setMessage("Maximum amount to withdraw is Rp 500,000");
      setIsWarning(true);
    } else if (newAmount < 0) {
      setAmount(0);
    } else {
      setAmount(newAmount);
    }
  };
  const [message, setMessage] = useState(
    "Please fill in the amount to withdraw"
  );
  const [isWarning, setIsWarning] = useState(false);

  const input = document.querySelector("input") as HTMLInputElement; // get the input element
  if (input) {
    input.addEventListener("input", resizeInput); // bind the "resizeInput" callback on "input" event
    resizeInput.call(input); // immediately call the function
  }

  function resizeInput(this: HTMLInputElement) {
    this.style.width = this.value.length > 1 ? this.value.length + "ch" : "1ch";
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    try {
      const response = await UserDataService.withdraw(amount);
      onClose();
      setAmount(0);
      setIsWarning(false);
      setMessage("Please fill in the amount to withdraw");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        setMessage(error.response.data.message);
        setIsWarning(true);
      } else {
        console.log("An unknown error occurred.");
      }
    }
  };

  const handleClose = () => {
    setAmount(0);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="balance-modal"
      overlayClassName="balance-modal-overlay"
    >
      <h6>Withdraw</h6>
      <div className="balance-amount balance-input">
        <div>Rp</div>
        <input
          type="number"
          className="label-input balance-input"
          placeholder="0"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div
        className={
          isWarning
            ? "paragraph-small color-danger message-auth"
            : "paragraph-small message-auth"
        }
      >
        {isWarning && <CgDanger />}
        {message}
      </div>
      <div className="select-balance-button-container">
        <ButtonSmall buttonText="Cancel" onClick={handleClose} />
        <ButtonSmall buttonText="Withdraw" onClick={handleSubmit} />
      </div>
    </Modal>
  );
};

export default WithdrawModal;
