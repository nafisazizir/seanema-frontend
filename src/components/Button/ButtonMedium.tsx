import React, { ChangeEvent } from "react";
import "./ButtonMediumStyle.css";

interface ButtonMediumProps {
  buttonText: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ButtonMedium: React.FC<ButtonMediumProps> = ({ buttonText, onClick }) => {
  return (
    <div className="button-medium button-medium-text" onClick={onClick}>
      {buttonText}
    </div>
  );
};

export default ButtonMedium;
