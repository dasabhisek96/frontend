
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      const response = await fetch(`$(window.location.origin)/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      // Check if the response is not ok
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
  
      // Parse the JSON response
      const data = await response.json(); 
  
      // Store the token in localStorage
      const token = data.token;
      localStorage.setItem("token", token);
  
      // Show success message and navigate to dashboard
      setSuccess("Login successful!");
      navigate(`/dashboard`);
    } catch (error) {
      setError(error.message);
    }
  };
  

  // Handle Google Login
  const handleGoogleLogin = () => {
    // Open the Google authentication popup
    window.open(`$(window.location.origin)/auth/google/callback`, "_self");
  };

  // Handle successful Google login and retrieve token from the backend
  const handleGoogleSuccess = async () => {
    try {
      const response = await fetch(`$(window.location.origin)/auth/login/success`, {
        credentials: "include", // Important to include cookies for Google OAuth session
      });

      if (!response.ok) {
        throw new Error("Google login failed");
      }

      const data = await response.json();
      const token = data.token; // Get the token from the backend response

      // Store the token and user data in localStorage
      localStorage.setItem("authData", JSON.stringify({ token, user: data.user }));

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (error) {
      setError("Failed to login with Google");
    }
  };

  // Check if the user successfully logged in through Google
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('googleSuccess')) {
      handleGoogleSuccess();
    }
  }, []);

  return (
    <div className="login-container">
      <nav className="navbar">
        <div className="logo">
          <i className="fas fa-calendar-alt"></i>
        </div>
        <div className="nav-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Signup</Link>
        </div>
      </nav>

      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="signup-link">
          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>

        {/* Google Login Button */}
        <button className="google-login-button" onClick={handleGoogleLogin}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google logo"
            className="google-logo"
          />
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
