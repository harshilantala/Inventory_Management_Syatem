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
    backgroundImage: 'url(/images/background2.jpg)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative', // Ensures that child elements like overlay are positioned correctly
  },
  overlay: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    width: '100%', // Make sure the overlay covers the full width
  },
  content: {
    color: 'white', 
    padding: '20px',
    textAlign: 'center', 
  }
};

export default Home;
