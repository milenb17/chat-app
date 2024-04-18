" use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

const Message = ({ message, sender }) => {
  const dateStamp = new Date(message.time).toLocaleString();
  return (
    <Card class={sender ? "bg-cyan-600" : "bg-stone-400"}>
      <CardBody>{message.text}</CardBody>
      <CardFooter>{dateStamp}</CardFooter>
    </Card>
  );
};

export default Message;
