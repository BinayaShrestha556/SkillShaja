"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
interface NavProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  isUser?: boolean;
}
const Nav = ({
  isUser,
  id,
  className,

  ...props
}: NavProps) => {
  const pathname = usePathname();
  return (
    <nav
      className={cn("flex items-center w-full border-b mt-10", className)}
      {...props}
    >
      <ul className="flex gap-4 ml-10">
        <li>
          <Link
            href={`/user/${id}`}
            className={cn(
              "flex items-center gap-2 text-muted-foreground hover:text-accent-foreground",
              pathname === `/user/${id}` &&
                "text-accent-foreground border-b-2 border-accent-foreground"
            )}
          >
            courses
          </Link>
        </li>
        {isUser && (
          <>
            <li>
              <Link
                href={`/user/${id}/liked`}
                className={cn(
                  "flex items-center gap-2 text-muted-foreground hover:text-accent-foreground",
                  pathname === `/user/${id}/liked` &&
                    "text-accent-foreground border-b-2 border-accent-foreground"
                )}
              >
                Liked
              </Link>
            </li>
            <li>
              <Link
                href={`/user/${id}/watch-later`}
                className={cn(
                  "flex items-center gap-2 text-muted-foreground hover:text-accent-foreground",
                  pathname === `/user/${id}/watch-later` &&
                    "text-accent-foreground border-b-2 border-accent-foreground"
                )}
              >
                Watch Later
              </Link>
            </li>
          </>
        )}
      </ul>
      <div className=" flex-1 flex justify-end mr-10 mb-2">
        <Link href={"/post/new"}>
          <Button>Post Course</Button>
        </Link>
      </div>
    </nav>
  );
};
export default Nav;
