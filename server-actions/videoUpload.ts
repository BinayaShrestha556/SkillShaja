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

    title: string;
    thumbnail: string;
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

      const formattedVideos = object.videos.map((e) => {
        if (e.thumbnail)
          return { thumbnail: e.thumbnail, videoId: e.videoId, title: e.title };
        else
          return {
            thumbnail: e.defaultThumbnail,
            videoId: e.videoId,
            title: e.title,
          };
      });
      const formattedData = { ...object, videos: formattedVideos };

      const {
        videos,
        thumbnail: courseThumbnailId,
        title,
        description,
      } = formattedData;

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
          paid: false, // or true, depending on logic
          userId,
          imageId: courseImage.id,
          videos: {
            create: await Promise.all(
              videos.map(async (video) => {
                const thumbnailImage = await prisma.image.create({
                  data: {
                    url: video.thumbnail,
                  },
                });

                return {
                  videoUrl: video.videoId,
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
