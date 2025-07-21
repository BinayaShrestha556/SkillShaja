"use client";

import { Comment } from "@prisma/client";

import { UserCircle2Icon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { RiArrowDropDownLine } from "react-icons/ri";
import PostComment from "./post-comment";

interface CommentElementProps {
  comment: Comment & {
    owner: {
      image: string | null;
      name: string | null;
    };
    replies?: (Comment & {
      owner: {
        name: string | null;
        image: string | null;
      };
    })[];
    _count?: {
      replies: number;
    };
  };
  parent: boolean;
  videoId: string;
}
const CommentElement: React.FC<CommentElementProps> = ({
  videoId,
  comment,
  parent,
}) => {
  const { content, id, owner } = comment;
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);

  const clickReplies = async () => {
    setIsRepliesOpen((current) => !current);
  };
  const [postReplyButton, setPostReplyButton] = useState(false);

  return (
    <div className="flex gap-5 items-start">
      <div className="relative w-8 h-8 rounded-full overflow-hidden">
        {owner.image ? (
          <Image
            src={owner.image}
            alt="user image"
            fill
            className="object-center object-cover"
          />
        ) : (
          <UserCircle2Icon size={30} />
        )}
      </div>
      <div className="flex-grow">
        <h1 className="text-sm font-bold">{owner.name}</h1>
        <p>{content}</p>

        <div className="flex gap-3 items-center">
          {parent && (
            <span
              className="text-primary cursor-pointer font-semibold text-sm"
              onClick={() => setPostReplyButton(true)}
            >
              reply
            </span>
          )}
        </div>
        {postReplyButton && <PostComment videoId={videoId} parentId={id} />}
        {parent && comment._count && comment._count?.replies > 0 && (
          <p
            className="flex cursor-pointer font-semibold"
            onClick={clickReplies}
          >
            <RiArrowDropDownLine size={25} /> {comment._count.replies} replies
          </p>
        )}
        {isRepliesOpen && (
          <div className="w-full mt-2 flex flex-col gap-3">
            {comment.replies?.map((comment) => (
              <CommentElement
                videoId={videoId}
                comment={comment}
                parent={false}
                key={comment.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentElement;
