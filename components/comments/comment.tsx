import { auth } from "@/auth";
import prisma from "@/lib/db/db";
import React from "react";
import CommentElement from "./commentElement";

const Comment = async ({ videoId }: { videoId: string }) => {
  const session = await auth();
  const userId = session?.user?.id;
  const comments = await prisma.comment.findMany({
    where: { videoId, parentId: null },
    include: {
      _count: {
        select: {
          replies: true,
        },
      },
      owner: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
  return (
    <div className="w-full">
      <div className="flex"></div>
      <div className="flex flex-col w-full gap-4 mt-4 text-black">
        {comments &&
          comments.map((comment, i: number) => (
            <CommentElement
              videoId={videoId}
              comment={comment}
              key={i}
              parent={true}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;
