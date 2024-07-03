import React, { useState } from "react";
import './SearchWindow.css';

function SearchWindow({ onClose }) {
  // const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="searchUserWindow">
      <div className="searchUserWindowContent">
        <button className="closeBtn" onClick={onClose}>
          X
        </button>
        <label>Search User</label>
        <input
          type="text"
          placeholder="Search number"
          //   value={searchTerm}
          //   onChange={handleSearchChange}
        />
        <button
        id="searchUserSearchBtn"
        // onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchWindow;
