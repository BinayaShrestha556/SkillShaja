import { auth } from "@/auth";
import Nav from "@/components/profile/nav";

import prisma from "@/lib/db/db";

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
  const user = await prisma.user.findUnique({
    where: { id: paramUserId },
    select: {
      image: true,
      name: true,
    },
  });
  const pfp = user?.image;
  let Earnings = 0;
  if (userId === paramUserId) {
    const earnings = await prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId: userId,
      },
    });
    Earnings = earnings._sum.amount || 0;
  }
  return (
    <div className="w-full md:w-[90%] m-auto p-2 ">
      <div className="w-full m-auto pt-2 flex flex-wrap items-center gap-4">
        <div className="relative aspect-square h-16 md:h-20 lg:h-24 p-1 rounded-full overflow-hidden">
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
          <h1 className="text-xl md:text-2xl font-semibold">
            Welcome, {user?.name || "User"}
          </h1>
          {userId == paramUserId && (
            <p className="text-muted-foreground">
              {"Manage your courses and preferences here."}
            </p>
          )}
        </div>

        {userId === paramUserId && (
          <div className="self-end mb-5">
            <Link
              href={"/user/withdraw"}
              className=" text-primary flex-grow underline "
            >
              Earnings: Rs.{Earnings}
            </Link>
          </div>
        )}
      </div>
      <Nav isUser={paramUserId === userId} id={paramUserId} />
      {children}
    </div>
  );
};

export default Layout;
