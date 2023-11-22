import React, { useState, useEffect } from 'react';
import LoginService from '../services/LoginService';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ isLoggedIn, setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const accessToken = await LoginService.login(email, password);
        if (accessToken) {
            setLoggedIn(true);
        } else {
            setLoggedIn(true);
        }
    } catch (error) {
        console.error(error);
    }
 };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/search');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        {loginError && <p>Login failed. Please check your credentials.</p>}
      </form>
    </div>
  );
};

export default LoginPage;