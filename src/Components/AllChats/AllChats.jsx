import React, { useState } from "react";
import "./AllChats.css";
import SampleImage from "../../Assets/Images/sreejith.jpg";

const mockConversations = [
  { id: 1, name: "Alice", lastMessage: "Hey, how are you?", number: 2 },
  { id: 2, name: "Bob", lastMessage: "Let’s meet up tomorrow.", number: 2 },
  { id: 3, name: "Charlie", lastMessage: "Check this out!", number: 4 },
  {
    id: 4,
    name: "David",
    lastMessage: "Are you coming to the party?",
    number: 5,
  },
  { id: 5, name: "Eva", lastMessage: "I finished the report.", number: 1 },
  {
    id: 6,
    name: "Frank",
    lastMessage: "Can you send me the files?",
    number: 2,
  },
  {
    id: 7,
    name: "Grace",
    lastMessage: "Great job on the presentation!",
    number: 7,
  },
  { id: 8, name: "Hannah", lastMessage: "Let’s catch up soon.", number: 5 },
  { id: 9, name: "Isaac", lastMessage: "Don’t forget our meeting.", number: 3 },
  { id: 10, name: "Jasmine", lastMessage: "I have exciting news!", number: 4 },
  {
    id: 11,
    name: "Kevin",
    lastMessage: "How’s the new project going?",
    number: 5,
  },
];

function AllChats() {
  const [conversations] = useState(mockConversations);

  if (conversations.length === 0)
    return (
      <div>
        <h1>Empty Chats</h1>
      </div>
    );
  return (
    <div className="chat">
      <div className="allChats">
        <h2>Chats</h2>
        <div>
          {conversations.map((conversation) => (
            <div key={conversation.id} className="conversation">
              <div className="chatLeftSec">
                <img
                  src={SampleImage}
                  alt="SampleImage"
                  className="allChatsImage"
                />
                <div className="chatsSec">
                  <h3>{conversation.name}</h3>
                  <p>{conversation.lastMessage}</p>
                </div>
              </div>
              <div className="chatRight">
                <p>{conversation.number} unread messages</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="singleChat">
        <h1>Chat.com</h1>
        <p>Click on a chat to make a conversation.</p>
      </div>
    </div>
  );
}

export default AllChats;
