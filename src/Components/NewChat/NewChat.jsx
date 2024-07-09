import React, { useState } from "react";
import "./NewChat.css";
import SearchWindow from "../SearchWindow/SearchWindow";
import { PlusIcon } from "../../Assets/Icons";
import { useNavigate } from "react-router-dom";

function NewChat() {

    const [searchWindow, setSearchWindow] = useState(false);
    const navigate = useNavigate();

    const toggleSearchWindow = () => {
        setSearchWindow(!searchWindow);
    };

  return (
    <div className="newChat">
      <button className="newChatBtn" onClick={() => {
        navigate("/search");
      }}>
        <PlusIcon/>
      </button>
      {searchWindow && <SearchWindow onClose={toggleSearchWindow}/>}
    </div>
  );
}

export default NewChat;
