import SecureVideoPlayer from "@/components/video";
import React from "react";

const page = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/sign-cloudinary-params?id=kvoxp6plqz8hjwtyktzx&type=video`
  );
  const resUrl = await res.json();
  const url = resUrl.url;
  return (
    <div>
      <SecureVideoPlayer src={url} />
    </div>
  );
};

export default page;
