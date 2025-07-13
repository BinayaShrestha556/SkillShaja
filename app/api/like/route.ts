import { auth } from "@/auth";
import prisma from "@/lib/db/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "not logged in" });

  const { courseId } = await req.json();
  if (!courseId) {
    return NextResponse.json(
      { error: "Course ID is required" },
      { status: 400 }
    );
  }

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        likedById: userId,
        courseId,
      },
    });

    if (existingLike) {
      // If the like already exists, remove it
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json({ message: "Like removed" });
    } else {
      // If the like does not exist, create it
      await prisma.like.create({
        data: {
          likedById: userId,
          courseId,
        },
      });
      return NextResponse.json({ message: "Course liked" });
    }
  } catch (error) {
    console.error("Error handling like:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
};
