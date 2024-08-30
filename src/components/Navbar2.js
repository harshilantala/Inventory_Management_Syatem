import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/navbar2.css';

const Navbar2 = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleHomeClick = () => {
    navigate('/'); // Redirects to the homepage
  };

  return (
    <div className="navbar">
      <div className="branding-container">
        <img 
          src="/images/diamond1.jpg" 
          alt="Logo" 
          className="logo" 
          onClick={handleHomeClick} // Navigate to homepage on logo click
        />
        <h1 
          className="branding" 
          onClick={handleHomeClick} // Navigate to homepage on brand name click
        >
          StoneStream
        </h1>
      </div>
      <div className="nav-links">
        <button className="nav-button" onClick={() => handleNavigation('/inventory')}>Inventory</button>
        <button className="nav-button" onClick={() => handleNavigation('/purchase')}>Purchase</button>
        <button className="nav-button" onClick={() => handleNavigation('/sale')}>Sale</button>
        <button className="nav-button" onClick={() => handleNavigation('/dashboard')}>Dashboard</button>
        <button className="nav-button" onClick={() => handleNavigation('/history')}>Order History</button>
        <button className="nav-button" onClick={() => handleNavigation('/invoice')}>Invoice</button>
      </div>
      <div className="user-container">
        <img src="/images/userlogo.jpg" alt="User Logo" className="user-logo" />
      </div>
    </div>
  );
};

export default Navbar2;
