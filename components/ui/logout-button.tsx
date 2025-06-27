"use client";
import React from "react";
import { Button } from "./button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <Button variant={"destructive"} size={"lg"} onClick={() => signOut()}>
      sign out
    </Button>
  );
};

export default LogoutButton;
