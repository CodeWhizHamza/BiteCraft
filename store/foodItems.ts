import IFoodItem from "@/types/FoodItem";
import { create } from "zustand";

interface IFoodItemsStore {
  foodItems: IFoodItem[];
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setFoodItems: (items: IFoodItem[]) => void;
}

export const useFoodItemsStore = create<IFoodItemsStore>((set) => ({
  foodItems: [],
  isLoading: false,
  setIsLoading: (value: boolean) => set({ isLoading: value }),
  setFoodItems: (items: IFoodItem[]) => set({ foodItems: items }),
}));
