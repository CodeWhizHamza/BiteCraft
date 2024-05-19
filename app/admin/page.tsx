"use client";
import { useUserAuth } from "@/store/userAuth";
import { redirect, useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const isLoggedIn = useUserAuth((state) => state.isLoggedIn);
  const isNotAdmin = useUserAuth((state) => state.user?.role !== "admin");

  if (!isLoggedIn) {
    router.replace("/admin/login");
    return null;
  }

  if (isNotAdmin) {
    router.replace("/dashboard");
    return null;
  }
  return redirect("/admin/food-menu");
}
