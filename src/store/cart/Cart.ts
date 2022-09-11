import { createSelectorHooks } from "auto-zustand-selectors-hook";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { inferQueryOutput } from "../../lib/trpc-react";

export type ProductType = NonNullable<
  inferQueryOutput<"products.trendingProducts">["result"]
>[number] & { quantity?: number };

type CartStoreType = {
  items: ProductType[];
  total: number;
  totalQty: number;
  add: ({ item }: { item: ProductType }) => void;
  populate: (items: ProductType[], total: number) => void;
  update: ({
    productId,
    productPrice,
    productQuantity,
    action,
  }: {
    productId: string;
    productPrice: number;
    action: "increase" | "decrease";
    productQuantity: number;
  }) => void;
  remove: ({
    productId,
    productPrice,
    productQuantity,
  }: {
    productId: string;
    productPrice: number;
    productQuantity: number;
  }) => void;
};

const useCartStoreBase = create<CartStoreType>()(
  devtools(
    (set) => ({
      items: [],
      total: 0,
      totalQty: 0,
      add: ({ item }) => {
        item.quantity = 1;
        set((state) => ({
          ...state,
          items: [...state.items, item],
          totalQty: state.totalQty + 1,
          total: state.total + (item?.salePrice ? item.salePrice : item.price),
        }));
      },
      populate: (items, total) => {
        set((state) => ({ ...state, items, total }));
      },
      update: ({ productId, productPrice, productQuantity, action }) => {
        set((state) => ({
          ...state,
          items: state.items.map((item: ProductType) => ({
            ...item,
            quantity:
              item.id === productId && item.quantity
                ? action === "increase"
                  ? item.quantity + 1
                  : item?.quantity - 1
                : item.quantity,
          })),
          totalQty:
            action === "increase" ? state.totalQty + 1 : state.totalQty - 1,
          total:
            action === "increase"
              ? state.total + productPrice
              : state.total - productPrice,
        }));
      },
      remove: ({ productId, productPrice, productQuantity }) => {
        set((state) => ({
          ...state,
          items: state.items.filter(
            (item: ProductType) => item.id !== productId
          ),
          totalQty: state.totalQty - 1,
          total: state.total - productPrice * productQuantity,
        }));
      },
    }),
    { name: "Cart" }
  )
);

const useCartStore = createSelectorHooks(useCartStoreBase);

export default useCartStore;
