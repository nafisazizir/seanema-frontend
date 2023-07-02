import React, { useState, useEffect } from "react";
import "./BalanceStyle.css";
import UserDataService from "../../services/user";
import Navbar from "../../components/Navbar/Navbar";
import { RiMastercardFill } from "react-icons/ri";

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
  }, []);

  const balanceCurrency = user ? `Rp ${user.balance.toLocaleString()}` : "";

  return (
    <>
      <Navbar />
      <div className="page-template">
        <div className="balance-card-container">
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
        </div>
      </div>
    </>
  );
};

export default Balance;
