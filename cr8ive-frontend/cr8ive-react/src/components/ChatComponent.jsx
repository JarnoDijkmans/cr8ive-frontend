import React from 'react';

const ChatComponent = ({ messages }) => {
    // Check if messages is not an array or is empty
    if (!Array.isArray(messages) || messages.length === 0) {
      return (
        <div>
          <p>No messages yet. Start the conversation!</p>
        </div>
      );
    }
  
    return (
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <p>{message.senderId}: {message.content}</p>
          </li>
        ))}
      </ul>
    );
  };
  
  export default ChatComponent;