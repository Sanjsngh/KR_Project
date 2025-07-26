import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { TokenContext } from './TokenProvider';

export default function Header() {
  const {token, setToken} = useContext(TokenContext);
  const handleLogout = () => {
    setToken(null);
  }; 

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
                onClick={handleLogout}
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
