"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Dropdown } from "./userButton";
import { FaSignOutAlt } from "react-icons/fa";

const NavbarActions = () => {
  const session = useSession();
  const user = session.data?.user;
  const dropDownOptions = [
    {
      name: "Sign Out",
      icon: FaSignOutAlt,
      onClick: () => {
        signOut();
      },
    },
  ];
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
              {" "}
              Login
            </Button>
          </a>
          <a href="/signup">
            <Button variant="ghost">Signup</Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default NavbarActions;
