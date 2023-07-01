import React from "react";
import "./NavbarStyle.css";
import { NavLink } from "react-router-dom";
import { PiWavesBold } from "react-icons/pi";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const auth = useAuth();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <NavLink to="/" className="logo-container">
          <PiWavesBold className="logo" size={32} />
          <div className="logotype">SEANEMA</div>
        </NavLink>
      </div>

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
            <div className="button-medium-text nav" onClick={handleLogOut}>
              Log Out
            </div>
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
