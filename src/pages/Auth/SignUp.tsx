import React, { ChangeEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AuthStyle.css";
import Label from "../../components/Label/Label";
import { BsPersonFill, BsKeyFill } from "react-icons/bs";
import { GoNumber } from "react-icons/go";
import { BiRename } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import ButtonMedium from "../../components/Button/ButtonMedium";
import UserDataService from "../../services/user";
import { AxiosError } from "axios";
import { logout } from "../../hooks/logout";

const SignUp = () => {
  document.body.style.backgroundColor = "var(--color-primary-10)";
  const history = useNavigate();
  const logOut = logout();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState(
    "By signing up, you agree to our Terms of Service and Privacy Policy."
  );
  const [isWarning, setIsWarning] = useState(false);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
  };
  const handleFullNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFullName = event.target.value;
    setFullName(newFullName);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };
  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newAge = event.target.value;
    setAge(newAge);
  };

  const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (username === "" || fullName === "" || password === "" || age === "") {
      setMessage("Please fill all the fields!");
      setIsWarning(true);
      return;
    }

    try {
      const response = await UserDataService.register({
        username,
        password,
        name: fullName,
        age: parseInt(age),
      });
      history("/login");
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
            <div className="signup-button-active button-small-text">
              Sign Up
            </div>
          </Link>
          <Link to={"/login"}>
            <div className="login-button-inactive button-small-text">
              Log In
            </div>
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
            labelText="FULL NAME"
            placeholderText="Type your full name"
            icon={<BsPersonFill size={20} />}
            value={fullName}
            onChange={handleFullNameChange}
          />
          <Label
            labelText="PASSWORD"
            placeholderText="Type your password"
            icon={<BsKeyFill size={20} />}
            value={password}
            onChange={handlePasswordChange}
          />
          <Label
            labelText="AGE"
            placeholderText="Type your age"
            icon={<GoNumber size={20} />}
            value={age}
            onChange={handleAgeChange}
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
          <ButtonMedium buttonText="Sign Up" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
