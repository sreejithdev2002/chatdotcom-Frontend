import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase"; // Adjust the import path as needed
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
        phoneNumber: phoneNumber,
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        createdAt: new Date(),
      });

      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register">
      <h1>
        <span id="registerHeading">Chat.com</span> - Register
      </h1>
      <div className="form">
        <form onSubmit={handleRegister}>
          <h2>Enter Your Details</h2>
          {error && <p className="error">{error}</p>}
          <div className="registerInput">
            <label>Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <br />
          <div className="registerInput">
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
          <div className="registerInput">
            <label>Phone Number</label>
            <input
              name="phonenumber"
              id="phonenumber"
              placeholder="Enter Your Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <br />
          <div className="registerInput">
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
          <div className="registerInput">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Enter Your Password Again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <br />
          <div className="registerInput">
            <button id="registerCreateBtn" type="submit">Create Account</button>
          </div>
          <p id="or">or</p>
          <div className="registerInput">
            <button id="regLoginBtn" type="button" onClick={goToLogin}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
