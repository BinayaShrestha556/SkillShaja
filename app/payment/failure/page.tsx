"use client";

import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    setTimeout(() => {
      redirect("/");
    }, 3000);
  }, []);
  return (
    <div className="h-screen w-screen flex items-center justify-center ">
      failed
    </div>
  );
};

export default Page;
