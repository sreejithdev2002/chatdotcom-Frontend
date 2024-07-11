// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   addDoc,
//   Timestamp,
//   onSnapshot,
//   doc,
//   getDoc,
//   orderBy,
// } from "firebase/firestore";
// import { db, auth } from "../../firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import "./AllChats.css";
// import SampleImage from "../../Assets/Images/placeholder.png";
// import { SendIcon } from "../../Assets/Icons";
// import { useLocation } from "react-router-dom";

// function AllChats() {
//   const [conversations, setConversations] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState("");
//   const [user, setUser] = useState(null); // Track the current user
//   const location = useLocation();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//         fetchConversations(user);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const fetchConversations = async (currentUser) => {
//     try {
//       const q1 = query(
//         collection(db, "messages"),
//         where("sender", "==", currentUser.uid)
//       );
//       const q2 = query(
//         collection(db, "messages"),
//         where("receiver", "==", currentUser.uid)
//       );

//       const [querySnapshot1, querySnapshot2] = await Promise.all([
//         getDocs(q1),
//         getDocs(q2),
//       ]);

//       const messages = [...querySnapshot1.docs, ...querySnapshot2.docs];
//       const users = new Set();

//       messages.forEach((doc) => {
//         const data = doc.data();
//         if (data.sender !== currentUser.uid) {
//           users.add(data.sender);
//         }
//         if (data.receiver !== currentUser.uid) {
//           users.add(data.receiver);
//         }
//       });

//       const userPromises = Array.from(users).map(async (userId) => {
//         const userDoc = await getDoc(doc(db, "users", userId));
//         return { id: userId, ...userDoc.data() };
//       });

//       const fetchedConversations = await Promise.all(userPromises);
//       setConversations(fetchedConversations);
//     } catch (error) {
//       console.error("Error fetching conversations:", error);
//     }
//   };

//   useEffect(() => {
//     if (location.state && location.state.selectedUser) {
//       setSelectedUser(location.state.selectedUser);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (selectedUser && user) {
//         try {
//           const q = query(
//             collection(db, "messages"),
//             where("chatId", "in", [
//               `${user.uid}_${selectedUser.id}`,
//               `${selectedUser.id}_${user.uid}`,
//             ]),
//             orderBy("timestamp", "asc")
//           );

//           const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             const fetchedMessages = querySnapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }));
//             setMessages(fetchedMessages);
//           });

//           return () => unsubscribe();
//         } catch (error) {
//           console.error("Error fetching messages:", error);
//         }
//       }
//     };

//     fetchMessages();
//   }, [selectedUser, user]);

//   const handleClick = async () => {
//     if (!selectedUser || !messageInput.trim()) {
//       return;
//     }

//     try {
//       await addDoc(collection(db, "messages"), {
//         sender: user.uid,
//         receiver: selectedUser.id,
//         message: messageInput.trim(),
//         chatId: `${selectedUser.id}_${user.uid}`,
//         timestamp: Timestamp.now(),
//       });

//       setMessageInput("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="chat">
//       <div className="allChats">
//         <h2>Chats</h2>
//         <div className="chatsonly">
//           {conversations.length > 0 ? (
//             conversations.map((conversation) => (
//               <div
//                 key={conversation.id}
//                 className="conversation"
//                 onClick={() => setSelectedUser(conversation)}
//               >
//                 <div className="chatLeftSec">
//                   <img
//                     src={SampleImage}
//                     alt="SampleImage"
//                     className="allChatsImage"
//                   />
//                   <div className="chatsSec">
//                     <h3>{conversation.name}</h3>
//                     <p>{conversation.lastMessage}</p>
//                   </div>
//                 </div>
//                 <div className="chatRight">
//                   <p>{conversation.number} unread messages</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No conversations found.</p>
//           )}
//         </div>
//       </div>
//       <div className="singleChat">
//         {selectedUser ? (
//           <>
//             <div className="messageHeader">
//               <div className="messageHeaderLeft">
//                 <img src={SampleImage} alt="Sreejith" />
//                 <div className="messageHeaderLeftName">
//                   <h3>{selectedUser.username}</h3>
//                   <p>Online</p>
//                 </div>
//               </div>
//               <div className="messageHeaderRight"></div>
//             </div>
//             <div className="messageChats">
//               {messages.map((message) => (
//                 <p
//                   key={message.id}
//                   className={
//                     message.sender === user.uid
//                       ? "sentMessage"
//                       : "receivedMessage"
//                   }
//                 >
//                   {message.message}
//                 </p>
//               ))}
//             </div>

//             <div className="messageInput">
//               <input
//                 type="text"
//                 placeholder="Type a message"
//                 value={messageInput}
//                 onChange={(e) => setMessageInput(e.target.value)}
//               />
//               <div onClick={handleClick}>
//                 <SendIcon />
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="noMessage">
//             <h1>Chat.com</h1>
//             <p>Click on a chat to start a conversation.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AllChats;




import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
  onSnapshot,
  doc,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./AllChats.css";
import SampleImage from "../../Assets/Images/placeholder.png";
import { SendIcon } from "../../Assets/Icons";
import { useLocation } from "react-router-dom";

function AllChats() {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [user, setUser] = useState(null); // Track the current user
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchConversations(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchConversations = async (currentUser) => {
    try {
      const q1 = query(
        collection(db, "messages"),
        where("sender", "==", currentUser.uid)
      );
      const q2 = query(
        collection(db, "messages"),
        where("receiver", "==", currentUser.uid)
      );

      const [querySnapshot1, querySnapshot2] = await Promise.all([
        getDocs(q1),
        getDocs(q2),
      ]);

      const messages = [...querySnapshot1.docs, ...querySnapshot2.docs];
      const users = new Set();

      messages.forEach((doc) => {
        const data = doc.data();
        if (data.sender !== currentUser.uid) {
          users.add(data.sender);
        }
        if (data.receiver !== currentUser.uid) {
          users.add(data.receiver);
        }
      });

      const userPromises = Array.from(users).map(async (userId) => {
        const userDoc = await getDoc(doc(db, "users", userId));
        return { id: userId, ...userDoc.data() };
      });

      const fetchedConversations = await Promise.all(userPromises);
      setConversations(fetchedConversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  useEffect(() => {
    if (location.state && location.state.selectedUser) {
      setSelectedUser(location.state.selectedUser);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser && user) {
        try {
          const q = query(
            collection(db, "messages"),
            where("chatId", "in", [
              `${user.uid}_${selectedUser.id}`,
              `${selectedUser.id}_${user.uid}`,
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
  }, [selectedUser, user]);

  const handleClick = async () => {
    if (!selectedUser || !messageInput.trim()) {
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        sender: user.uid,
        receiver: selectedUser.id,
        message: messageInput.trim(),
        chatId: `${selectedUser.id}_${user.uid}`,
        timestamp: Timestamp.now(),
      });

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
                    {/* Removed lastMessage section */}
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
                <p
                  key={message.id}
                  className={
                    message.sender === user.uid
                      ? "sentMessage"
                      : "receivedMessage"
                  }
                >
                  {message.message}
                </p>
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
