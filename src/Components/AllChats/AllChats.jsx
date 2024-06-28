import React, { useState } from 'react';
import './AllChats.css';

const mockConversations = [
    { id: 1, name: 'Alice', lastMessage: 'Hey, how are you?' },
    { id: 2, name: 'Bob', lastMessage: 'Let’s meet up tomorrow.' },
    { id: 3, name: 'Charlie', lastMessage: 'Check this out!' },
];

function AllChats() {
    const [conversations] = useState(mockConversations);
  return (
    <div className='allChats'>
      <h2>All Chats</h2>
      <div>
        {conversations.map(conversation => (
            <div key={conversation.id} className='conversation'>
                <h3>{conversation.name}</h3>
                <p>{conversation.lastMessage}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default AllChats
