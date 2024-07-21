import React from 'react';
import Navbar from '../components/Navbar1';
import AnimatedTextComponent from '../components/AnimatedText';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.overlay}>
        <div style={styles.content}>
          <AnimatedTextComponent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: 'url(/images/background2.jpg)', // Ensure this path is correct
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  overlay: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  },
  content: {
    color: 'white', // Text color
    padding: '20px',
    textAlign: 'center', // Center the text
  }
};

export default Home;
