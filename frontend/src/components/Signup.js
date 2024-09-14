import React from 'react';
import '../styles/Signup.css';

function Signup() {
  return (
    <div className="signup-container">
      <nav className="navbar">
        <div className="logo">
          <i className="fas fa-calendar-alt"></i>
        </div>
        <div className="nav-links">
          <a href="/login" className="nav-link">Login</a>
          <a href="/signup" className="nav-link active">Signup</a>
        </div>
      </nav>

      <div className="signup-box">
        <h2>Sign Up</h2>
        <form>
          <input
            type="text"
            placeholder="First Name"
            className="input-field"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input-field"
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="input-field"
            required
          />
          <button type="submit" className="signup-button">Signup</button>
        </form>

        <div className="login-link">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>

        <button className="google-signup-button">
          Signup with Google
        </button>
      </div>
    </div>
  );
}

export default Signup;
