import { auth } from "@/auth";
import prisma from "@/lib/db/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { courseId: string } }
) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "not logged in" });

  const { courseId } = params;
  if (!courseId) {
    return NextResponse.json(
      { error: "Course ID is required" },
      { status: 400 }
    );
  }

  try {
    const like = await prisma.like.findFirst({
      where: {
        likedById: userId,
        courseId,
      },
    });

    return NextResponse.json({ liked: !!like });
  } catch (error) {
    console.error("Error checking like status:", error);
    return NextResponse.json(
      { error: "An error occurred while checking like status" },
      { status: 500 }
    );
  }
};
