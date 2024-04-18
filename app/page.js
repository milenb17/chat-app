"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Login from "@components/Login";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  divider,
} from "@nextui-org/react";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";

const Home = () => {
  const router = useRouter();
  /*const [user, setUser] = useState({
    role: "",
    userName: "",
    password: "",
    converstations: [],
  });*/

  const handleRoleSelect = (e) => {
    const role = e.target.value;
    console.log(role);
    router.push(`/${role}/login`);
  };
  return (
    <div>
      <h1>I am a...</h1>
      <div className="flex flex-row">
        <Card isPressable onPress={(e) => handleRoleSelect(e)} value="patient">
          <CardBody>
            <IoMdPerson />
          </CardBody>
          <CardFooter>Patient</CardFooter>
        </Card>
        <Card
          isPressable
          onPress={(e) => handleRoleSelect(e)}
          value="physician"
        >
          <CardBody>
            <FaUserDoctor />
          </CardBody>
          <CardFooter>Physician</CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default Home;
