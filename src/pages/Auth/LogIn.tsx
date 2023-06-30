import React, { ChangeEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AuthStyle.css";
import Label from "../../components/Label/Label";
import { BsKeyFill } from "react-icons/bs";
import { BiRename } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import ButtonMedium from "../../components/Button/ButtonMedium";
import UserDataService from "../../services/user";
import { AxiosError } from "axios";

const LogIn = () => {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(
    "Welcome back! Nice to meet you again"
  );
  const [isWarning, setIsWarning] = useState(false);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (username === "" || password === "") {
      setMessage("Please fill all the fields!");
      setIsWarning(true);
      return;
    }

    try {
      const response = await UserDataService.login({
        username,
        password,
      });
      history("/");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        setMessage(error.response.data.message);
        setIsWarning(true);
      } else {
        console.log("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="signup-login-button">
          <Link to={"/signup"}>
            <div className="signup-button-inactive button-small-text">
              Sign Up
            </div>
          </Link>
          <Link to={"/login"}>
            <div className="login-button-active button-small-text">Log In</div>
          </Link>
        </div>
        <div className="labels">
          <Label
            labelText="USERNAME"
            placeholderText="Type your username"
            icon={<BiRename size={20} />}
            value={username}
            onChange={handleUsernameChange}
          />
          <Label
            labelText="PASSWORD"
            placeholderText="Type your password"
            icon={<BsKeyFill size={20} />}
            value={password}
            onChange={handlePasswordChange}
          />
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
        </div>

        <div className="button-auth">
          <ButtonMedium buttonText="Log In" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
