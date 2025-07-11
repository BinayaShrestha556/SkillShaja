"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IconType } from "react-icons";
interface DropDownProps {
  image: string;
  options: {
    icon: IconType;
    name: string;
    onClick: () => void;
  }[];
  name: string;
}

export const Dropdown = ({ image, options, name }: DropDownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-full gap-2 items-center border rounded-lg p-1 text-sm">
          <div className="overflow-hidden h-7 aspect-square rounded-md relative">
            <Image
              src={image}
              alt="profile pic"
              fill
              className="object-center object-cover"
            />
          </div>
          {name}
          <RiArrowDropDownLine size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((e) => (
          <DropdownMenuItem onClick={e.onClick} key={e.name} className="">
            <e.icon />
            <span>{e.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
