import React, { useState } from "react";
import "../assets/css/login_styles.css";

function Login({ setIsAuthenticated }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
  
    const handleSignup = async (e) => {
        e.preventDefault();
      
        if (password !== confirmPassword) {
          setMessage("Passwords do not match.");
          return;
        }
      
        try {
          const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
      
          const data = await res.json();
      
          if (res.ok) {
            // Optional: display temporary message before switching
            setMessage("Registration successful! Please log in.");
            
            // Wait a moment and switch to login
            setTimeout(() => {
              setIsLogin(true);
              setMessage(""); // clear message
              setEmail("");
              setPassword("");
              setConfirmPassword("");
            }, 1000); // 1 second delay for UX
          } else {
            setMessage(data.message || "Registration failed.");
          }
        } catch (err) {
          console.error(err);
          setMessage("Server error during registration.");
        }
      };
      
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setMessage("Login successful!");
        setIsAuthenticated(true); // Set user as authenticated
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error during login.");
    }
  };
  

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className={`title ${isLogin ? "login" : "signup"}`}>Account</div>
      </div>

      <div className="form-container">
        <div className="slide-controls">
          <input
            type="radio"
            name="slide"
            id="login"
            checked={isLogin}
            onChange={() => setIsLogin(true)}
          />
          <input
            type="radio"
            name="slide"
            id="signup"
            checked={!isLogin}
            onChange={() => setIsLogin(false)}
          />
          <label htmlFor="login" className="slide login">Login</label>
          <label htmlFor="signup" className="slide signup">SignUp</label>
          <div className="slider-tab" />
        </div>

        <div className={`form-inner ${isLogin ? "login-active" : "signup-active"}`}>
          {isLogin ? (
            <form className="login" onSubmit={handleLogin}>
              <div className="field">
                <input
                  type="text"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Show login message here */}
              {message && <p className="login-message">{message}</p>}

              <div className="pass-link">
                <a href="#">Reset password?</a>
              </div>
              <div className="field btn">
                <div className="btn-layer" />
                <input type="submit" value="Login" />
              </div>
              <div className="signup-link">
                Don't Have an Account?{" "}
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(false);
                  setMessage("");
                }}>
                  Create A New
                </a>
              </div>
            </form>
          ) : (
            <form className="signup" onSubmit={handleSignup}>
              <div className="field">
              <input
      type="text"
      placeholder="Email Address"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
              </div>
              <div className="field">
              <input
      type="password"
      placeholder="Password"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
              </div>
              <div className="field">
              <input
      type="password"
      placeholder="Confirm Password"
      required
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
    />
              </div>
              <div className="field btn">
                <div className="btn-layer" />
                <input type="submit" value="SignUp" />
              </div>
              <div className="signup-link">
                Already have an account?{" "}
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(true);
                  setMessage("");
                }}>
                  Login
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
