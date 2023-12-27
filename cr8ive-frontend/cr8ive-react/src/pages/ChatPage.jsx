import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import ChatComponent from '../components/ChatComponent';
import ProfilePictureChat from '../components/ProfilePictureChat';
import ChatInput from '../components/ChatInput';
import ChatService from '../services/ChatService';
import './css/ChatPage.css'
import LocalStorageService from '../services/LocalStorageService';

const ChatPage = ({receiverId, onClose }) => {
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [isOpen, setIsOpen] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const localUserId = LocalStorageService.DecodeAccessTokenReturnUserId();

  useEffect(() => {
    ChatService.fetchMessages(receiverId)
      .then(data => {
        setMessagesReceived(data.messages || []);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, [receiverId, isOpen]);


  useEffect(() => {
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      console.log('Connected!');
      stompClient.subscribe(`/user/${localUserId}/queue/chat`, (data) => {
        onMessageReceived(data);
      });
    };

    stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ', frame.headers['message']);
    };

    stompClient.activate();

    setStompClient(stompClient);

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, [receiverId]);

  const onSendMessage = (newMessage) => {
    const payload = {
      senderId: localUserId,
      receiverId: receiverId,
      text: newMessage
     };
     
     stompClient.publish({
      destination: `/user/${payload.receiverId}/queue/chat`,
      body: JSON.stringify(payload)
     });

     stompClient.publish({
      destination: `/user/${localUserId}/queue/chat`,
      body: JSON.stringify(payload),
    });

    ChatService.saveMessages(receiverId, newMessage)
      .then(data => {
        console.log('Message sent successfully:', data);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessagesReceived(messagesReceived => [...messagesReceived,{senderId: message.senderId, receiverId: message.receiverId, content: message.text, timestamp: new Date().toISOString()}]);
  };

  const handleDisconnect = () => {
    if (stompClient && stompClient.connected) {
      stompClient.deactivate();
    }
    onClose();
  };

  return (
    <div className="chat-overlay">
      <ProfilePictureChat localUserId={localUserId} receiverUserId={receiverId}/>
        <div className='chat-content'>
          <ChatComponent messages={messagesReceived} receiverId={receiverId} localUserId={localUserId} />
        </div>
        <ChatInput onSendMessage={onSendMessage} />
        <button onClick={handleDisconnect} className='close-chat-button'>X</button>
    </div>
  );
};

export default ChatPage;