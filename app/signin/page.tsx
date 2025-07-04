import { signIn } from "@/auth";
import LoginForm from "@/components/auth/login/login-form";
import React from "react";

const page = () => {
  return (
    <div className="w-1/3 m-auto">
      <LoginForm />
    </div>
  );
};

export default page;
