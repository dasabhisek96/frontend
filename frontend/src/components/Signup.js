import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/Signup.css';

function Signup() {
    const [formData, setFormData] = useState({
        Firstname: "",
        Lastname: "",
        email: "",
        password: "",
      });
      const [error, setError] = useState("");
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
    
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
    
    
        try {
          const response = await fetch(`$(window.location.origin)/api/users/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Firstname: formData.Firstname,
              Lastname: formData.Lastname,
              email: formData.email,
              password: formData.password,
            }),
          });
    
    
          if (response.status === 201) {
            navigate("/");
          } else {
            const errorData = await response.json();
            setError(errorData.message || "Signup failed.");
          }
        } catch (err) {
          setError("Signup failed. Please check your input.");
        } finally {
          setLoading(false);
        }
      };
    
  return (
    <div className="signup-container">
      <nav className="navbar">
        <div className="logo">
          <i className="fas fa-calendar-alt"></i>
        </div>
        <div className="nav-links">
          <a href="/" className="nav-link">Login</a>
          <a href="/signup" className="nav-link active">Signup</a>
        </div>
      </nav>

      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className="input-field"
            value={formData.Firstname}
            onChange={(e) =>
              setFormData({ ...formData, Firstname: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input-field"
            value={formData.Lastname}
            onChange={(e) =>
              setFormData({ ...formData, Lastname: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button type="submit" disabled={loading} className="signup-button">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>


        {error && <p className="error-message">{error}</p>}


        <div className="login-link">
          <p>
            Already have an account? <a href="/">Login</a>
          </p>
        </div>


        <button className="google-signup-button">Signup with Google</button>
      </div>
    </div>

  );
}

export default Signup;
