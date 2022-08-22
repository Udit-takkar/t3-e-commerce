import * as trpc from "@trpc/server";
import { hash } from "argon2";
import {
  signUpValidator,
  signUpInputType,
} from "../../utils/validators/signup-validator";
import { Context } from "./context";
import { createRouter } from "./context";

export const signupRouter = createRouter().mutation("signup", {
  input: signUpValidator,
  resolve: async ({ input, ctx }) => {
    try {
      const { name, email, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: { name, email, password: hashedPassword },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    } catch (err) {
      console.log("WTF", err);
      return {
        status: 500,
        message: "Something went wrong",
        result: null,
      };
    }
  },
});

export type ServerRouter = typeof signupRouter;
