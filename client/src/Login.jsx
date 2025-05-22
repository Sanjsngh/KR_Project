import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      loginId: '',
      password: '',
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage("");
      setError("");

      const URL = "http://localhost:8000"
      fetch(`${URL}/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      })
      .then(res => {
        if (!res.ok) {
            return res.json().then((err) => {
              throw new Error(err.message);
            });
        }
        return res.json()

      })
      .then(data => {
        console.log(data);
        
        setToken(data.data.token);
        // localStorage.setItem('token', data.token);
        setFormData({ loginId : '', password: '' });
        setMessage(data.message);
        navigate("/profile");
      })
      .catch((err) => {
        setError(err.message || "Login failed.");
      });
      

  };

  return (
  <div className="login-container">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          id="loginId"
          name="loginId"
          placeholder="Enter login ID"
          value={formData.loginId}
          onChange={handleChange}
          
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          
        />
      </div>
      <button type="submit">Login</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
    <Link to="/register"><p>New User? Click here to register!</p></Link>
  </div>
  );
};

export default Login;