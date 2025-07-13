import Grid from "@/components/explore/grid";
import prisma from "@/lib/db/db";
import React from "react";

const page = async () => {
  const exploreCourses = await prisma.course.findMany({
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
    take: 10,
    include: {
      _count: {
        select: { likes: true },
      },
      image: true,
      user: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  const for_you_courses = await prisma.course.findMany({
    where: {},
    take: 10,
    include: {
      _count: {
        select: { likes: true },
      },
      image: true,
      user: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });

  if (!exploreCourses || exploreCourses.length === 0)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        no items found
      </div>
    );
  return (
    <div className="w-[90%] m-auto pt-2">
      <Grid data={exploreCourses} title="Polular Courses" />
      <div className="h-5 w-full "></div>
      <Grid data={for_you_courses} title="For You" />
    </div>
  );
};

export default page;
