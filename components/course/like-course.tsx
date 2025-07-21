"use client";
import axios from "axios";

import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

import { RiHeartFill, RiHeartLine } from "react-icons/ri";

const LikeCourse = ({
  courseId,
  size,
  likesCount,
}: {
  courseId: string;
  size: number;
  likesCount: number;
}) => {
  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const res = await axios.get(`/api/like/check/${courseId}`);
        if (res.status === 200) {
          setLiked(res.data.liked);
        }
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };
    checkIfLiked();
  }, []);
  const like = async () => {
    setLiked((prev) => !prev);
    // Optimistically update the likes count
    const res = await axios.post("/api/like", { courseId });
    if (res.status === 200) {
      if (res.data.message === "Like removed") {
        setLikes((prev) => prev - 1);
        toast.success("Like removed successfully");
      } else if (res.data.message === "Course liked") {
        // If the like was added successfully, increment the likes count
        setLikes((prev) => prev + 1);
        toast.success("Course liked successfully");
      }
    } else {
      toast.error("Failed to like course");
    }
  };
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(likesCount);
  return (
    <div className="flex items-center justify-center gap-2">
      {liked ? (
        <RiHeartFill size={size} onClick={like} className="cursor-pointer" />
      ) : (
        <RiHeartLine size={size} onClick={like} className="cursor-pointer" />
      )}
      <span className="text-sm">{likes}</span>
    </div>
  );
};

export default LikeCourse;
