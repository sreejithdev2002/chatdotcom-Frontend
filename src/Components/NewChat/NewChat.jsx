import React, { useState } from "react";
import "./NewChat.css";
import SearchWindow from "../SearchWindow/SearchWindow";

function NewChat() {

    const [searchWindow, setSearchWindow] = useState(false);

    const toggleSearchWindow = () => {
        setSearchWindow(!searchWindow);
    };

  return (
    <div className="newChat">
      <button className="newChatBtn" onClick={toggleSearchWindow}>
        +
      </button>
      {searchWindow && <SearchWindow onClose={toggleSearchWindow}/>}
    </div>
  );
}

export default NewChat;
