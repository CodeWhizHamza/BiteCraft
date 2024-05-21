"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/store/userAuth";

export default function Page() {
  const router = useRouter();
  const isAlreadyLoggedIn = useUserAuth((state) => state.isLoggedIn);
  const loginUser = useUserAuth((state) => state.login);

  if (isAlreadyLoggedIn) {
    router.push("/dashboard");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const phone = form.phone.value.replace(/\s/g, "");
    const password = form.password.value;

    // phone number should contain only numbers and + sign
    if (!/^\+?[0-9]+$/.test(phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    if (phone.length < 11 || phone.length > 13) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await axios.post("/users/login", {
        phoneNumber: phone,
        password,
      });
      const data = await response.data;
      loginUser(data.accessToken);
      toast.success("Logged in successfully.");
      router.push("/dashboard");
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
              Sign in to KitchenKonnect
            </h3>
            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your phone number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                defaultValue="03421798786" // Comment it out after testing
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
                defaultValue="12345678" // Comment it out after testing
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary2 focus:border-primary2 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary2 hover:bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary"
            >
              Login to your account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <Link
                href="/register"
                className="text-primary hover:underline dark:text-primary2"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
