import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust the import path as needed
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <h1>
        <span id="loginHeading">Chat.com</span> - Login
      </h1>
      <div className="form">
        <form onSubmit={handleLogin}>
          <h2>Enter Your Details</h2>
          {error && <p className="error">{error}</p>}
          <div className="loginInput">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div className="loginInput">
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <div className="loginInput">
            <button id="logSubmitBtn" type="submit">Submit</button>
          </div>
          <p id="or">or</p>
          <div className="loginInput">
            <button id="logCreatedBtn" type="button" onClick={goToRegister}>Create a New Account</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
