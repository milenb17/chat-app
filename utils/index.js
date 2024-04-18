import { promises as fs } from "fs";

export async function getFilteredUsers(role) {
  const file = await fs.readFile(process.cwd() + "/data/users.json", "utf8");
  const users = JSON.parse(file);
  const filteredUsers = users.filter((user) => user.role === role);
  return filteredUsers;
}

export async function getUser(userId) {
  const file = await fs.readFile(process.cwd() + "/data/users.json", "utf8");
  const users = JSON.parse(file);
  const user = users.find((user) => user.id == userId);
  return user;
}

export async function getConversations(userId) {
  const user = await getUser(userId);
  console.log(user);
  const convoIds = user.conversations;
  const file = await fs.readFile(
    process.cwd() + "/data/conversations.json",
    "utf8"
  );
  const conversations = JSON.parse(file);
  const filteredConversations = conversations.filter((c) =>
    convoIds.includes(c.id)
  );
  return filteredConversations;
}
