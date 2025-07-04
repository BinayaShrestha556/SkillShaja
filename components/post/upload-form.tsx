"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
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

const UploadForm = () => {
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

  return (
    <div className="w-1/2 p-3 m-auto">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(upload)}
        >
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
                  <Input
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
                    // value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                            // Update videoId (the current field)
                            field.onChange(videoId);
                            // Also update thumbnail field
                            setValue(`videos.${index}.thumbnail`, thumbnailUrl);
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
                          // value={field.value}
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
                    defaultThumbnail: "",
                  })
                }
              />
              Add video
            </div>
          </div>
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
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit" className="w-full">
            Submit Course
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UploadForm;
