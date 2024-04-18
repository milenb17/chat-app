import React from "react";
import Login from "@components/Login";
import { getFilteredUsers } from "@utils";

const page = async ({ params }) => {
  const { role } = params;
  const filteredUsers = await getFilteredUsers(role);
  console.log(filteredUsers);
  return <Login role={role} users={filteredUsers}></Login>;
};

export default page;
