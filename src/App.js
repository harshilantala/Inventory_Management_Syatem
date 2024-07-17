import "./App.css";

function App() {
  return (
    <>
      <div className="wrapper">
        <form action="#">
          <h2>Login</h2>
          <div className="input-field">
            <input type="text" id="email" required />
            <label>Enter your email</label>
          </div>
          <div className="input-field">
            <input type="password" id="pass" required />
            <label>Enter your password</label>
          </div>
          <div className="forget">
            <label for="remember">
              <input type="checkbox" id="remember" />
              <p>Remember me</p>
            </label>
            <a href="/">Forgot password?</a>
          </div>
          <button type="submit" id="submit">Log In</button>
          {/* <div className="register">
            <p>
              Don't have an account? <a href="/">Register</a>
            </p>
          </div> */}
        </form>
      </div>
    </>
  );
}

export default App;
