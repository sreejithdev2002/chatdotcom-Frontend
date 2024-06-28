import React from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="register">
      <h1>
        <span id="registerHeading">Chat.com</span> - Register
      </h1>
      <div className="form">
        <form>
          <h2>Enter Your Details</h2>
          <div className="registerInput">
            <label>Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Your Username"
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
            />
          </div>
          <br />
          <div className="registerInput">
            <label>Phone Number</label>
            <input
              name="phonenumber"
              id="phonenumber"
              placeholder="Enter Your Phone Number"
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
            />
          </div>
          <br />
          <div className="registerInput">
            <label>Confirm Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password Again"
            />
          </div>
          <br />
          <div className="registerInput">
            <button id="registerCreateBtn">Create Account</button>
          </div>
          <p id="or">or</p>
          <div className="registerInput">
            <button id="regLoginBtn" onClick={goToLogin}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
