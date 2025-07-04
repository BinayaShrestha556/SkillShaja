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
  price,
  _count,
}) => {
  const urlResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/sign-cloudinary-params?id=${image.url}&type=image`
  );
  const urlResponseParsed = await urlResponse.json();
  console.log(urlResponseParsed);
  const url = urlResponseParsed.url;
  return (
    <div className="w-full flex flex-col relative bg-card  shadow-accent p-3 rounded-3xl overflow-hidden hover:scale-[103%] hover:shadow-2xl cursor-pointer transition-all duration-200 ">
      <div className="relative w-full h-56 ">
        <Image
          src={url}
          alt="course thumbnail"
          fill
          className="object-cover object-center rounded-2xl"
        />
        <div
          className={cn(
            "absolute right-2 top-2 rounded-xl  px-2 text-xs py-1 ",
            paid
              ? "bg-accent text-accent-foreground"
              : "bg-green-200 border text-green-600"
          )}
        >
          {" "}
          {paid ? "$ " + price : "free"}
        </div>
      </div>

      <div className=" pt-3 ">
        <div className="relative flex gap-1 items-center">
          <div className="relative rounded-xl border p-1">
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
        <div className="rounded-2xl  p-2 mt-2 border">
          <h3 className=" antialiased font-semibold ">{name}</h3>
          <p className="text-sm text-muted-foreground -mt-0.5 truncate line-clamp-2 text-wrap">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
