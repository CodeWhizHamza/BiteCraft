"use client";
import { useUserAuth } from "@/store/userAuth";
import Categories from "./Categories";
import FoodItems from "./FoodItems";
import { useRouter } from "next/navigation";

export default function Page() {
  const isLoggedIn = useUserAuth((state) => state.isLoggedIn);
  const router = useRouter();

  if (!isLoggedIn) {
    router.push("/admin/login");
    return null;
  }

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
