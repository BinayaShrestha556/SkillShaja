import { auth } from "@/auth";
import prisma from "@/lib/db/db";
import React from "react";

const Reply = async ({ parentId }: { parentId: string }) => {
  const session = await auth();
  const userId = session?.user?.id;
  const replies = await prisma.comment.findMany({
    where: {
      parentId: parentId as string,
    },
    select: {
      id: true,
      content: true,
      owner: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  return <div></div>;
};

export default Reply;
