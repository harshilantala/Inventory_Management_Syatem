import React, { useState } from 'react';
import '../css/RegistrationForm.css'; // Ensure your CSS file is correctly linked

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Reset password error when user changes either password or confirm password field
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Check password match only when form is submitted
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="container">
      <div className="title">Registration</div>
      <form onSubmit={handleSubmit}>
        <div className="user__details">
          <div className="input__box">
            <span className="details">Full Name</span>
            <input
              type="text"
              name="fullName"
              placeholder="E.g: John Smith"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input__box">
            <span className="details">Username</span>
            <input
              type="text"
              name="username"
              placeholder="johnWC98"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input__box">
            <span className="details">Email</span>
            <input
              type="email"
              name="email"
              placeholder="johnsmith@hotmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input__box">
            <span className="details">Phone Number</span>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="+91 1234567890"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input__box">
            <span className="details">Password</span>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input__box">
            <span className="details">Confirm Password</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {formSubmitted && !passwordError && formData.password !== formData.confirmPassword && (
            <div className="error">Passwords do not match</div>
          )}
        </div>
        <div className="gender__details">
          <span className="gender__title">Gender</span>
          <div className="category">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              <span className="dot one"></span>
              <span>Male</span>
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              <span className="dot two"></span>
              <span>Female</span>
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="prefer-not-to-say"
                checked={formData.gender === 'prefer-not-to-say'}
                onChange={handleChange}
              />
              <span className="dot three"></span>
              <span>Prefer not to say</span>
            </label>
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
