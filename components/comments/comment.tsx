import prisma from "@/lib/db/db";
import React from "react";
import CommentElement from "./commentElement";
import { RiAlertFill } from "react-icons/ri";

const Comment = async ({ videoId }: { videoId: string }) => {
  const comments = await prisma.comment.findMany({
    where: { videoId, parentId: null },
    include: {
      _count: {
        select: {
          replies: true,
        },
      },
      replies: {
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
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
        {comments.length === 0 ? (
          <div>
            <div className="flex items-center justify-center gap-2">
              <RiAlertFill className="text-red-500" />
              <span className="text-sm">No comments yet</span>
            </div>
          </div>
        ) : (
          comments.map((comment, i: number) => (
            <CommentElement
              videoId={videoId}
              comment={comment}
              key={i}
              parent={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Comment;
