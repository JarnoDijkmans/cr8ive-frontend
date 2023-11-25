import React, { useState } from 'react';
import LoginService from '../services/LoginService';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
       await LoginService.login(email, password); 
       navigate('/search')
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="form-signInForm">
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            placeholder='Email Address'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;