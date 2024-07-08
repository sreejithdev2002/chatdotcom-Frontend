import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase"; // Adjust the import path as needed
import "./Header.css";
import SampleImage from '../../Assets/Images/sreejith.jpg';

function Header() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().username);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="header">
      <h1>Chat.com</h1>
      <div className="headerBtn">
        <img className="headerImg" src={SampleImage} alt="Profile" />
        <h3>{userName}</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Header;
