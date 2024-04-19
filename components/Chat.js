"use client";
import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  ScrollShadow,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import Message from "./Message";

const Chat = ({ convo, user, addMessage, empty }) => {
  const [newMessage, setNewMessage] = useState("");
  const handleType = (e) => {
    setNewMessage(e.target.value);
  };
  // clear input when new convo is selected
  useEffect(() => {
    setNewMessage("");
  }, [convo]);

  const handleNewMessage = (message) => {
    if (message == "") return;
    addMessage(message);
    setNewMessage("");
  };
  return (
    // if empty, return empty card of same size
    empty ? (
      <Card className=" justify-center items-center h-full max-h-full">
        Select a conversation to get started
      </Card>
    ) : (
      <Card className=" h-full max-h-full">
        <CardHeader className="gap-2 text-lg p-4">
          <Avatar src={convo.contact.avatar} />
          {convo.contact.userName}
        </CardHeader>
        <Divider></Divider>
        <CardBody className="flex flex-col gap-4 flex-initial h-full overflow-y-scroll">
          {convo.messages.map((message) => {
            return (
              <Message
                key={message.id}
                message={message}
                sender={user.role == message.sender}
              ></Message>
            );
          })}
        </CardBody>
        <Divider></Divider>
        <CardFooter>
          <Input
            value={newMessage}
            onChange={handleType}
            placeholder="Type a message"
          ></Input>
          <Button onClick={() => handleNewMessage(newMessage)}>Send</Button>
        </CardFooter>
      </Card>
    )
  );
};

export default Chat;
