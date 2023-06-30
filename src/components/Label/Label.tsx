import React, { ChangeEvent, ReactElement } from "react";
import "./LabelStyle.css";

interface LabelProps {
  labelText: string;
  placeholderText: string;
  icon: ReactElement;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Label: React.FC<LabelProps> = ({
  labelText,
  placeholderText,
  icon,
  value,
  onChange,
}) => {
  return (
    <div className="label-container">
      <div className="label-text">{labelText}</div>
      <div className="input-container">
        <input
          type={
            labelText === "PASSWORD"
              ? "password"
              : labelText === "AGE"
              ? "number"
              : "text"
          }
          className="label-input placeholder-text"
          placeholder={placeholderText}
          value={value}
          onChange={onChange}
        />
        {icon}
      </div>
    </div>
  );
};

export default Label;
