import React, { useState, useEffect } from "react";
import "./BalanceStyle.css";
import UserDataService from "../../services/user";
import Navbar from "../../components/Navbar/Navbar";
import { RiMastercardFill } from "react-icons/ri";
import ButtonMedium from "../../components/Button/ButtonMedium";
import TopUpModal from "../../components/BalanceModal/TopUpModal";
import WithdrawModal from "../../components/BalanceModal/WithdrawModal";

interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  age: number;
  balance: number;
}

const Balance = () => {
  const [user, setUser] = useState<User>();
  const [isTopUpModalOpen, setTopUpModalOpen] = useState(false);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);

  const handleTopUpModalOpen = () => {
    setTopUpModalOpen(true);
  };

  const handleTopUopModalClose = () => {
    setTopUpModalOpen(false);
  };

  const handleWithdrawModalOpen = () => {
    setWithdrawModalOpen(true);
  };

  const handleWithdrawModalClose = () => {
    setWithdrawModalOpen(false);
  };

  useEffect(() => {
    // Fetch movie details from the API
    const fetchBalance = async () => {
      try {
        const response = await UserDataService.getBalance();
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchBalance();
  }, [isTopUpModalOpen, isWithdrawModalOpen]);

  const balanceCurrency = user ? `Rp ${user.balance.toLocaleString()}` : "";

  return (
    <>
      <Navbar />
      <div className="page-template">
        <div
          className="balance-card"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(https://cdn.discordapp.com/attachments/889420466081661018/1124744548162224159/card-bg.png)`,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <div className="headline-text">MY BALANCE</div>
          </div>
          <h3>{balanceCurrency}</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className="headline-text">{user?.name}</div>
            <RiMastercardFill size={32} />
          </div>
        </div>
        <div className="button-balance-container">
          <ButtonMedium buttonText="Top Up" onClick={handleTopUpModalOpen} />
          <ButtonMedium
            buttonText="Withdraw"
            onClick={handleWithdrawModalOpen}
          />
        </div>
        <TopUpModal
          isOpen={isTopUpModalOpen}
          onClose={handleTopUopModalClose}
        />
        <WithdrawModal
          isOpen={isWithdrawModalOpen}
          onClose={handleWithdrawModalClose}
        />
      </div>
    </>
  );
};

export default Balance;
