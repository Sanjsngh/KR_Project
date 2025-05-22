import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // set form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        const URL = "http://localhost:8000"
        fetch(`${URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((res) => {
            if (!res.ok) {
                return res.json().then(err => {
                  throw new Error(err.message);
                });
              }
            return res.json();
        })
        .then((data) => {
            setMessage(data.message)
            setFormData({
                username: '',
                email: '',
                password: ''
            })
        })
        .catch((err) => {
            setError(err.message);
        });
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder='Username'
                        value={formData.username}
                        onChange={handleChange}
                        
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        
                    />
                </div>
            
                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        
                    />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Register</button>
                {message && <p style={{ color: 'green' }}>{message}</p>}
            </form>
        </div>
    );
};

export default Register;