"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/store/userAuth";

export default function Page() {
  const router = useRouter();
  const isAlreadyLoggedIn = useUserAuth((state) => state.isLoggedIn);
  const isNotAdmin = useUserAuth((state) => state.user?.role !== "admin");
  const loginUser = useUserAuth((state) => state.login);

  if (isAlreadyLoggedIn) {
    if (isNotAdmin) {
      router.replace("/");
    } else {
      router.replace("/admin");
    }
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const userName = form.userName.value;
    const password = form.password.value;

    try {
      const response = await axios.post("/admin/login", {
        username: userName,
        password,
      });
      const data = await response.data;
      loginUser(data.accessToken);
      toast.success("Logged in successfully.");
      router.push("/admin");
    } catch (error: any) {
      if (error.response) {
        const data = await error.response.data;
        toast.error(data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="my-4 max-w-2xl mx-auto flex items-center justify-center">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg w-full max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Welcome Admin
            </h3>
            <div>
              <label
                htmlFor="userName"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                defaultValue="admin" // Comment it out after testing
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary2 focus:border-primary2 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="e.g. 0312 345 6789"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                defaultValue="admin" // Comment it out after testing
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary2 focus:border-primary2 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary2 hover:bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
