import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen flex w-full items-center justify-center bg-background text-2xl flex-col gap-5">
      <div className="relative ">
        <Image
          src="/fishing.png"
          width={200}
          height={0} // required to avoid error, but will be overridden
          style={{ height: "auto" }}
          alt="fishing"
        />
      </div>
      <p className="text-nowrap leading-0.5">
        Sorry mate,
        <span className="text-accent-foreground font-semibold">
          {" "}
          NOT FOUND!
        </span>{" "}
        maybe try something else
      </p>
    </div>
  );
};

export default NotFound;
