// components/CldVideoUploadWidget.jsx
"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
interface UploadProps {
  accessMode: "authenticated" | "public";
  onChange: (e: string, thumbnailUrl?: string) => void;
  media: "video" | "image";
}
export default function VideoUpload({
  accessMode,
  media,
  onChange,
}: UploadProps) {
  const [uploadStatus, setUploadStatus] = useState(false);

  // Determine the folder based on accessMode

  // Handle the upload event types
  const onUploadError = () => {};
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  function extractPublicId(url: string): string | null {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1]; // bzorpoxfnsqpfneehex9.jpg
    return lastPart.replace(".jpg", "");
  }
  const getUrl = async (id: string, type: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/sign-cloudinary-params?id=${id}&type=${type}`
    );
    const url = await res.json();
    console.log(url.url);
    return url.url;
  };
  const handleUploadEvents = async (event: any) => {
    console.log(event);
    if (media === "image") {
      onChange(event.info.public_id);
      const image = await getUrl(event.info.public_id, "image");
      setImageUrl(image);
    } else {
      const id = extractPublicId(event.info.thumbnail_url);
      onChange(event.info.public_id, id || undefined);
      const video: string = await getUrl(event.info.public_id, "video");
      setVideoUrl(video);
    }
    setUploadStatus(true);
  };
  //  {
  //     "event": "success",
  //     "info": {
  //         "id": "uw-file3",
  //         "batchId": "uw-batch2",
  //         "asset_id": "ae6305fd61258a93d82cb3d9add49b5e",
  //         "public_id": "bzorpoxfnsqpfneehex9",
  //         "version": 1751340316,
  //         "version_id": "228a642b7d7114ed83a737dcc52d38e3",
  //         "signature": "0ca3e848bd3853d7779b6373d0ea420e85fba52f",
  //         "width": 504,
  //         "height": 290,
  //         "format": "mp4",
  //         "resource_type": "video",
  //         "created_at": "2025-07-01T03:25:16Z",
  //         "tags": [],
  //         "pages": 0,
  //         "bytes": 388071,
  //         "type": "authenticated",
  //         "etag": "924f3e90fb4a5f0cad8d9a112fae7f84",
  //         "placeholder": false,
  //         "url": "http://res.cloudinary.com/dtnzu6ts5/video/authenticated/s--pmwNyDef--/v1751340316/bzorpoxfnsqpfneehex9.mp4",
  //         "secure_url": "https://res.cloudinary.com/dtnzu6ts5/video/authenticated/s--pmwNyDef--/v1751340316/bzorpoxfnsqpfneehex9.mp4",
  //         "playback_url": "https://res.cloudinary.com/dtnzu6ts5/video/authenticated/s--u1G4Xzlk--/sp_auto/v1751340316/bzorpoxfnsqpfneehex9.m3u8",
  //         "asset_folder": "",
  //         "display_name": "Screen Recording 2024-12-20 212659",
  //         "access_control": [
  //             {
  //                 "access_type": "anonymous"
  //             }
  //         ],
  //         "audio": {
  //             "codec": "aac",
  //             "bit_rate": "193228",
  //             "frequency": 48000,
  //             "channels": 2,
  //             "channel_layout": "stereo"
  //         },
  //         "video": {
  //             "pix_format": "yuv420p",
  //             "codec": "h264",
  //             "level": 21,
  //             "profile": "Main",
  //             "bit_rate": "629352",
  //             "dar": "252:145",
  //             "time_base": "1/30000"
  //         },
  //         "is_audio": false,
  //         "frame_rate": 30,
  //         "bit_rate": 817574,
  //         "duration": 3.797292,
  //         "rotation": 0,
  //         "original_filename": "Screen Recording 2024-12-20 212659",
  //         "nb_frames": 112,
  //         "api_key": "266457623286177",
  //         "path": "v1751340316/bzorpoxfnsqpfneehex9.mp4",
  //         "thumbnail_url": "https://res.cloudinary.com/dtnzu6ts5/video/authenticated/c_limit,h_60,w_90/v1751340316/bzorpoxfnsqpfneehex9.jpg"
  //     }
  // } SAMPLE RESPONSE VIDEO

  const clientAllowedFormats =
    media === "image" ? ["jpg", "jpeg", "png"] : ["mp4", "mov", "webm"];
  return (
    <div className="p-4 bg-gray-50 rounded-lg w-full shadow-sm">
      {(imageUrl || videoUrl) && (
        <div className="w-full h-96 relative">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="uploaded image"
              fill
              className="object-center object-cover"
            />
          )}
          {videoUrl && (
            <video className="w-full h-full " src={videoUrl} controls />
          )}
        </div>
      )}
      {/* Cloudinary Upload Widget */}
      <CldUploadWidget
        signatureEndpoint="/api/sign-cloudinary-params" // The Next.js API route for signature
        uploadPreset={
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_AUTHENTICATED_PRESET
        }
        onError={onUploadError} // Pass error callback directly
        onSuccess={handleUploadEvents}
        // Clear status when widget opens
        options={{
          resourceType: media, // Ensure it's treated as a video upload
          // Dynamic folder based on accessMode
          clientAllowedFormats,
          // Allowed video formats
          maxFileSize: 50 * 1024 * 1024, // Max file size in bytes (e.g., 50MB)
          // You can add more options here, e.g., tags, transformations
          // tags: ['my-video', accessMode],
          // public_id: `video_${Date.now()}` // Example: custom public ID
        }}
      >
        {({ open }) => {
          return (
            <Button
              type="button"
              variant="outline"
              onClick={() => open()}
              className={`border-dashed  border-black/50 w-full ${
                uploadStatus && "hidden"
              }`}
            >
              Upload {media}
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
