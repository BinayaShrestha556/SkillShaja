import prisma from "@/lib/db/db";
import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchUrl, formatTimeAgo } from "@/lib/utils";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddToWatchLaterButton from "@/components/course/addToWatchLaterButton";
import VideoGrid from "@/components/course/videos/VideoGrid";
import Link from "next/link";
import { auth } from "@/auth";
import LikeCourse from "@/components/course/like-course";
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  const course = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      image: true,

      videos: true,
      user: {
        select: {
          id: true,
          image: true,
          name: true,
        },
      },
      _count: {
        select: {
          likes: true,
          subscribers: true,
        },
      },
    },
  });
  if (!course) {
    notFound();
  }
  let payment;
  if (course.paid && userId) {
    payment = await prisma.payment.findFirst({
      where: {
        productId: id,
        userId,
        status: "SUCCESS",
      },
    });
  }

  const thumbnailUrl = await fetchUrl(course.image.url, "image");
  return (
    <div className="w-[calc(100%-1.75rem)] md:w-[90%] m-auto mt-10">
      <div className="w-full md:w-[80%] m-auto flex  flex-col lg:flex-row gap-10 justify-end rounded-3xl ">
        <div className="relative  w-full lg:w-[60%] h-96 rounded-2xl">
          {thumbnailUrl && (
            <Image
              src={thumbnailUrl.url}
              alt="Thumbnail of course"
              fill
              className="object-center object-cover rounded-2xl border bg-accent   shadow"
            />
          )}
        </div>
        <div className="flex-1 gap-3 text-card-foreground p-8 rounded-3xl shadow bg-card flex flex-col ">
          <h1 className="text-4xl font-semibold">{course.name}</h1>
          <p className="line-clamp-[7] text-muted-foreground flex-1">
            {course.description}
          </p>
          <div className="relative flex gap-1 items-center pr-2">
            <div className="relative rounded-xl border ">
              <Image
                width={35}
                height={35}
                src={course.user.image || "/avatar.png"}
                alt="user profile"
                className="object-center object-cover"
              />
            </div>

            <Link
              href={`/user/${course.user.id}`}
              className="text-muted-foreground text-sm font-semibold flex-grow"
            >
              {" "}
              {course.user.name}{" "}
            </Link>

            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground text-sm">
                {formatTimeAgo(course.createdAt)}
              </span>{" "}
            </div>
          </div>
          <div className="flex items-center flex-col justify-en flex-wrap gap-4 mt-4 text-accent-foreground ">
            <span className="flex items-center justify-between w-full gap-1">
              {" "}
              <AddToWatchLaterButton courseId={course.id} />
              <LikeCourse
                courseId={course.id}
                size={20}
                likesCount={course._count.likes}
              />
            </span>
            {course.paid ? (
              payment ? (
                <Link
                  className="w-full flex-1"
                  href={`/videos?id=${course.videos[0].id}`}
                >
                  <Button className="w-full cursor-pointer">Watch now</Button>
                </Link>
              ) : (
                <Link
                  className="w-full flex-1 cursor-pointer"
                  href={`/payment?courseId=${course.id}`}
                >
                  <Button className="w-full cursor-pointer" size={"lg"}>
                    Buy at just Rs. {course.price}!
                  </Button>
                </Link>
              )
            ) : (
              <Link
                className="w-full flex-1"
                href={`/videos?id=${course.videos[0].id}`}
              >
                <Button className="w-full cursor-pointer">Watch now</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className=" md:w-[80%] m-auto bg-white rounded-3xl p-5 shadow mt-10">
        <h2 className="text-xl font-semibold">Videos</h2>
        <VideoGrid courseId={course.id} videos={course.videos} />
      </div>
    </div>
  );
};

export default page;
