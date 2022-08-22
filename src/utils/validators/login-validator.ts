import { z } from "zod";

export const loginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

export type loginInputType = z.infer<typeof loginValidator>;
