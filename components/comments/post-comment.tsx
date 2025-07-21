"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
interface PostCommentProps {
  videoId: string;
  parentId?: string;
}
import { submitComments } from "@/server-actions/post-comment";
import { useRouter } from "next/navigation";
const PostComment: React.FC<PostCommentProps> = ({ videoId, parentId }) => {
  const session = useSession();
  const user = session?.data?.user;
  const schema = z.object({
    content: z.string().min(0),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: "",
    },
  });
  const router = useRouter();

  const [transition, setTransition] = useTransition();
  const onSubmit = (values: z.infer<typeof schema>) => {
    setTransition(async () => {
      await submitComments(values.content, videoId, parentId);
      form.reset();
      router.refresh();
    });
  };
  return (
    <div className="flex w-full items-center gap-2">
      <div className="relative  h-8 w-8 rounded-full overflow-hidden">
        <Image
          src={user?.image || "/avatar.png"}
          alt="pfp"
          fill
          className="object-center  object-cover"
        />
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
        <Form {...form}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full bg-transparent focus:outline-none focus:border-none focus:ring-0 focus-visible:outline-none focus-visible:border-none focus-visible:ring-0 border-x-0 border-t-0 border-b  shadow-offset-y"
                    {...field}
                    disabled={transition}
                    placeholder="Write a comment..."
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      </form>
    </div>
  );
};

export default PostComment;
