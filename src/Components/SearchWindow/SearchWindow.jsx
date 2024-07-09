import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "./SearchWindow.css";
import { CloseIcon } from "../../Assets/Icons";
import { useNavigate } from "react-router-dom";

function SearchWindow() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const searchUsers = async () => {
      const trimmedSearchTerm = searchTerm.trim();
      if (trimmedSearchTerm === "") {
        setSearchResults([]);
        return;
      }

      try {
        const usersRef = collection(db, "users");
        const q = query(
          usersRef,
          where("phoneNumber", "==", trimmedSearchTerm)
        );
        const querySnapshot = await getDocs(q);

        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });

        setSearchResults(results);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    };

    const timeoutId = setTimeout(() => {
      searchUsers();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleUserSelect = (user) => {
    navigate("/home", { state: { selectedUser: user } });
  };

  const onClose = () => {
    navigate("/home");
  };

  return (
    <div className="searchUserWindow">
      <div className="searchUserWindowContent">
        <button className="closeBtn" onClick={onClose}>
          <CloseIcon />
        </button>
        <label>Search User by Phone Number</label>
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="searchResults">
          <ul>
            {searchResults.length > 0 ? (
              searchResults.map((user) => (
                <li key={user.id} onClick={() => handleUserSelect(user)}>
                  <p>{user.username}</p>
                  <p>{user.phoneNumber}</p>
                </li>
              ))
            ) : (
              <p>No users found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchWindow;
