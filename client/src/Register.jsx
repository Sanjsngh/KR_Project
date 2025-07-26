import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        image: null
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // set form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsLoading(true);
      
        const URL = "http://localhost:8000";
      
        const form = new FormData();
        form.append("username", formData.username);
        form.append("email", formData.email);
        form.append("password", formData.password);
        form.append("image", formData.image); // file object
      
        try {
          const res = await fetch(`${URL}/register`, {
            method: 'POST',
            body: form, 
          });
      
          const data = await res.json();
      
          if (!res.ok) {
            throw new Error(data.message || 'Registration failed');
          }
      
          setMessage(data.message);
          setFormData({
            username: '',
            email: '',
            password: '',
            image: null
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      

    return ( 
        <div className="register-container">
            <h2>Register</h2>
            {
            isLoading && (
                <div >Please wait while registering.. </div>
            ) 
            }
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

                <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    required
                />

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Register</button>
                {message && <p style={{ color: 'green' }}>{message}</p>}
            </form>
            
        </div>
   
    )
}

export default Register;