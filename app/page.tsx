"use client";
import MenuNavBar from "@/components/MenuNavBar";
import Navbar from "@/components/Navbar";
import FoodCategoryDisplay from "@/components/FoodCategoryDisplay";
import HomeCookedGoodness from "@/components/HomeCookedGoodness";
import Footer from "@/components/Footer";
import { useFoodItemsStore } from "@/store/foodItems";
import { useEffect } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa6";

export default function Page() {
  const isLoading = useFoodItemsStore((state) => state.isLoading);

  const foodTypes = [
    { id: "#bakedFoodSection", type: "Baked Food" },
    { id: "#frozenFoodSection", type: "Frozen Food" },
    { id: "#chickenFoodSection", type: "Chicken" },
    { id: "#beefFoodSection", type: "Beef" },
  ];

  return (
    <>
      <Navbar />
      <MenuNavBar />

      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <FaSpinner className="animate-spin text-5xl text-primary" />
        </div>
      ) : (
        <FoodCategoryDisplay />
      )}
      <HomeCookedGoodness />
      <Footer />
    </>
  );
}
