import { auth } from "@/auth";
import prisma from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "not logged in" });

  try {
    const body = await req.json();
    const { courseId } = body;
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    const existingWatchLater = await prisma.watchLater.findFirst({
      where: {
        userId,
        courseId,
      },
    });

    if (existingWatchLater) {
      await prisma.watchLater.delete({
        where: {
          id: existingWatchLater.id,
        },
      });
      return NextResponse.json({ message: "Removed from watch later" });
    } else {
      await prisma.watchLater.create({
        data: {
          userId,
          courseId,
        },
      });
      return NextResponse.json({ message: "Added to watch later" });
    }
  } catch (error) {
    console.error("Error handling watch later request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
};
