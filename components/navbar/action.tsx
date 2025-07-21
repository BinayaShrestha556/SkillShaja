"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Dropdown } from "./userButton";
import { FaSignOutAlt } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { IconType } from "react-icons";

const NavbarActions = () => {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();

  // State to hold dropdown options
  const [dropDownOptions, setDropDownOptions] = useState<
    { name: string; icon: IconType; href?: string; onClick: () => void }[]
  >([]);

  useEffect(() => {
    // Update dropdown options whenever the user object changes
    console.log(user);
    const newOptions = [
      {
        name: "Profile",
        icon: BiUserCircle,
        href: `/user/${user?.id}`,
        onClick: () => {
          console.log(user?.id);
          if (user?.id) router.push(`/user/${user?.id}`);
        },
      },
      {
        name: "Sign Out",
        icon: FaSignOutAlt,
        onClick: () => {
          signOut();
        },
      },
    ];
    setDropDownOptions(newOptions);
  }, [user, router]); // Dependency array: re-run effect if user or router changes

  return (
    <div className="w-full flex items-center">
      {user ? (
        <div className="flex items-center">
          <Dropdown
            image={user.image || "/avatar.png"}
            name={user.name || "no name"}
            options={dropDownOptions}
          />
        </div>
      ) : (
        <div className="flex items-center">
          <a href="/signin">
            <Button className="rounded-xl" size="lg">
              Login
            </Button>
          </a>
          <a href="/signup" className="hidden md:block">
            <Button variant="ghost">Signup</Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default NavbarActions;
