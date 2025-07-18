"use client";
import { Video } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { BiAddToQueue, BiHeart } from "react-icons/bi";
import { RiAlertLine } from "react-icons/ri";

const VideoBottom = ({ video }: { video: Video }) => {
  const [expand, setExpand] = useState(false);
  const [truncatedData, setTruncatedData] = useState("");

  useEffect(() => {
    if (video.description.length > 200) {
      setTruncatedData(video.description.slice(0, 200) + "...");
    } else {
      setTruncatedData(video.description);
    }
  }, [video.description]);

  return (
    <div className="p-2">
      <div className="flex items-center w-full justify-between mt-2 md:mt-5 px-2">
        <h1 className="text-xl  font-bold">{video.title}</h1>
        <div className="gap-2 py-2 px-3 items-center flex border rounded-2xl">
          <BiHeart size={25} />
          <BiAddToQueue size={25} />
          <RiAlertLine size={25} />
        </div>
      </div>

      <p className="text-muted-foreground p-3 rounded-2xl mt-2 bg-background">
        {expand ? video.description : truncatedData}
        {video.description.length > 70 && (
          <button
            onClick={() => setExpand((e) => !e)}
            className="ml-2 text-blue-500 underline"
          >
            {expand ? "see less" : "see more"}
          </button>
        )}
      </p>
    </div>
  );
};

export default VideoBottom;
