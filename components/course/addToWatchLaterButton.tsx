"use client";
import React from "react";
import { Button } from "../ui/button";
import { BiAddToQueue } from "react-icons/bi";

const AddToWatchLaterButton = () => {
  return (
    <Button variant={"outline"}>
      <BiAddToQueue size={20} /> Add to Watch later
    </Button>
  );
};

export default AddToWatchLaterButton;
