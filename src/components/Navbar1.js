import React from 'react';
import { useNavigate } from 'react-router-dom';
// import LoginForm from './Login';

const Navbar = () => {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('register');
  }

  return (
    <div style={styles.navbar}>
      <div style={styles.brandingContainer}>
        <img src="/images/diamond1.jpg" alt="Logo" style={styles.logo} />
        <h1 style={styles.branding}>StoneStream</h1>
      </div>
      <button style={styles.loginButton} onClick={handleLoginClick}>Register</button>
    </div>
  );
};


const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0px 17px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #ddd',
      
    },
    brandingContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    branding: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginLeft: '0.5rem', // Add some space between the logo and the text
    },
    loginButton: {
      padding: '5px 12px',
      fontSize: '15px',
      cursor: 'pointer',
      borderRadius: '15px',
      backgroundColor: 'black',
      color:'white',
      fontWeight: '600',
    },
    logo: {
      height: '60px', // Adjust the height according to your preference
      width: '60px',  // Adjust the width according to your preference
    }
  };
  

export default Navbar;
