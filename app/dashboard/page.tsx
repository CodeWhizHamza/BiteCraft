"use client";
import Navbar from "@/components/Navbar";
import { useUserAuth } from "@/store/userAuth";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const isAlreadyLoggedIn = useUserAuth((state) => state.isLoggedIn);
  const isAdmin = useUserAuth((state) => state.user?.role === "admin");

  if (!isAlreadyLoggedIn) {
    router.replace("/login");
    return null;
  }

  if (isAdmin) {
    router.replace("/admin");
    return null;
  }

  return (
    <>
      <Navbar />

      <div className="my-4 max-w-2xl mx-auto flex items-center justify-center">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg w-full max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Dashboard
          </h3>
        </div>
      </div>
    </>
  );
}
