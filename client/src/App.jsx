import { Message, SendMessage } from "MessageManager";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const currentUser = prompt("Username: ");
    setUser(currentUser);
  }, []); 

  return (
    <div className="app">
      <div className="message-box">
        {messages.map((messageData, index) => {
          const message = messageData.message;
          const currentUser = messageData.user;
          const isMe = currentUser === user ? true : false;

          return <Message key={index} message={message} isMe={isMe} />;
        })}
      </div>
      <SendMessage setMessages={setMessages} user={user} />
    </div>
  );
}

export default App;
