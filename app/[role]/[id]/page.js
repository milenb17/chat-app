import React from "react";
import Chat from "@components/Chat";
import SideBar from "@components/SideBar";
import { getUser, getConversations, getFilteredUsers } from "@utils";

const page = async ({ params }) => {
  const { role, id } = params;
  const user = await getUser(id);
  const conversations = await getConversations(id);
  console.log(conversations);

  const contactable = role === "patient" ? "physician" : "patient";
  const contacts = await getFilteredUsers(contactable);
  const populatedConvos = conversations.map((convo) => {
    return {
      ...convo,
      contact: contacts.find((contact) => contact.id == convo[contactable]),
    };
  });
  return (
    <>
      <SideBar
        user={user}
        conversations={conversations}
        contacts={contacts}
        populatedConvos={populatedConvos}
      ></SideBar>
    </>
  );
};

export default page;
