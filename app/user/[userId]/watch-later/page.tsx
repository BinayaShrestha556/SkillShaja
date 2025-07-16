import { auth } from "@/auth";
import Grid from "@/components/explore/grid";
import prisma from "@/lib/db/db";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect("/signin");
  }
  const watchLaterCourses = await prisma.watchLater.findMany({
    where: {
      userId,
    },
    include: {
      course: {
        include: {
          image: true,
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
            },
          },
        },
      },
    },
  });
  //   data: (Course & { image: Image; _count: { likes: number } } & {
  //     user: { image: string | null; name: string | null };
  //   })[];
  //   title: string;
  const formattedWatchLaterCourses = watchLaterCourses.map((item) => ({
    ...item.course,
    id: item.course.id,
    image: item.course.image,
    _count: item.course._count,
    user: item.course.user,
  }));
  return (
    <div className="w-[90%] m-auto pt-2">
      {watchLaterCourses.length === 0 ? (
        <div>No courses found</div>
      ) : (
        <div>
          <Grid data={formattedWatchLaterCourses} title="Watch Later" />
        </div>
      )}
    </div>
  );
};

export default page;
