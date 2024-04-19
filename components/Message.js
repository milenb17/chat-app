" use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

const Message = ({ message, sender }) => {
  function customToTimeString(date) {
    const timeString = date.toLocaleTimeString();
    // Extract hours, minutes, and AM/PM portions
    const [time, ampm] = timeString.split(" ");
    // Extract hours and minutes only
    const [hours, minutes] = time.split(":");
    // Return formatted time without seconds
    return `${hours}:${minutes} ${ampm}`;
  }
  const dateStamp = customToTimeString(new Date(message.time));
  return (
    <div className={`w-full md:w-3/5 flex-none ${sender ? "self-end " : ""}`}>
      <Card
        style={{
          backgroundColor: sender ? "#0A7CFF" : "#F0F0F0",
          color: sender ? "#FFFFFF" : "#050505",
        }}
      >
        <CardBody className="">{message.text}</CardBody>
      </Card>
      <p
        style={{ color: "#65676B" }}
        className={`text-sm ${sender ? "text-right " : ""}`}
      >
        {dateStamp}
      </p>
    </div>
  );
};

export default Message;
