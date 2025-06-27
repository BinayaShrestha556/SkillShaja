import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import prisma from "./lib/db/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { loginSchema } from "./lib/schema";
import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";
import bcrypt from "bcryptjs";

const adapter = PrismaAdapter(prisma);
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
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
          },
        });
        if (!user) throw new Error("user not found");
        if (!user.password) throw new Error("logged in using another password");
        const correctPassword = await bcrypt.compare(
          validateCredentials.password,
          user.password
        );
        if (!correctPassword) throw new Error("incorrect credentials");
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();
        if (!params.token.sub) {
          throw new Error("no user id in token");
        }
        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        });
        if (!createdSession) {
          throw new Error("Failed to create session");
        }
        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
});
