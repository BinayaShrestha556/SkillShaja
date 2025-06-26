import { signIn } from "@/auth";
import React from "react";

const page = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign in with GitHub
        </button>
      </form>
    </>
  );
};

export default page;
