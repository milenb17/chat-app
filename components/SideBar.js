"use client";
import { useState, useEffect } from "react";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";
import Chat from "./Chat";

const SideBar = ({ user, conversations, contacts, populatedConvos }) => {
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [conversationList, setConversationList] = useState(populatedConvos);
  const messageCount = 5;
  const handleSelectionChange = (id) => {
    const convo = conversationList.find((convo) => convo.id == id);
    console.log(convo);
    setSelectedConvo(convo);
  };
  const handleNewMessage = (message) => {
    const newConversationList = conversationList.map((convo) => {
      if (convo.id === selectedConvo.id) {
        const newMessage = {
          id: messageCount,
          time: new Date().toISOString(),
          text: message,
          sender: user.role,
          isText: true,
        };
        convo.messages.push(newMessage);
      }
      return convo;
    });
    setConversationList(newConversationList);
  };
  return (
    <div>
      <Listbox
        disallowEmptySelection
        selectionMode="single"
        items={conversationList}
        aria-label="Dynamic Actions"
        onAction={(key) => handleSelectionChange(key)}
      >
        {(item) => (
          <ListboxItem key={item.id}>{item.contact.userName}</ListboxItem>
        )}
      </Listbox>
      <div>
        {selectedConvo ? (
          <Chat
            convo={selectedConvo}
            user={user}
            addMessage={handleNewMessage}
          ></Chat>
        ) : (
          <div>Select a conversation</div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
