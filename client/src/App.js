import { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import {Routes, Route, Navigate} from "react-router-dom";
// import Login from "./Login";
import { TokenContext } from "./TokenProvider";

function App() {
  // const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const { token , setToken } = useContext(TokenContext);
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
    const URL = "https://kr-project-1-6v8y.onrender.com"
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

  

  return (
    <>
      <Header  />

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
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//   const notify = () => toast("Hello, this is a toast!");

//   return (
//     <div>
//       <button onClick={notify}>Show Toast</button>
//       <ToastContainer 
//       position='bottom-center'
//       autoClose={6000}
//       closeOnClick />
//     </div>
//   );
// }


// export default App;
