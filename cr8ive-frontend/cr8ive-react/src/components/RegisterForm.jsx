import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService'
import LoginService from '../services/LoginService';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
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
      setErrorMessage("Passwords do not match.");
      return false;
    }
    setErrorMessage('');
    return true;
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
        navigate('/search');
      } else {
        console.error('User data not found in the response');
      }
    } catch (error) {
      console.error('Error creating user', error);
    }
  };

  return (
    <div className="form-signUpForm">
      <form onSubmit={handleRegister}>
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
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
            />     
        </div>
        <button type="submit">Sign Up</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;