import React, { useState } from 'react';
import LoginService from '../services/LoginService';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

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
       navigate('/home')
    } catch (error) {
        setMessage({ isSuccess: false, text: "Something went wrong, Try again!" });
        console.error(error);
    }
  };

  return (
    <div className="form-signInForm">
      <form id='form-login' onSubmit={handleLogin}>
        <h3>Login</h3>
        <div>
          <label>Email address:</label>
          <input
            id='email-address-login'
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
            id='password-login'
            type="password"
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button id='submit-button-login' type="submit">Login</button>
        <div id='message-login'>
            {message && (
                <Message isSuccess={message.isSuccess} message={message.text} />
            )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;