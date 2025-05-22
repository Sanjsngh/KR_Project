import React from 'react';
import { Link } from "react-router-dom";

export default function Header({ token, logout }) {
  return (
    <header>
      <nav className="navbar">
        <h1>MyApp</h1>
        <ul className="navbar-container">
          <li className="nav-links">
            <Link className="link" to="/">HOME</Link>
          </li>
          {token ? (
            <>
              <button
                className="logoutBtn"
                onClick={logout}
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <li className="nav-links">
                <Link className="link" to="/login">LOGIN</Link>
              </li>
              <li className="nav-links">
                <Link className="link" to="/register">REGISTER</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
