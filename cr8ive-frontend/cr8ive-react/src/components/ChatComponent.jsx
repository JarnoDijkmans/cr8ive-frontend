import React, { useRef, useEffect, useState } from 'react';
import './styles/ChatComponent.css';
import UserService from '../services/UserService';

const ChatComponent = ({ messages, receiverId, localUserId }) => {
  const chatEndRef = useRef(null);
  const [receiver, setReceiver] = useState(null);
  const [local, setLocalUser] = useState(null);

  useEffect(() => {
    try {
      UserService.getUserById(receiverId).then(data => {setReceiver(data)})
      UserService.getUserById(localUserId).then(data => {setLocalUser(data)})
    } catch (error) {
      console.error('Error fetching user:', error);
      return 'Unknown';
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom(); 
  }, [messages]);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {(!Array.isArray(messages) || messages.length === 0 || receiver === null || local === null) ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="chat-list">
          {messages.map((message, index) => (
            <li key={index} className="message-container">
              {message.senderId !== localUserId ? (
                <p className="sender-name-left">{receiver.firstName}</p>
              ) : (
                <p className="sender-name-right">{local.firstName}</p>
              )}
              <div className={`message ${message.senderId === localUserId ? 'message-right' : 'message-left'}`}>
                <p style={{ margin: 0 }}>{message.content}</p>
              </div>
            </li>
          ))}
          <div ref={chatEndRef} />
        </ul>
      )}
    </div>
  );
}

export default ChatComponent;