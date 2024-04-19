"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { Logo } from "@public/livewell-logo-black";

const Nav = () => {
  return (
    <Navbar className="w-screen justify-start bg-F7F7F7">
      <NavbarBrand className="pt-4">
        <Link href="/">
          <Logo />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem>Dashboard</NavbarItem>
        <NavbarItem isActive>
          <strong>Messages</strong>
        </NavbarItem>
        <NavbarItem>Profile</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
