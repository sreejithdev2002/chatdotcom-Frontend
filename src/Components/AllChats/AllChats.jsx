import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import "./AllChats.css";
import SampleImage from "../../Assets/Images/placeholder.png";
import { SendIcon } from "../../Assets/Icons";
import {  useLocation } from "react-router-dom";

function AllChats() {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "conversations"));
        const fetchedConversations = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setConversations(fetchedConversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    if (location.state && location.state.selectedUser) {
      const user = location.state.selectedUser;
      setSelectedUser(user);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser && auth.currentUser) {
        try {
          const q = query(
            collection(db, "messages"),
            where("chatId", "in", [
              `${auth.currentUser.uid}_${selectedUser.id}`,
              `${selectedUser.id}_${auth.currentUser.uid}`,
            ]),
            orderBy("timestamp", "asc")
          );
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedMessages = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setMessages(fetchedMessages);
          });

          return () => unsubscribe();
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [selectedUser, auth.currentUser]);

  const handleClick = async () => {
    if (!selectedUser || !messageInput.trim()) {
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "messages"), {
        sender: auth.currentUser.uid,
        receiver: selectedUser.id,
        message: messageInput.trim(),
        chatId: `${selectedUser.id}_${auth.currentUser.uid}`,
        timestamp: Timestamp.now(),
      });
      console.log("Message sent with ID: ", docRef.id);

      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat">
      <div className="allChats">
        <h2>Chats</h2>
        <div className="chatsonly">
          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="conversation"
                onClick={() => setSelectedUser(conversation)}
              >
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
            ))
          ) : (
            <p>No conversations found.</p>
          )}
        </div>
      </div>
      <div className="singleChat">
        {selectedUser ? (
          <>
            <div className="messageHeader">
              <div className="messageHeaderLeft">
                <img src={SampleImage} alt="Sreejith" />
                <div className="messageHeaderLeftName">
                  <h3>{selectedUser.username}</h3>
                  <p>Online</p>
                </div>
              </div>
              <div className="messageHeaderRight"></div>
            </div>
            <div className="messageChats">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.sender === auth.currentUser.uid
                      ? "sentMessage"
                      : "receivedMessage"
                  }
                >
                  <p>{message.message}</p>
                </div>
              ))}
            </div>

            <div className="messageInput">
              <input
                type="text"
                placeholder="Type a message"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <div onClick={handleClick}>
                <SendIcon />
              </div>
            </div>
          </>
        ) : (
          <div className="noMessage">
            <h1>Chat.com</h1>
            <p>Click on a chat to start a conversation.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllChats;
