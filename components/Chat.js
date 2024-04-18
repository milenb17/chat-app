"use client";
import { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import Message from "./Message";

const Chat = ({ convo, user, addMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const handleType = (e) => {
    setNewMessage(e.target.value);
  };
  // clear input when new convo is selected
  useEffect(() => {
    setNewMessage("");
  }, [convo]);

  const handleNewMessage = (message) => {
    addMessage(message);
    setNewMessage("");
  };
  return (
    <div>
      <h1>{convo.contact.userName}</h1>
      <div>
        {convo.messages.map((message) => {
          return (
            <Message
              key={message.id}
              message={message}
              sender={user.role == message.sender}
            ></Message>
          );
        })}
      </div>
      <Input
        value={newMessage}
        onChange={handleType}
        placeholder="Type a message"
      ></Input>
      <Button onClick={() => handleNewMessage(newMessage)}>Send</Button>
    </div>
  );
};

export default Chat;
