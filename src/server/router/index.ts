import { createRouter } from "./context";
import superjson from "superjson";

// import { exampleRouter } from "./example";
// import { protectedExampleRouter } from "./protected-example-router";
import { signupRouter } from "./signup";
import { productsRouter } from "./products-router";

export const appRouter = createRouter()
  .transformer(superjson)
  // .merge("example.", exampleRouter)
  // .merge("question.", protectedExampleRouter)
  .merge("auth.", signupRouter)
  .merge("products.", productsRouter);

export type AppRouter = typeof appRouter;
