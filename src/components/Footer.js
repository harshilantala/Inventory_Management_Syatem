import React from 'react';

const Footer = () => {
  return (
    <nav style={styles.footer}>
      <p>Contact us at: info@stonestream.com</p>
      <p>Phone: +123 456 7890</p>
    </nav>
  );
};

const styles = {
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 30px',
    backgroundColor: 'black',
    borderBottom: '1px solid #ddd',
    color: 'white',
    bottom: 0,
    // width: '90vw'
  }
};

export default Footer;
