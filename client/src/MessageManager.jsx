import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import "./App.css";
import sendImage from "assets/send.png";
import axios from "axios";

const socket = io.connect("http://localhost:5000");

const SendMessage = ({ setMessages, user }) => {
  const [message, setMessage] = useState("");

  const getEncryption = async (message) => {
    const url = `http://localhost:8000/encrypt`;
    const response = await axios.post(url, {message});

    const cipher = response.data.cipher;
    return cipher;
  
  }

  const getDecryption = async (cipher) => {
    const url = `http://localhost:8000/decrypt`;
    const response = await axios.post(url, {cipher});

    const result = response.data.message;
    return result;
  }

  const sendMessageToServer = async () => {
    const cipher = await getEncryption(message);
    const encryptedMessageData = {
      message: cipher,
      user: user
    };

    console.log(encryptedMessageData);

    const messageData = {
      message: message,
      user: user
    };

    socket.emit("send-message", encryptedMessageData);
    setMessages(prev => [...prev, messageData]);
  };

  useEffect(() => {
    const receiveMessageHandler = async (data) => {
      const receivedMessage = data.message;
      const receivedUser = data.user;
      const message = await getDecryption(receivedMessage);
      setMessages(prev => [...prev, { message: message, user: receivedUser }]);
    };

    socket.on("receive-message", receiveMessageHandler);

    return () => {
      socket.off("receive-message", receiveMessageHandler);
    };
  }, [setMessages, user]);

  return (
    <div className="send-message">
      <textarea
        className="send-input"
        placeholder="Message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="button" onClick={() => {
        sendMessageToServer()
        setMessage("")
      }}>
        <img className="send-image" src={sendImage} alt="send-message" />
      </button>
    </div>
  );
};

const Message = ({message, isMe}) => {
  return(
    <div className={`message ${isMe? "right":"left"}`}>
      {message}
    </div>
  )
};

export { SendMessage, Message };
