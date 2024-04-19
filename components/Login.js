"use client";
import { useState } from "react";
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Card,
  CardBody,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";

const Login = ({ role, users }) => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) =>
        user.userName.toLowerCase() === formData.userName.toLowerCase() &&
        user.password === formData.password
    );
    if (user) {
      router.push(`/${role}/${user.id}`);
    } else {
      onOpen();
    }
  };
  return (
    <div className="flex justify-center h-full w-full items-center">
      <Card className="p-16">
        <form className="gap-8 flex flex-col" onSubmit={(e) => handleSubmit(e)}>
          <p className=" text-center text-2xl">Login</p>
          <div className="flex flex-col gap-4">
            <Input
              name="userName"
              type="text"
              label="Name"
              placeholder="Enter your name"
              value={formData.userName}
              onChange={(e) => handleChange(e)}
              className="w-[400px]"
            />
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <Button color="primary" type="submit">
            Log In
          </Button>
        </form>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Invalid Name or Password
              </ModalHeader>
              <ModalBody>
                <p>For test purposes, you can use the following credentials:</p>
                <p>Physician: Name: Dr. Smith, Password: test</p>
                <p>Patient: Name: John Doe, Password: test</p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Login;
