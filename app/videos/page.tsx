import Comment from "@/components/comments/comment";
import PostComment from "@/components/comments/post-comment";
import VideoGrid from "@/components/course/videos/VideoGrid";
import SecureVideoPlayer from "@/components/video";
import VideoBottom from "@/components/video/videoBottom";
import prisma from "@/lib/db/db";
import { fetchUrl } from "@/lib/utils";

import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const { id } = await searchParams;
  if (!id) return notFound();
  const video = await prisma.video.findUnique({
    where: {
      id,
    },
    include: {
      course: {
        include: {
          videos: true,
        },
      },
      thumbnail: true,
    },
  });
  if (!video) return notFound();
  const videoUrl = await fetchUrl(
    video.videoUrl,
    "video",
    video.courseId,
    cookieHeader
  );

  return (
    <div className="w-full">
      <div className="lg:w-[55%] md:w-[65%] p-3 w-full  m-auto bg-card rounded-3xl">
        <div className="w-full rounded-3xl overflow-hidden">
          {videoUrl ? (
            <SecureVideoPlayer src={videoUrl.url} />
          ) : (
            <div> not authenticated </div>
          )}
        </div>
        <VideoBottom video={{ ...video }} />
      </div>

      <div className=" lg:w-[70%]  w-[calc(100%-12px)] m-auto px-2 rounded-3xl shadow bg-card mt-10">
        <VideoGrid
          courseId={video.courseId}
          videos={video.course.videos}
          selectedId={id}
        />
      </div>
      <div className="lg:w-[70%] ww-[calc(100%-12px)] m-auto p-3 rounded-3xl shadow bg-card mt-10">
        <PostComment videoId={id} />
        <Comment videoId={id} />
      </div>
    </div>
  );
};

export default Page;
