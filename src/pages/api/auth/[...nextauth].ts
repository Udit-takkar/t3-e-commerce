import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import { loginValidator } from "../../../utils/validators/login-validator";
import Credentials from "next-auth/providers/credentials";
import { verify } from "argon2";

// const notFound = {
//   id: 2,
//   email: null,
//   name: null,
//   role: null,
// };

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "email-login",
      id: "email-login",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, request) => {
        if (!credentials) {
          console.error(`For some reason credentials are missing`);
          throw new Error("Credential missing");
        }
        const creds = await loginValidator.parseAsync(credentials);

        const user = await prisma.user.findUnique({
          where: { email: creds.email.toLowerCase() },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await verify(user.password, creds.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
        // TODO: Figure out how to fix type error here
        //@ts-ignore
        session.role = token.role;
      }

      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/login",
    newUser: "/",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(nextAuthOptions);
