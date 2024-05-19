"use client";
import Categories from "./Categories";
import FoodItems from "./FoodItems";

export default function Page() {
  return (
    <div className="container mx-auto my-4 p-4">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
        Manage your menu here
      </h1>

      <Categories />
      <FoodItems />
    </div>
  );
}
