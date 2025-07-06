"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
interface PostCommentProps {
  videoId: string;
  parentId?: string;
}
import { submitComments } from "@/server-actions/post-comment";
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
  const [transition, setTransition] = useTransition();
  const onSubmit = (values: z.infer<typeof schema>) => {
    setTransition(
      async () => await submitComments(values.content, videoId, parentId)
    );
  };
  return (
    <div className="flex w-full items-center gap-2">
      <div className="relative h-8 w-8 rounded-full overflow-hidden">
        <Image
          src={user?.image || "/avatar.png"}
          alt="pfp"
          fill
          className="object-center object-cover"
        />
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full bg-transparent border-none border-b"
                    {...field}
                    disabled={transition}
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
