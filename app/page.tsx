import { auth } from "@/auth";

import LandingPage from "@/components/landingpage";

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
