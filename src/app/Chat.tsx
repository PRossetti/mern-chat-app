import { Avatar, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.scss';

const Message = ({ name, message, received, timestamp = new Date().toUTCString() }) => {
  return (
    <p className={`chat__message ${received ? 'chat__receiver' : ''}`}>
      <span className="chat__name">{name}</span>
      {message}
      <span className="chat__timestamp">{timestamp}</span>
    </p>
  );
};

const renderMessages = (messages) => {
  return messages.map(({ name, message, received, timestamp }, index) => {
    return <Message key={index} name={name} message={message} received={received} timestamp={timestamp} />;
  });
};

export default function Chat({ messages }) {
  const [input, setInput] = useState('');
  console.log('estoy en chat y estos son los messages', messages);

  const sendMessage = () => console.log('se debería mandar el mensaje');

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {renderMessages(messages)}
        {/* <p className="chat__message">
          <span className="chat__name">Pepo</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat__message chat__receiver">
          <span className="chat__name">Pepo</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat__message">
          <span className="chat__name">Pepo</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p> */}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribí un mensaje"
          />
          <button onClick={sendMessage} type="submit">
            Mandar mensaje
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}
