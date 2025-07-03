import { cn, formatTimeAgo } from "@/lib/utils";
import { Course, Image as Images } from "@prisma/client";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";

const Cards: React.FC<
  Course & { image: Images; _count: { likes: number } } & {
    user: { name: string | null; image: string | null };
  }
> = async ({
  createdAt,
  description,
  id,
  imageId,
  name,
  paid,
  updatedAt,
  userId,
  image,
  user,
  _count,
}) => {
  const urlResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/sign-cloudinary-params?id=${image.url}&type=image`
  );
  const urlResponseParsed = await urlResponse.json();
  console.log(urlResponseParsed);
  const url = urlResponseParsed.url;
  return (
    <div className="w-full flex flex-col relative bg-card border p-2 rounded-3xl overflow-hidden hover:scale-[103%] hover:shadow-2xl cursor-pointer transition-all duration-200 ">
      <div className="relative w-full h-52 ">
        <Image
          src={url}
          alt="course thumbnail"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="p-2 py-3 h-36">
        <div className="relative flex gap-1 items-center">
          <div className="relative rounded-lg border p-1">
            <Image
              width={35}
              height={35}
              src={user.image || "/avatar.png"}
              alt="user profile"
              className="object-center object-cover"
            />
          </div>

          <span className="text-muted-foreground text-sm font-semibold flex-grow">
            {" "}
            {user.name}{" "}
          </span>

          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground text-sm">
              {formatTimeAgo(createdAt)}
            </span>{" "}
            <span className="text-muted-foreground text-sm font-semibold gap-0.5 flex items-center">
              <Heart size={18} /> {_count.likes}
            </span>
          </div>
        </div>
        <h3 className="text-lg antialiased font-semibold mt-2">{name}</h3>
        <p className="text-sm text-muted-foreground -mt-0.5 truncate line-clamp-2 text-wrap">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Cards;
