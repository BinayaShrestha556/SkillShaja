"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SearchResultsProps {
  courses: { id: string; name: string; image: { url: string } }[];
  users: { id: string; name: string; image?: string }[];
  hidden?: boolean;
}

// Helper to fetch signed Cloudinary URL
async function getSignedUrl(imageId: string) {
  const res = await fetch(
    `/api/sign-cloudinary-params?id=${imageId}&type=image`
  );
  if (!res.ok) return "/placeholder.png";
  const { url } = await res.json();
  return url || "/placeholder.png";
}

const SearchResults: React.FC<SearchResultsProps> = ({
  courses,
  users,
  hidden,
}) => {
  const [courseImages, setCourseImages] = React.useState<
    Record<string, string>
  >({});

  React.useEffect(() => {
    // Fetch signed URLs for all course images
    const fetchImages = async () => {
      const entries = await Promise.all(
        courses.map(async (course) => {
          if (!course.image?.url) return [course.id, "/placeholder.png"];
          const url = await getSignedUrl(course.image.url);
          return [course.id, url];
        })
      );
      setCourseImages(Object.fromEntries(entries));
    };
    fetchImages();
  }, [courses]);

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      className={cn(
        `absolute top-12 -left-48 md:left-0   w-96 bg-white border rounded-md shadow-lg z-50`,
        {
          "hidden lg:block left-0 top-[125%]": hidden,
        }
      )}
    >
      {courses.length >= 1 && (
        <div className="p-4">
          <h2 className="text-lg font-semibold">Courses</h2>
          <ul>
            {courses.map((course) => (
              <li key={course.id}>
                <Link
                  href={`/course/${course.id}`}
                  className="flex items-center py-2"
                >
                  <div className="relative w-14 h-9 rounded-md mr-2 overflow-hidden">
                    <Image
                      src={courseImages[course.id] || "/placeholder.png"}
                      alt={course.name}
                      height={36}
                      width={56}
                      className="object-cover rounded-md"
                      sizes="56px"
                    />
                  </div>
                  <span>{course.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {users.length >= 1 && (
        <div className="p-4 border-t">
          <h2 className="text-lg font-semibold">Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="flex items-center py-2">
                <div className="relative w-12 h-12 rounded-full mr-2 overflow-hidden">
                  <Image
                    src={user.image || "/avatar.png"}
                    alt={user.name}
                    fill
                    className="object-cover rounded-full"
                    sizes="48px"
                  />
                </div>
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
