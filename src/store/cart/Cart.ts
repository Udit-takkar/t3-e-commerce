import { createSelectorHooks } from "auto-zustand-selectors-hook";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Cart {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  salePrice: number;
  brand: string;
  currentInventory: number;
  categoris: Category[];
  createdAt: string;
}

type CartStoreType = {
  items: Cart[];
  total: number;
  add: (item: Cart) => void;
  populate: (items: Cart[], total: number) => void;
  update: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
};

const useCartStoreBase = create<CartStoreType>()(
  devtools(
    (set) => ({
      items: [],
      total: 0,
      add: (item) => {
        set((state) => ({ ...state, items: [...state.items, item] }));
      },
      populate: (items, total) => {
        set((state) => ({ ...state, items, total }));
      },
      update: (productId, quantity) => {
        set((state) => ({
          ...state,
          items: state.items.map((item: Cart) => ({
            ...item,
            quantity: item.id === productId ? quantity : item.currentInventory,
          })),
        }));
      },
      remove: (productId) => {
        set((state) => ({
          ...state,
          items: state.items.filter((item: Cart) => item.id !== productId),
        }));
      },
    }),
    { name: "CartStore" }
  )
);

const useCartStore = createSelectorHooks(useCartStoreBase);

export default useCartStore;
