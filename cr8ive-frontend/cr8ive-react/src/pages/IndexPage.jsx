import React, { useState, useEffect } from 'react';
import LocalStorageService from '../services/LocalStorageService';
import { useNavigate } from 'react-router-dom';
import "./css/LoginPage.css"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"

const IndexPage = () => {
  const navigate = useNavigate();
  const [isSignInActive, setIsSignInActive] = useState(true);
  const [backgroundStyle, setBackgroundStyle] = useState('');

  useEffect(() => {
    const accessToken = LocalStorageService.get();
    if (accessToken) {
      navigate('/search');
    }
  })

 const toggleForm = (isSignIn) => {
  setIsSignInActive(isSignIn);
  setBackgroundStyle(isSignIn ? '' : 'customBackgroundColor');
};

return (
  <div className={`content-test ${backgroundStyle}`}>
    <div className="container">
      <div className="background">
        <div className="box-signin">
          <h2>Already have an account? </h2>
          <button className="signInBtn" onClick={() => toggleForm(true)}>
            Login
          </button>
        </div>
        <div className="box-signup">
          <h2>New to Cr8ive?</h2>
          <button className="signUpBtn" onClick={() => toggleForm(false)}>
            Sign up here
          </button>
        </div>
      </div>
      <div className={`formBx ${isSignInActive ? '' : 'active'}`}>
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  </div>
);
}

export default IndexPage;
