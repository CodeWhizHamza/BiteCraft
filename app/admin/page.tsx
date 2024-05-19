"use client";

import { useUserAuth } from "@/store/userAuth";
import { redirect, useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const isLoggedIn = useUserAuth((state) => state.isLoggedIn);
  const isNotAdmin = useUserAuth((state) => state.user?.role !== "admin");
  const logout = useUserAuth((state) => state.logout);

  const handleLogout = () => {
    logout();
  };

  if (!isLoggedIn) {
    router.replace("/admin/login");
    return null;
  }

  if (isNotAdmin) {
    router.replace("/");
    return null;
  }

  return (
    <div>
      <h1>Admin Login</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
}
