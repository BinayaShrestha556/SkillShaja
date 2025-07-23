import LoginForm from "@/components/auth/login/login-form";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="lg:w-1/3 md:w-1/2 w-[100%-1rem] m-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default page;
