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
    const user = users.find(
      (user) =>
        user.userName === formData.userName &&
        user.password === formData.password
    );
    if (user) {
      router.push(`/${role}/${user.id}`);
    } else {
      onOpen();
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Login {role}</h1>
        <Input
          name="userName"
          type="text"
          label="Name"
          placeholder="Enter your name"
          value={formData.userName}
          onChange={(e) => handleChange(e)}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleChange(e)}
        />
        <Button onPress={(e) => handleSubmit(e)}>Log In</Button>
      </form>
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
    </>
  );
};

export default Login;
