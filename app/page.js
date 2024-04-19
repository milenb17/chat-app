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
    <div className="flex justify-center h-full w-full items-center">
      <Card className="p-16">
        <CardHeader className="mb-8 justify-center text-xl">
          Please Select Your Role
        </CardHeader>
        <CardBody className="flex gap-8 flex-row">
          <Card
            isPressable
            onPress={(e) => handleRoleSelect(e)}
            value="patient"
            className="h-64 w-64"
          >
            <CardBody className="justify-center items-center">
              <IoMdPerson size="8em" />
            </CardBody>
            <CardFooter className="justify-center items-center text-lg">
              Patient
            </CardFooter>
          </Card>
          <Card
            isPressable
            onPress={(e) => handleRoleSelect(e)}
            value="physician"
            className="h-64 w-64"
          >
            <CardBody className="justify-center items-center">
              <FaUserDoctor size="6em" />
            </CardBody>
            <CardFooter className="justify-center items-center text-lg">
              Physician
            </CardFooter>
          </Card>
        </CardBody>
      </Card>
    </div>
  );
};
export default Home;
