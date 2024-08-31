import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [image, setImage] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState({});
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('businessName', businessName);
      if (image) formData.append('image', image);
      formData.append('rememberMe', rememberMe);

      const response = await axios.post('http://localhost:3000/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Login successful:', response.data);
      setLoginSuccess(true);
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setBusinessName('');
      setImage(null);
      setPreview(null);
      setErrorMessage('');
      localStorage.setItem('user', JSON.stringify({
        email,
        rememberMe,
      }));
      navigate('/purchase');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setErrorMessage('Login failed. Please try again.');
      setLoginSuccess(false);
    }
  };

  const handleFocus = (field) => {
    setFocusedField((prevState) => ({ ...prevState, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocusedField((prevState) => ({ ...prevState, [field]: false }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="login-body">
      <div className="login-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-heading">Login</h2>
          <div className="file-upload">
            <label htmlFor="image" className="upload-btn">
              {preview ? (
                <img src={preview} alt="Profile Preview" className="profile-preview" />
              ) : (
                <i className="fas fa-user upload-icon"></i>
              )}
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="file-input"
            />
          </div>
          <div className="login-nameFields">
            <div
              className={`login-inputField ${focusedField['firstName'] || firstName ? 'login-inputFocus' : ''}`}
            >
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onFocus={() => handleFocus('firstName')}
                onBlur={() => handleBlur('firstName')}
                required
                className="login-input"
              />
              <label
                htmlFor="firstName"
                className={`login-inputLabel ${focusedField['firstName'] || firstName ? 'login-inputFocus' : ''}`}
              >
                First Name
              </label>
            </div>
            <div
              className={`login-inputField ${focusedField['lastName'] || lastName ? 'login-inputFocus' : ''}`}
            >
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onFocus={() => handleFocus('lastName')}
                onBlur={() => handleBlur('lastName')}
                required
                className="login-input"
              />
              <label
                htmlFor="lastName"
                className={`login-inputLabel ${focusedField['lastName'] || lastName ? 'login-inputFocus' : ''}`}
              >
                Last Name
              </label>
            </div>
          </div>
          <div className="logo-businessName">
            <div className="businessName">
              <div
                className={`login-inputField ${focusedField['businessName'] || businessName ? 'login-inputFocus' : ''}`}
              >
                <input
                  type="text"
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  onFocus={() => handleFocus('businessName')}
                  onBlur={() => handleBlur('businessName')}
                  required
                  className="login-input"
                />
                <label
                  htmlFor="businessName"
                  className={`login-inputLabel ${focusedField['businessName'] || businessName ? 'login-inputFocus' : ''}`}
                >
                  Business Name
                </label>
              </div>
            </div>
          </div>
          <div className="login-inputField">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              required
              className="login-input"
            />
            <label
              htmlFor="email"
              className={`login-inputLabel ${focusedField['email'] || email ? 'login-inputFocus' : ''}`}
            >
              Email
            </label>
          </div>
          <div className="login-inputField">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
              required
              className="login-input"
            />
            <label
              htmlFor="password"
              className={`login-inputLabel ${focusedField['password'] || password ? 'login-inputFocus' : ''}`}
            >
              Password
            </label>
          </div>
          <div className="login-forget">
            <label htmlFor="remember" className="login-rememberCheckbox">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <Link to="/" className="login-link">Forgot password?</Link>
          </div>
          <button
            type="submit"
            className="login-button"
          >
            Log In
          </button>
          {loginSuccess && <div className="successMessage">Login successful!</div>}
          {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
