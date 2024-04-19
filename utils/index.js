import { promises as fs } from "fs";
import users from "@data/users.json";
import conversations from "@data/conversations.json";

export async function getFilteredUsers(role) {
  // const file = await fs.readFile(process.cwd() + "/data/users.json", "utf8");
  // const users = JSON.parse(file);
  const filteredUsers = users.filter((user) => user.role === role);
  return filteredUsers;
}

export async function getUser(userId) {
  //const file = await fs.readFile(process.cwd() + "/data/users.json", "utf8");
  //const users = JSON.parse(file);
  const user = users.find((user) => user.id == userId);
  return user;
}

export async function getConversations(userId) {
  const user = await getUser(userId);
  console.log(user);
  const convoIds = user.conversations;
  const filteredConversations = conversations.filter((c) =>
    convoIds.includes(c.id)
  );
  return filteredConversations;
}
