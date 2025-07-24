import { auth } from "@/auth";
import Comment from "@/components/comments/comment";
import CommentLoading from "@/components/comments/loading";
import PostComment from "@/components/comments/post-comment";
import VideoGrid from "@/components/course/videos/VideoGrid";
import SecureVideoPlayer from "@/components/video";
import VideoBottom from "@/components/video/videoBottom";
import prisma from "@/lib/db/db";
import { fetchUrl } from "@/lib/utils";

import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import React, { Suspense } from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const cookieStore = await cookies();
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) redirect("/signin");
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
  const course = await prisma.course.findUnique({
    where: { id: video.course.id },
  });

  const payment = await prisma.payment.findFirst({
    where: {
      productId: video.courseId,
      userId: userId,
    },
  });
  if (!payment && course?.paid) redirect(`/payment?courseId=${video.courseId}`);
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
        <Suspense fallback={<CommentLoading />}>
          <Comment videoId={id} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
