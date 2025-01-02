import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate  = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      navigate('/home', { replace: true }); 
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://keydraft-backend.onrender.com/api/auth/login', {
        username,
        password,
      });
      if (response.data.success) {
        alert('Login successful');
        localStorage.setItem('auth_token', response.data.token);
        navigate('/home', { replace: true });
      }
    } catch (error) {
      setErrorMessage(error.response?.data.message || 'Something went wrong');
    };
  };

  return (
    <div className="login-container">
      <fieldset className='fieldset'>
        <legend>Login</legend> 
            <form className='login-form' onSubmit={handleLogin}>
                <img src='/digitrac_full_logo.png' alt='logo' width={100} className='log-logo'/>
                <br />
                <label htmlFor="username" className='login-label'>Username</label>
                <input
                    type="text"
                    id="username"
                    className='login-input'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password" className='login-label'>Password</label>
                <input
                    type="password"
                    id="password"
                    className='login-input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {errorMessage && <p className="error">*{errorMessage}</p>}
                <button type="submit" className='login-btn'>Login</button>
            </form>
      </fieldset> 
    </div>
  );
};

export default Login;