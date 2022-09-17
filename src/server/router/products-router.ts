import { createRouter } from "./context";
import { signUpValidator } from "../../utils/validators/signup-validator";
import * as trpc from "@trpc/server";
// import { prisma } from "../../server/db/client";
import { z } from "zod";

export const productsRouter = createRouter()
  .query("trendingProducts", {
    resolve: async ({ input, ctx }) => {
      const { prisma } = ctx;
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
  })
  .query("all", {
    input: z.object({
      category: z.string().nullish(),
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.number().nullish(),
      sortBy: z.record(z.string().min(1), z.enum(["asc", "desc"])).optional(),
    }),
    async resolve({ ctx, input }) {
      try {
        const take = input.limit ?? 10;
        const skip = input.cursor ?? 0;
        const category = input.category ?? null;
        const orderBy = input.sortBy ?? { createdAt: "desc" };

        const { prisma } = ctx;

        const products = await prisma.product.findMany({
          take: take + 1,
          skip,
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
          orderBy,
        });
        const productsFetched = products.length;

        let nextCursor: typeof skip | null = skip;
        if (productsFetched > take) {
          nextCursor += productsFetched;
        } else {
          nextCursor = null;
        }

        return {
          status: 200,
          result: products,
          nextCursor,
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
