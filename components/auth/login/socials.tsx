"use client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

import { useSearchParams } from "next/navigation";
export const Social = () => {
  const params = useSearchParams();
  const callbackUrl = params.get("redirect");
  const onClick = (providers: "google" | "github") => {
    const redirectUrl = Array.isArray(callbackUrl)
      ? callbackUrl[0]
      : callbackUrl || "/";
    signIn(providers, {
      redirectTo: redirectUrl,
    });
  };

  return (
    <div className="flex w-full flex-wrap justify-center gap-y-4 gap-x-4">
      <Button
        type="button"
        variant={"outline"}
        className="flex-1 flex items-center gap-2"
        size="lg"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5 text-sm font-semibold " />{" "}
        <p>Continue with google</p>
      </Button>
      <Button
        type="button"
        variant={"outline"}
        size="lg"
        className="flex-1 flex items-center gap-2"
        onClick={() => {
          onClick("github");
        }}
      >
        <FaGithub className="h-5 w-5" /> <p>Continue with github</p>
      </Button>
    </div>
  );
};
