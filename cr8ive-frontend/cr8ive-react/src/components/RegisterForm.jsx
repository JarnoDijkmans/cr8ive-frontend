import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
    //    await RegisterService.register(email, password); // replace with your actual service
       navigate('/search')
    } catch (error) {
        console.error(error);
    }
  };
  return (
    <div className="form-signUpForm">
      <form onSubmit={handleRegister}>
        <h3>Sign Up</h3>
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
        <div>
            <label>Confirm Password</label>
            <input
                type='Conform Password'
                placeholder='Password'
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                required
            />     
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default RegisterForm;