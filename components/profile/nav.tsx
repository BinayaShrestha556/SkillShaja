"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Nav = ({
  className,

  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  return (
    <nav
      className={cn("flex items-center border-b mt-10", className)}
      {...props}
    >
      <ul className="flex gap-4 ml-10">
        <li>
          <Link
            href="/user"
            className={cn(
              "flex items-center gap-2 text-muted-foreground hover:text-accent-foreground",
              pathname === "/user" &&
                "text-accent-foreground border-b-2 border-accent-foreground"
            )}
          >
            your courses
          </Link>
        </li>
        <li>
          <Link
            href="/user/liked"
            className={cn(
              "flex items-center gap-2 text-muted-foreground hover:text-accent-foreground",
              pathname === "/user/liked" &&
                "text-accent-foreground border-b-2 border-accent-foreground"
            )}
          >
            Liked
          </Link>
        </li>
        <li>
          <Link
            href="/user/watch-later"
            className={cn(
              "flex items-center gap-2 text-muted-foreground hover:text-accent-foreground",
              pathname === "/user/watch-later" &&
                "text-accent-foreground border-b-2 border-accent-foreground"
            )}
          >
            Watch Later
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
