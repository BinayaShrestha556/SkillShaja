import { User } from "./node_modules/@auth/core/providers/notion.d";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import prisma from "./lib/db/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { loginSchema } from "./lib/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validateCredentials = loginSchema.parse(credentials);
        const user = await prisma.user.findUnique({
          where: {
            email: validateCredentials.email,
            password: validateCredentials.password,
          },
        });
        if (!user) {
          throw new Error("Invalid user credentials");
        }
        return user;
      },
    }),
  ],
});
