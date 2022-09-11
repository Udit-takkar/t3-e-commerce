import { createRouter } from "./context";
import { signUpValidator } from "../../utils/validators/signup-validator";
import * as trpc from "@trpc/server";
import { prisma } from "../../server/db/client";

export const productsRouter = createRouter().query("trendingProducts", {
  resolve: async ({ input, ctx }) => {
    try {
      const products = await prisma.product.findMany({
        take: 8,
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
          salePrice: true,
          brand: true,
          currentInventory: true,
          categories: {
            include: {
              category: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return {
        status: 200,
        message: "Trending Products Fetched successfully",
        result: products,
      };
    } catch (err) {
      return {
        status: 500,
        message: "Something went wrong",
        result: null,
      };
    }
  },
});
