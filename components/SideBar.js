"use client";
import { useState, useEffect } from "react";
import {
  Listbox,
  ListboxSection,
  ListboxItem,
  Avatar,
  AvatarGroup,
} from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@nextui-org/react";
import { GoPlus } from "react-icons/go";
import Chat from "./Chat";

/* See /data to see how users and conversations are stored. 
- Here, contactable users, current users conversations, and a conversations' messages are stored in arrays in state
- "Contactable users" are users with the opposite roles of the current user (eg doctors can contact patients and vice versa)
- "Populated conversations" are conversations with the contactable users' information attached to them, as it is initially stored as just an id
*/
const SideBar = ({ user, conversations, contacts, populatedConvos }) => {
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [conversationList, setConversationList] = useState(populatedConvos);
  const [newConvo, setNewConvo] = useState("");
  const [replied, setReplied] = useState(false);
  const oppositeRole = user.role === "patient" ? "physician" : "patient";
  const handleSelectionChange = (keys) => {
    console.log("List selection changed", keys);
    setSelectedId(keys);
    const id = Array.from(keys)[0];
    const convo = conversationList.find((convo) => convo.id == id);
    setSelectedConvo(convo);
    setReplied(false);
  };
  const handleNewMessage = (message) => {
    console.log("New message", message);
    const newConversationList = conversationList.map((convo) => {
      if (convo.id === selectedConvo.id) {
        const newMessage = {
          id: Date.now().toString(36),
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
    if (user.role == "patient" && !replied) {
      setReplied(true);
      setTimeout(handleReply, 3000);
    }
  };
  const handleReply = () => {
    const message = `Hi ${
      user.userName.split(" ")[0]
    }, we have recieved your message and will get back to you shortly. If this is an emergency please contact 9-1-1.`;
    setReplied(true);
    const newConversationList = conversationList.map((convo) => {
      if (convo.id === selectedConvo.id) {
        const newMessage = {
          id: Date.now().toString(36),
          time: new Date().toISOString(),
          text: message,
          sender: "physician",
          isText: true,
        };
        convo.messages.push(newMessage);
      }
      return convo;
    });
    setConversationList(newConversationList);
  };
  // For autocomplete input of new conversation
  const onInputChange = (contact) => {
    console.log("Input change", contact);
    setNewConvo(contact);
  };

  const handleNewConversation = (contact) => {
    console.log("New conversation", contact);
    if (contact === null) {
      return;
    }
    const existingConvo = conversationList.find(
      (conv) => conv.contact.id == contact
    );
    if (existingConvo) {
      handleSelectionChange(new Set([existingConvo.id.toString()]));
    } else {
      const newConvo = {
        id: Date.now().toString(36),
        patient: user.role === "patient" ? user.id : Number(contact),
        physician: user.role === "physician" ? user.id : contact,
        contact: contacts.find((c) => c.id == contact),
        messages: [],
      };
      conversationList.push(newConvo);
      setConversationList(conversationList);
      handleSelectionChange(new Set([newConvo.id.toString()]));
    }
  };
  return (
    <div className="flex p-4 gap-4 h-full w-full overflow-hidden">
      <Card className="flex flex-initial w-1/4 p-4 gap-4 ">
        <Autocomplete
          disableSelectorIconRotation
          selectorIcon={<GoPlus />}
          aria-label="New Conversation"
          defaultItems={contacts}
          placeholder="New Conversation"
          onInputChange={onInputChange}
          onSelectionChange={handleNewConversation}
          inputValue={newConvo}
        >
          {(contact) => (
            <AutocompleteItem key={contact.id} value={contact.id}>
              {contact.userName}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Divider />
        <Listbox
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedId}
          items={conversationList}
          aria-label="Dynamic Actions"
          onSelectionChange={(key) => handleSelectionChange(key)}
          itemClasses={{ base: "data-[selected=true]:bg-default" }}
        >
          {(item) => (
            <ListboxItem
              startContent={<Avatar src={item.contact.avatar} />}
              key={item.id}
            >
              {item.contact.userName}
            </ListboxItem>
          )}
        </Listbox>
      </Card>
      <div className="flex-initial w-3/4">
        <Chat
          empty={selectedConvo === null}
          convo={selectedConvo}
          user={user}
          addMessage={handleNewMessage}
        ></Chat>
      </div>
    </div>
  );
};

export default SideBar;
