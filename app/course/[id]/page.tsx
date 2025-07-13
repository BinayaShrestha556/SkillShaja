import prisma from "@/lib/db/db";
import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchUrl } from "@/lib/utils";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RiSave2Line } from "react-icons/ri";
import { BiAddToQueue } from "react-icons/bi";
import AddToWatchLaterButton from "@/components/course/addToWatchLaterButton";
import VideoGrid from "@/components/course/videos/VideoGrid";
import Link from "next/link";
import { auth } from "@/auth";
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
    <div className=" w-[90%] m-auto mt-10">
      <div className="w-[80%] m-auto mt-32 flex gap-10 justify-end rounded-3xl ">
        <div className="relative  w-[60%]  h-96 rounded-2xl">
          <Image
            src={thumbnailUrl.url}
            alt="Thumbnail of course"
            fill
            className="object-center object-cover rounded-2xl border bg-accent   shadow"
          />
        </div>
        <div className="flex-1  text-accent-foreground p-8 rounded-3xl shadow bg-accent  ">
          <h1 className="text-4xl font-semibold">{course.name}</h1>
          <p className="line-clamp-[7] text-muted-foreground">
            {course.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Unde obcaecati dolores delectus modi eum omnis
            non! Ullam eligendi tenetur libero ab ipsa hic aliquid quasi
            officiis, odio autem porro animi? Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Quidem consequuntur esse optio, ad
            atque rerum, cumque sint nulla corporis modi, impedit excepturi
            expedita obcaecati iure delectus. Dolore temporibus aut molestiae!
          </p>
          <div className="flex items-center justify-en gap-4 mt-10">
            <span className="flex items-center gap-1">
              {" "}
              <Heart size={17} /> {course._count.likes}
            </span>
            <AddToWatchLaterButton />
            {course.paid ? (
              payment ? (
                <Link href={`/videos?id=${course.videos[0].id}`}>
                  <Button>Watch now</Button>
                </Link>
              ) : (
                <Link href={`/payment?courseId=${course.id}`}>
                  <Button size={"lg"}>Buy at just Rs. {course.price}!</Button>
                </Link>
              )
            ) : (
              <span className="px-3 py-1 rounded-xl bg-green-100 border text-sm font-semibold border-green-200 text-green-600">
                Free
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="w-[80%] m-auto bg-white rounded-3xl p-5 shadow mt-10">
        <h2 className="text-xl font-semibold">Videos</h2>
        <VideoGrid videos={course.videos} />
      </div>
    </div>
  );
};

export default page;
