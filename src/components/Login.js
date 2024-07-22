import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password, rememberMe });
  };

  const styles = {
    body: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
      margin: 0,
      padding: 0,
      position: 'relative',
      background: 'url("/images/background1.jpg") no-repeat center center',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      color: '#fff',
      overflow: 'hidden',
    },
    wrapper: {
      width: '100%',
      maxWidth: '400px',
      borderRadius: '8px',
      padding: '30px',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(9px)',
      WebkitBackdropFilter: 'blur(9px)',
      background: 'rgba(0, 0, 0, 0.5)',
      margin: 'auto',
      boxSizing: 'border-box',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '20px',
    },
    inputField: {
      position: 'relative',
      borderBottom: '2px solid #ccc',
      margin: '15px 0',
    },
    inputLabel: {
      position: 'absolute',
      top: '50%',
      left: '0',
      transform: 'translateY(-50%)',
      color: '#fff',
      fontSize: '16px',
      pointerEvents: 'none',
      transition: '0.15s ease',
    },
    input: {
      width: '100%',
      height: '40px',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      fontSize: '16px',
      color: '#fff',
    },
    inputFocus: {
      fontSize: '0.8rem',
      top: '10px',
      transform: 'translateY(-120%)',
    },
    forget: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '25px 0 35px 0',
      color: '#fff',
    },
    rememberCheckbox: {
      accentColor: '#fff',
    },
    link: {
      color: '#efefef',
      textDecoration: 'none',
    },
    linkHover: {
      textDecoration: 'underline',
    },
    button: {
      background: '#fff',
      color: '#000',
      fontWeight: '600',
      border: 'none',
      padding: '12px 20px',
      cursor: 'pointer',
      borderRadius: '3px',
      fontSize: '16px',
      border: '2px solid transparent',
      transition: '0.3s ease',
    },
    buttonHover: {
      color: '#fff',
      borderColor: '#fff',
      background: 'rgba(255, 255, 255, 0.15)',
    },
    '@media (max-width: 600px)': {
      heading: {
        fontSize: '1.5rem',
      },
      inputField: {
        margin: '10px 0',
      },
      inputLabel: {
        fontSize: '14px',
      },
      input: {
        fontSize: '14px',
        height: '35px',
      },
      button: {
        padding: '10px 15px',
        fontSize: '14px',
      },
    },
  };

  React.useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      /* Hide scrollbars for WebKit browsers */
      body::-webkit-scrollbar {
        display: none;
      }

      /* Hide scrollbars for Firefox */
      body {
        scrollbar-width: none;
      }

      /* Hide scrollbars for IE and Edge */
      body {
        -ms-overflow-style: none;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={styles.body}>
      <div style={styles.wrapper}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2 style={styles.heading}>Login</h2>
          <div style={styles.inputField}>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              required
              style={styles.input}
            />
            <label 
              htmlFor="email" 
              style={{ 
                ...styles.inputLabel, 
                ...(email || emailFocused ? styles.inputFocus : {}) 
              }}>
              Enter your email
            </label>
          </div>
          <div style={styles.inputField}>
            <input
              type="password"
              id="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              required
              style={styles.input}
            />
            <label 
              htmlFor="pass" 
              style={{ 
                ...styles.inputLabel, 
                ...(password || passwordFocused ? styles.inputFocus : {}) 
              }}>
              Enter your password
            </label>
          </div>
          <div style={styles.forget}>
            <label htmlFor="remember" style={styles.rememberCheckbox}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="/" style={styles.link}>Forgot password?</a>
          </div>
          <button type="submit" style={styles.button}>Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
