import React from "react";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

// Assuming your image is in the public folder

const LandingPage = () => {
  return (
    <div
      className=" w-full h-fit  flex flex-col scroll-smooth justify-center items-center text-foreground "
      // overflow-hidden is good practice to prevent blur edges from showing outside
    >
      <div className=" inset-0 z-0  scroll-smooth">
        {/* Semi-transparent overlay for better text visibility */}
        <div className="flex w-full h-[100dvh] p-10 ">
          <div className="flex-1 h-full relative rounded-2xl overflow-hidden hidden md:block">
            <Image
              src="/teamwork.jpeg"
              alt="clip art with team work illustration"
              fill
              className="object-cover object-center p-10"
            />
          </div>
          <div className="relative z-20 text-center p-4 h-full w-full flex flex-col flex-1 items-center justify-center">
            <h1 className="lg:text-7xl text-5xl font-bold text-foreground text-shadow-lg">
              Share And Learn, <br />
              <span className="text-secondary-foreground">
                One Skill at a Time.
              </span>
            </h1>
            <p className="text-muted-foreground    md:text-xl ">
              A platform to share your ideas and pictures with the world.
            </p>

            <a
              href="/explore"
              className="relative inline-flex mt-10 items-center justify-center p-4 px-12 py-5 bg-primary overflow-hidden font-medium  transition hover:border-accent-foreground duration-500 ease-out border border-primary rounded-full shadow-md group animate-fade-up animate-delay-300 animation-duration-700"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-primary duration-300 -translate-x-full bg-accent group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-primary-foreground transition-all duration-300 transform group-hover:translate-x-full ease">
                Explore{" "}
                <svg
                  className="w-6 h-6 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="relative invisible">Explore </span>
            </a>
            <Link href="#2" className="-ml-12">
              <ArrowDown
                size={45}
                className="absolute bottom-10 hover:text-primary transition duration-300 cursor-pointer p-1.5"
              />
            </Link>
          </div>
        </div>
        <div className="bg-accent z-10 md:h-[100dvh]  flex flex-col md:flex-row items-center gap-20 justify-center w-full md:p-20 p-10">
          {/* Left Column: Image Container (flex-1) */}
          <div className="flex-1 relative aspect-square  md:h-full w-full rounded-[50px]">
            {/*
          1. The "Shadow" Div - Placed first in JSX to be visually behind
          the Image by default, but explicitly controlled by z-index.
          Matches the parent's rounded corners.
        */}
            <div
              className="absolute inset-0 translate-x-8 translate-y-8 bg-black/80  rounded-[50px] z-10"
              // bg-black/50: Black color with 50% opacity
              // rounded-[50px]: Matches the parent container's border-radius for the shadow shape
              // z-0: Ensures it's at the back
              // blur-lg: Applies a blur filter to the shadow itself, making it softer
            ></div>

            {/*
          2. The Image Itself - Sits on top of the shadow.
          Needs a higher z-index to ensure it's visible over the shadow.
        */}
            <Image
              id="2"
              src="/2nd_part.jpeg" // Make sure this path is correct relative to your public folder
              alt="Descriptive alt text for the image"
              fill
              className="object-center object-cover z-10 rounded-4xl" // z-10 ensures it's above the z-0 shadow
              priority // Prioritize loading for above-the-fold images
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Right Column: Your other content (flex-1) */}
          <div className="flex-1 text-left items-center  md:p-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-accent-foreground mb-4">
              Unlock Your Potential
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Beyond textbooks, beyond traditional classrooms, lies a world of
              knowledge waiting to be shared and mastered. SkillSajha is your
              platform, a vibrant community where every lesson learned, every
              skill shared, empowers you to grow. Share your expertise, learn
              from passionate mentors, and discover a universe of possibilities.
            </p>
            <div className="flex gap-4 mt-8">
              {" "}
              <a href="/signup" className="cursor-pointer">
                <Button
                  size={"lg"}
                  className="rounded-xl cursor-pointer animate-pulse"
                >
                  Register
                </Button>{" "}
              </a>
              <a href="/signin" className="cursor-pointer">
                <Button
                  size={"lg"}
                  variant={"ghost"}
                  className="rounded-xl cursor-pointer underline px-2"
                >
                  signin
                </Button>{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
