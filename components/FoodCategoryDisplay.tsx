"use client";
import { useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import { useFoodItemsStore } from "@/store/foodItems";

export default function FoodCategoryDisplay() {
  const foodItems = useFoodItemsStore((state) => state.foodItems);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const categories = foodItems.map((item) => item.category);
    const uniqueCategories = Array.from(new Set(categories));
    setCategories(uniqueCategories);
  }, [foodItems]);

  return (
    <div className="bg-primary2">
      <div className="container mx-auto p-4">
        {categories.map((category) => {
          const items = foodItems.filter((item) => item.category === category);
          return (
            <section key={category} id={`${category}Section`}>
              <div className="flex flex-col justify-between mx-auto text-blue-gray-900">
                <h2 className="text-4xl mb-4 mt-12 font-bold tracking-tight text-gray-50 dark:text-white">
                  {category}
                </h2>
                <ul className="flex flex-col float-left gap-2 mt-2 mb-4  lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                  {items.map((item) => (
                    <FoodItem item={item} key={item._id} />
                  ))}
                </ul>
              </div>
            </section>
          );
        })}

        {/* <section id="bakedFoodSection">
          <div className="flex flex-col justify-between mx-auto text-blue-gray-900">
            <h2 className="text-4xl mb-4 mt-12 font-bold tracking-tight text-gray-50 dark:text-white">
              Baked Food
            </h2>
            <ul className="flex flex-col float-left gap-2 mt-2 mb-4  lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {bakedFoodItems.map((item) => (
                <FoodItem item={item} key={item.id} foodType="Baked Food" />
              ))}
            </ul>
          </div>
        </section>
        <section id="frozenFoodSection">
          <div className="flex flex-col justify-between mx-auto text-blue-gray-900">
            <h3 className="text-4xl mb-4 mt-12 font-bold tracking-tight text-gray-50 dark:text-white">
              Frozen Food
            </h3>
            <ul className="flex flex-col float-left gap-2 mt-2 mb-4  lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {frozenFoodItems.map((item) => (
                <FoodItem item={item} key={item.id} foodType="Frozen Food" />
              ))}
            </ul>
          </div>
        </section>

        <section id="beefFoodSection">
          <div className="flex flex-col justify-between mx-auto text-blue-gray-900">
            <h3 className="text-4xl mb-4 mt-12 font-bold tracking-tight text-gray-50 dark:text-white">
              Beef
            </h3>
            <ul className="flex flex-col float-left gap-2 mt-2 mb-4  lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {beefFoodItems.map((item) => (
                <FoodItem item={item} key={item.id} foodType="Beef" />
              ))}
            </ul>
          </div>
        </section>

        <section id="chickenFoodSection">
          <div className="flex flex-col justify-between mx-auto text-blue-gray-900">
            <h3 className="text-4xl mb-4 mt-12 font-bold tracking-tight text-gray-50 dark:text-white">
              Chicken
            </h3>
            <ul className="flex flex-col float-left gap-2 mt-2 mb-4  lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {chickenFoodItems.map((item) => (
                <FoodItem item={item} key={item.id} foodType="Chicken" />
              ))}
            </ul>
          </div>
        </section> */}
      </div>
    </div>
  );
}
