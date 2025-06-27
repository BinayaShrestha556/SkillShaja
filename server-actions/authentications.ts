"use server";

import prisma from "@/lib/db/db";
import { executeAction } from "@/lib/executeFn";
import { loginSchema, signupSchema } from "@/lib/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export const signUp = async (formData: z.infer<typeof signupSchema>) => {
  return executeAction({
    actionFn: async () => {
      const validateData = signupSchema.parse(formData);
      const existingUser = await prisma.user.findUnique({
        where: {
          email: validateData.email,
        },
      });
      if (existingUser) throw new Error("Email already in use.");

      const hashedPassword = await bcrypt.hash(validateData.password, 10);
      await prisma.user.create({
        data: {
          name: validateData.fullName,
          email: validateData.email,
          password: hashedPassword,
        },
      });
      redirect("/signin");
    },
    successMessage: "User registered.",
  });
};
export const login = async (formData: z.infer<typeof loginSchema>) => {
  return executeAction({
    actionFn: async () => {
      await signIn("credentials", { ...formData, redirectTo: "/" });
    },
    successMessage: "Logged in successfully",
  });
};
