import { useState, useEffect } from "react";
import Header from "./Header";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import {Routes, Route, Navigate} from "react-router-dom";
// import Login from "./Login";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    if (token) {
      localStorage.setItem('token', token);
      fetchProfile();
    } else {
      localStorage.removeItem('token');  
      setProfile(null);
    }
  }, [token]);

  const fetchProfile = () => {
    const token = localStorage.getItem('token');
    const URL = "http://localhost:8000"
    fetch(`${URL}/profile`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    .then(res => {
        return res.json();
    })
    .then(data => setProfile(data.user))
    .catch(() => setError('Please log in first'));
  };

  const handleLogout = () => {
    setToken(null);
  }; 

  return (
    <>
      <Header token={token} logout={handleLogout}  />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/profile" element={
          token ? (
            <Profile profile={profile} />
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </>
  );
}

export default App;
