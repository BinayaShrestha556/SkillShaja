"use server";
import { auth } from "@/auth";
import prisma from "@/lib/db/db";
import { executeAction } from "@/lib/executeFn";
import { formSchema } from "@/lib/schema";
import { z } from "zod";

type uploadProps = {
  title: string;
  videos: {
    videoId: string;
    description: string;
    title: string;
    thumbnail?: string;
  }[];
  description: string;
  thumbnail?: string;
};
export const upload = async (object: z.infer<typeof formSchema>) => {
  return await executeAction({
    actionFn: async () => {
      const session = await auth();
      const userId = session?.user?.id; // provided from session or params
      if (!userId) throw new Error("User not authenticated");

      const {
        videos,
        thumbnail: courseThumbnailId,
        title,
        description,
        paid,
        price,
      } = object;

      if (!videos || !courseThumbnailId || !title || !description)
        throw new Error("provide all data");
      // 1. Create image for course thumbnail
      const courseImage = await prisma.image.create({
        data: {
          url: courseThumbnailId,
        },
      });

      // 2. Create course
      await prisma.course.create({
        data: {
          name: title,
          description,
          paid, // or true, depending on logic
          userId,
          price: price,
          imageId: courseImage.id,
          videos: {
            create: await Promise.all(
              videos.map(async (video) => {
                if (!video.thumbnail)
                  return {
                    videoUrl: video.videoId,
                    description: video.description,
                    title: video.title,
                    userId,
                  };
                const thumbnailImage = await prisma.image.create({
                  data: {
                    url: video.thumbnail,
                  },
                });

                return {
                  videoUrl: video.videoId,
                  description: video.description,

                  title: video.title,
                  userId,
                  thumbnailId: thumbnailImage.id,
                };
              })
            ),
          },
        },
      });
    },
  });
};
