import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || !q.trim()) {
    return NextResponse.json(
      { error: "Missing or invalid search query." },
      { status: 400 }
    );
  }

  try {
    const [courses, users] = await Promise.all([
      prisma.course.findMany({
        where: {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
          image: { select: { url: true } },
        },
        take: 10,
      }),
      prisma.user.findMany({
        where: {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
          image: true,
        },
        take: 10,
      }),
    ]);

    return NextResponse.json({ courses, users });
  } catch (error) {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
