import { auth } from "@/auth";
import prisma from "@/lib/db/db";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/signin");
  return (
    <>
      <h1>signed in as: {session.user?.name}</h1>
    </>
  );
};

export default page;
