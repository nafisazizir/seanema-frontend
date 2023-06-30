import React from "react";
import "./NavbarStyle.css";
import { NavLink } from "react-router-dom";
import { PiWavesBold } from "react-icons/pi";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const auth = useAuth();
  console.log(auth);

  return (
    <div className="navbar">
      <NavLink to="/">
        <div className="logo-container">
          <PiWavesBold className="logo" size={32} />
          <div className="logotype">SEANEMA</div>
        </div>
      </NavLink>

      <div className="navbar-item">
        {auth === true ? (
          <>
            <NavLink to="/movies" className="button-medium-text nav">
              Movies
            </NavLink>
            <NavLink to="/tickets" className="button-medium-text nav">
              My Tickets
            </NavLink>
            <NavLink to="/balance" className="button-medium-text nav">
              Balance
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/signup">
              <div className="button-medium-text sign-up-nav">Sign Up</div>
            </NavLink>
            <NavLink to="/login">
              <div className="button-medium-text log-in-nav">Log In</div>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
