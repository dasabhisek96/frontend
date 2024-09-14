import React from 'react';
import '../styles/Login.css';

function Login() {
  return (
    <div className="login-container">
      <nav className="navbar">
        <div className="logo">
          <i className="fas fa-calendar-alt"></i>
        </div>
        <div className="nav-links">
          <a href="/login" className="nav-link">Login</a>
          <a href="/signup" className="nav-link">Signup</a>
        </div>
      </nav>

      <div className="login-box">
        <h2>Login</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>

        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Signup</a></p>
        </div>

        <button className="google-login-button">
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
