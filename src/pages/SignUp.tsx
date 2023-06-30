import React, { ChangeEvent, useState } from "react";
import "./SignUpStyle.css";
import Label from "../components/Label/Label";
import { BsPersonFill, BsKeyFill } from "react-icons/bs";
import { GoNumber } from "react-icons/go";
import { BiRename } from "react-icons/bi";
import ButtonMedium from "../components/Button/ButtonMedium";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState(
    "By signing up, you agree to our Terms of Service and Privacy Policy."
  );

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

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("Button clicked!");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-login-button">
          <div className="signup-button-active button-small-text">Sign Up</div>
          <div className="login-button-inactive button-small-text">Log In</div>
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
          <div className="paragraph-small">{message}</div>
        </div>

        <div className="button-signup">
          <ButtonMedium buttonText="Sign Up" onClick={() => handleClick} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
