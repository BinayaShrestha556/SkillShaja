"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { fetchUrl } from "@/lib/utils";
import { Video } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface VideoGridProps {
  videos: Video[];
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadThumbnails = async () => {
      const entries = await Promise.all(
        videos.map(async (video) => {
          const { thumbnail } = await fetchUrl(video.videoUrl, "video");
          return [video.id, thumbnail] as [string, string];
        })
      );
      setThumbnails(Object.fromEntries(entries));
      console.log(thumbnails);
    };

    loadThumbnails();
  }, [videos]);
  useEffect(() => {
    console.log(thumbnails);
  }, [thumbnails]);
  return (
    // <div className="w-full flex flex-wrap gap-6  mt-4 relative">
    //   <div className="w-10 text-xl h-10  z-40 border shadow absolute top-1/3 -left-3  rounded-full bg-accent/70 text accent-accent-foreground flex items-center justify-center">
    //     {"<"}
    //   </div>
    //   <div className="w-10 text-xl h-10 z-40 border shadow absolute top-1/3 -right-3 rounded-full bg-accent text accent-accent-foreground flex items-center justify-center">
    //     {">"}
    //   </div>

    //   {videos.map((video) => (
    //     <div key={video.id} className="w-56">
    //       <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-gray-100">
    //         {thumbnails[video.id] ? (
    //           <Image
    //             src={thumbnails[video.id]}
    //             alt={`Thumbnail of ${video.title}`}
    //             fill
    //             className="object-cover object-center"
    //           />
    //         ) : (
    //           <div className="w-full h-full animate-pulse bg-gray-200" />
    //         )}
    //       </div>
    //       <h3 className="font-semibold mt-2 line-clamp-1 ml-1">
    //         {video.title}
    //       </h3>
    //       <p className="text-sm text-muted-foreground line-clamp-2 ml-1">
    //         {video.description}
    //       </p>
    //     </div>
    //   ))}
    // </div>
    <Carousel className="w-full" opts={{ align: "start" }}>
      <CarouselContent className="mt-3 p-2">
        {videos.map((video, index) => (
          <CarouselItem
            key={index}
            className="basis-1/4 p-2 ml-2  rounded-[26px] hover:border hover:shadow-2xl"
          >
            <div className="w-full h-56 relative">
              {thumbnails[video.id] ? (
                <Image
                  src={thumbnails[video.id]}
                  alt={`Thumbnail of ${video.title}`}
                  fill
                  className="object-cover object-center rounded-[18px]"
                />
              ) : (
                <div className="w-full h-full animate-pulse bg-gray-200" />
              )}
            </div>
            <div className="p-1 mt-1">
              <h3 className="font-semibold mt-2 line-clamp-1 ">
                {video.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 ">
                {video.description}
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default VideoGrid;
