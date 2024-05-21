import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ICartStore {
  cart: {
    id: string;
    quantity: number;
  }[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<ICartStore>(
    (set) => ({
      cart: [],
      addToCart: (id: string) => {
        set((state) => {
          const item = state.cart.find((item) => item.id === id);
          if (item) {
            return {
              cart: state.cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          } else {
            return {
              cart: [...state.cart, { id, quantity: 1 }],
            };
          }
        });
      },
      removeFromCart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id: string, quantity: number) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "cart",
    }
  )
);
