import { auth } from "@/auth";
import LogoutButton from "@/components/ui/logout-button";
import LandingPage from "@/components/landingpage";
import prisma from "@/lib/db/db";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  if (!session)
    return (
      <div>
        <LandingPage />
      </div>
    );

  redirect("/explore");
};

export default page;
