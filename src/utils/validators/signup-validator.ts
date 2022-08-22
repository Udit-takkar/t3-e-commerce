import { z } from "zod";

export const signUpValidator = z.object({
  name: z.string().min(4).max(20),
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

export type signUpInputType = z.infer<typeof signUpValidator>;
