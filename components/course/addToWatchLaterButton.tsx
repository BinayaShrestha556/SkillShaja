"use client";
import React from "react";
import { Button } from "../ui/button";
import { BiAddToQueue } from "react-icons/bi";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";

const AddToWatchLaterButton = ({ courseId }: { courseId: string }) => {
  const [added, setAdded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleClick = async () => {
    setLoading(true);
    const res = await axios.post("/api/watch-later", {
      courseId: courseId,
    });
    if (res.data.message === "Added to watch later") {
      setAdded(true);
    } else if (res.data.message === "Removed from watch later") {
      setAdded(false);
    } else {
      console.error("Failed to add to watch later");
    }
    setLoading(false);
  };
  return (
    <Button variant={"outline"} onClick={handleClick}>
      {loading ? (
        <AiOutlineLoading className="animate-spin" size={20} />
      ) : (
        <BiAddToQueue size={20} />
      )}{" "}
      {added ? "Remove from Watch Later" : "Add to Watch Later"}
    </Button>
  );
};

export default AddToWatchLaterButton;
