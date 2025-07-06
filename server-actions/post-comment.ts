import { auth } from "@/auth";
import prisma from "@/lib/db/db";
import { executeAction } from "@/lib/executeFn";

export const submitComments = async (
  content: string,
  videoId: string,
  parentId?: string
) => {
  return executeAction({
    actionFn: async () => {
      const session = await auth();
      const userId = session?.user?.id;
      if (!userId) throw new Error("user not logged in");
      if (parentId) {
        const existingParent = await prisma.comment.findUnique({
          where: {
            id: parentId,
          },
        });
        if (!existingParent) throw new Error("Parent doesnot exist.");
      }
      const comment = await prisma.comment.create({
        data: {
          content,
          ownerId: userId,
          parentId,
          videoId,
        },
      });
      if (!comment) throw new Error("Sorry, something went wrong");
    },
  });
};
