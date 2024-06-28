import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    const handleLogout = ()=>{
        navigate("/login")
    }
  return (
    <div className="header">
      <h1>Chat.com</h1>
      <div className="headerBtn">
        <h3>Username</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Header;
