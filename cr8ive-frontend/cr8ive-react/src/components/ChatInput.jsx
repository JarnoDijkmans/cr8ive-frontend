import React, { useState, useEffect, useRef } from 'react';
import './styles/ChatInput.css'; 

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [message]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className="ChatInput-container">
      <input
        className="ChatInput-input"
        ref={inputRef}
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Type your message..."
      />
      <button className="ChatInput-button" onClick={handleSendClick}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;