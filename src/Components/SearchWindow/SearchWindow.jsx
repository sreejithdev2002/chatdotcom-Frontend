// import React, { useState } from "react";
// import './SearchWindow.css';

// function SearchWindow({ onClose }) {
//   // const [searchTerm, setSearchTerm] = useState("");

//   return (
//     <div className="searchUserWindow">
//       <div className="searchUserWindowContent">
//         <button className="closeBtn" onClick={onClose}>
//           X
//         </button>
//         <label>Search User</label>
//         <input
//           type="text"
//           placeholder="Search number"
//           //   value={searchTerm}
//           //   onChange={handleSearchChange}
//         />
//         <button
//         id="searchUserSearchBtn"
//         // onClick={handleSearch}
//         >
//           Search
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SearchWindow;


import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the import path as needed
import './SearchWindow.css';

function SearchWindow({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchUsers = async () => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("phoneNumber", "==", searchTerm));
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
    }, 300); // Delay in milliseconds before triggering search (e.g., 300ms)

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="searchUserWindow">
      <div className="searchUserWindowContent">
        <button className="closeBtn" onClick={onClose}>
          X
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
                <li key={user.id}>
                  <p>{user.username}</p>
                  <p>{user.phoneNumber}</p>
                  {/* Add additional details you want to display */}
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

