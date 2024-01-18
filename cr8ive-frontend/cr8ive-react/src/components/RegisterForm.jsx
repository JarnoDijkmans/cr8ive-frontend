import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService'
import LoginService from '../services/LoginService';
import Message from '../components/Message';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    birthdate: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
  });

  const handleInputChange = (name, value) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  };

  const selectFile = () => {
    const fileInput = document.getElementById('file-input');
    fileInput.click();
  };

  function confirmPassword() {
    if (newUser.password !== newUser.confirmPassword) {
      setMessage( {isSuccess: false, text: "Passwords do not match."});
      return false;
    }
    else{return true}
   }

   
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setNewUser((prevUser) => ({
      ...prevUser,
      profilePicture: file, 
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!confirmPassword()) {
      return;
    }
  
    try {
      const response = await UserService.saveUser(newUser);
      if (response && response.user) {
        const { emailAddress } = response.user;
        console.log('User created successfully', response);
        await LoginService.login(emailAddress, newUser.password);
        navigate('/');
      } else {
        console.error('User data not found in the response');
      }
    } catch (error) {
      console.error('Error creating user', error);
    }
  };

  return (
    <div className="form-signUpForm">
      <form id='form-register' onSubmit={handleRegister}>
        <h3>Sign Up</h3>
        <div className="profile-selector">
          <img
            onClick={selectFile}
            src={
              newUser.profilePicture
                ? URL.createObjectURL(newUser.profilePicture)
                : '../src/images/default-image-url.png'
            }
            alt="Profile"
            className="rounded-image"
          />
         <input
          id="file-input" 
          type="file" 
          name="profilePicture" 
          className="content-input" 
          onChange={handleImageChange}
          accept="image/*" 
          style={{ display: 'none' }}
         />
        </div>
        <div className="name-inputs">
          <div className="input-field">
            <label>Firstname:</label>
            <input
              type="text"
              placeholder='Firstname'
              className='firstname'
              id='firstname-input'
              value={newUser.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label>Lastname:</label>
            <input
              type="text"
              placeholder='Lastname'
              className='lastname'
              id='lastname-input'
              value={newUser.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            placeholder='Email Address'
            id='email-input'
            value={newUser.emailAddress}
            onChange={(e) => handleInputChange('emailAddress', e.target.value)}
            required
          />
        </div>
        <div>
          <label>Birthdate:</label>
          <input
            type="date"
            placeholder='Birthdate'
            id='birthdate-input'
            value={newUser.birthdate ? new Date(newUser.birthdate).toISOString().split('T')[0] : ''}
            onChange={(e) => handleInputChange('birthdate', e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder='Password'
            value={newUser.password}
            id='password-input' 
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
          />
        </div>
        <div>
            <label>Confirm Password</label>
            <input
                type='password'
                placeholder='Confirm Password'
                value={newUser.confirmPassword}
                id='confirm-password-input'
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
            />     
        </div>
        <button id='submit-button-register' type="submit">Sign Up</button>
        <div id='message-register'>
          {message && (
                <Message isSuccess={message.isSuccess} message={message.text} />
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;