import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const goToRegister = ()=>{
        navigate("/register");
    }
  return (
    <div className="login">
      <h1>
        <span id="loginHeading">Chat.com</span> - Login
      </h1>
      <div className="form">
        <form>
            <h2>Enter Your Details</h2>
          <div className="loginInput">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="youremail@gmail.com"
            />
          </div>
          <br />
          <div className="loginInput">
            <label>Phone Number</label>
            <input
              name="phonenumber"
              id="phonenumber"
              placeholder="Enter Your Phone Number"
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
            />
          </div>
          <br />
          <div className="loginInput">
            <button id="logSubmitBtn">Submit</button>
          </div>
          <p id="or">or</p>
          <div className="loginInput">
            <button id="logCreatedBtn" onClick={goToRegister}>Create a New Account</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
