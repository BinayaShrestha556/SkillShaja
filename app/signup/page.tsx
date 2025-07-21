import RegisterForm from "@/components/auth/login/register-form";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="w-1/3 m-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
};

export default page;
