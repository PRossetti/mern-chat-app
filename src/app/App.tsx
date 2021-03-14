import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { io } from 'socket.io-client';
import axios from 'axios';
import './App.scss';

const socket = io('http://localhost:8080');

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('new-message', (newMessage) => {
      console.log('llegó un nuevo mensaje', newMessage);
      setMessages((prevMessages) => {
        return [...prevMessages, newMessage];
      });
    });

    (async () => {
      const { data: fetchedMessages } = await axios.get('/api/messages');
      console.log(fetchedMessages);
      setMessages(fetchedMessages);
    })();
  }, []);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}
