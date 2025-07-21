import LoginForm from "@/components/auth/login/login-form";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="w-1/3 m-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default page;
