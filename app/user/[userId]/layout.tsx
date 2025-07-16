import { auth } from "@/auth";
import Nav from "@/components/profile/nav";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}) => {
  const session = await auth();
  const userId = session?.user?.id;
  const { userId: paramUserId } = await params;
  if (!userId) {
    redirect("/signin");
  }
  const pfp = session?.user?.image;
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  console.log(pathname);
  return (
    <div className="w-[90%] m-auto pt-2 ">
      <div className="w-full m-auto pt-2 flex items-center gap-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
          {
            <Image
              src={pfp || "/avatar.png"}
              alt="Profile Picture"
              fill
              className="object-cover object-center"
            />
          }
        </div>
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome, {session?.user?.name}
          </h1>
          <p className="text-muted-foreground">
            Manage your courses and preferences here.
          </p>
        </div>
      </div>
      <Nav isUser={paramUserId === userId} id={paramUserId} />
      {children}
    </div>
  );
};

export default Layout;
