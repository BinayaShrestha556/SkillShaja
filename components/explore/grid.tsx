import { Course, Image } from "@prisma/client";
import React from "react";
import Cards from "./cards";

const Grid: React.FC<{
  data: (Course & { image: Image; _count: { likes: number } } & {
    user: { image: string | null; name: string | null };
  })[];
  title: string;
}> = ({ data, title }) => {
  //data is array of combination of course and image type as we included the image while retrieving
  return (
    <>
      <h1 className="text-2xl font-semibold mt-10 mb-2 ml-1">{title}</h1>
      <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 md:gap-4 gap-y-4">
        {data.map((e) => (
          <Cards {...e} key={e.id} />
        ))}
      </div>
    </>
  );
};

export default Grid;
