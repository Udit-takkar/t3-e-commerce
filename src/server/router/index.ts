// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { signupRouter } from "./signup";

export const appRouter = createRouter()
  .transformer(superjson)
  // .merge("example.", exampleRouter)
  // .merge("question.", protectedExampleRouter)
  .merge("auth.", signupRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
