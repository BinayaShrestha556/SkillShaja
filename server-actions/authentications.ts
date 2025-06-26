"use server";

import prisma from "@/lib/db/db";
import { executeAction } from "@/lib/executeFn";
import { loginSchema, signupSchema } from "@/lib/schema";

const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const email = formData.get("email");
      const password = formData.get("password");
      const name = formData.get("fullName");
      const validateData = signupSchema.parse({ email, password, name });
      await prisma.user.create({
        data: {
          name: validateData.fullName,
          email: validateData.email,
          password: validateData.password,
        },
      });
    },
  });
};
export { signUp };
