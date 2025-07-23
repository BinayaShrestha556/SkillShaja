"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { set, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import VideoUpload from "../upload/videoUpload";
import { PlusCircle } from "lucide-react";
import { formSchema } from "@/lib/schema";
import { upload } from "@/server-actions/videoUpload";
import { Switch } from "../ui/switch";
import { useRouter } from "next/navigation";

const UploadForm = () => {
  const [page, setPage] = React.useState(1); // 1: course info, 2: videos
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      thumbnail: "",
      title: "",
      videos: [],
      paid: false,
      price: 0,
    },
  });
  const { control, setValue } = form;
  const paid = useWatch({
    control,
    name: "paid",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "videos",
  });

  // Validate first page before going to next
  const handleNext = async () => {
    const valid = await form.trigger(["title", "description", "thumbnail"]);
    if (valid) setPage(2);
  };
  const [message, setMessage] = React.useState<string | undefined>(undefined);
  // Optionally validate videos before submit
  const handlePrev = () => setPage(1);
  const [pending, setTransition] = useTransition();
  const router = useRouter();
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setTransition(async () => {
      const { message, success } = await upload(values);
      if (success) {
        setMessage(message);
        router.push("/explore");
      }
    });
  };

  return (
    <div className="w-1/2 p-3 m-auto h-auto">
      <Form {...form}>
        <form
          className="flex flex-col gap-8"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          {page === 1 && (
            <>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="title to describe your course"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Description</FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full h-24 p-2 border rounded-md text-sm bg-white shadow "
                        placeholder="Enter a short description..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Thumbnail */}
              <FormField
                control={control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Thumbnail</FormLabel>
                    <FormControl>
                      <VideoUpload
                        media="image"
                        onChange={(id: string) => field.onChange(id)}
                        accessMode="public"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Paid Switch */}
              <FormField
                name="paid"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Premium</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {paid && (
                <FormField
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter price"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="button" className="w-full" onClick={handleNext}>
                Next
              </Button>
            </>
          )}

          {page === 2 && (
            <>
              {/* Videos */}
              <div className="space-y-4 flex flex-col">
                <FormLabel className="text-lg self-start">Videos</FormLabel>
                {fields.map((fieldItem, index) => (
                  <div
                    key={fieldItem.id}
                    className="border p-4 rounded-md space-y-4 relative"
                  >
                    {/* Remove Button */}
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-red-500"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                    {/* Video Upload */}
                    <FormField
                      control={control}
                      name={`videos.${index}.videoId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video</FormLabel>
                          <FormControl>
                            <VideoUpload
                              media="video"
                              onChange={(
                                videoId: string,
                                thumbnailUrl?: string
                              ) => {
                                field.onChange(videoId);
                                setValue(
                                  `videos.${index}.thumbnail`,
                                  thumbnailUrl
                                );
                              }}
                              accessMode="authenticated"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Video Thumbnail */}
                    <FormField
                      control={control}
                      name={`videos.${index}.thumbnail`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video Thumbnail</FormLabel>
                          <FormControl>
                            <VideoUpload
                              media="image"
                              onChange={(id: string) => field.onChange(id)}
                              accessMode="public"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Video Title */}
                    <FormField
                      control={control}
                      name={`videos.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Video title..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Video Description */}
                    <FormField
                      control={control}
                      name={`videos.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video Description</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Video description..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                <div className="self-center flex flex-col items-center">
                  <PlusCircle
                    size={35}
                    className="text-secondary-foreground self-center"
                    onClick={() =>
                      append({
                        videoId: "",
                        thumbnail: "",
                        title: "",
                        description: "",
                        defaultThumbnail: "",
                      })
                    }
                  />
                  Add video
                </div>
              </div>
              <p className="text-red-500">{message}</p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handlePrev}
                >
                  Previous
                </Button>
                <Button disabled={pending} type="submit" className="flex-1">
                  Submit Course
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default UploadForm;
