import { auth } from "@/auth";
import Grid from "@/components/explore/grid";
import prisma from "@/lib/db/db";
import React from "react";

const Page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  // const session = await auth();
  // const user = session?.user;
  const { userId } = await params;
  // if (!user) {
  //   return (
  //     <div className="w-[90%] m-auto pt-2">
  //       <h1 className="text-2xl font-bold">
  //         Please sign in to view your profile
  //       </h1>
  //     </div>
  //   );
  // }
  const course = await prisma.course.findMany({
    where: {
      userId: userId,
    },
    include: {
      _count: {
        select: { likes: true },
      },
      image: true,
      user: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  return (
    <div className="w-[90%] m-auto pt-2 ">
      <Grid data={course} title="My Courses" />
    </div>
  );
};

export default Page;
