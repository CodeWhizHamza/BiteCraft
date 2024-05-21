"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useUserAuth } from "@/store/userAuth";
import { useRouter } from "next/navigation";

export default function Page() {
  const loginUser = useUserAuth((state) => state.login);
  const isAlreadyLoggedIn = useUserAuth((state) => state.isLoggedIn);
  const router = useRouter();

  if (isAlreadyLoggedIn) {
    router.push("/dashboard");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await axios.post("/users/register", {
        name: formData.get("name"),
        phoneNumber: formData.get("phone"),
        password: formData.get("password"),
        address: formData.get("address"),
      });
      const data = await response.data;
      loginUser(data.accessToken);
      toast.success(data.message);
      form.reset();
      router.push("/dashboard");
    } catch (error: any) {
      if (error.response) {
        const data = await error.response.data;
        toast.error(data.message);
      } else {
        console.log(error);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="my-4 max-w-2xl mx-auto flex items-center justify-center">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg w-full max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#" onSubmit={handleSubmit}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our KitchenKonnect
            </h3>
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue="Hamza"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary2 focus:border-primary2 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="e.g. Ali Akram"
                required
              />
            </div>
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
                defaultValue="03421798786"
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
                defaultValue="12345678"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary2 focus:border-primary2 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                defaultValue="Attar Hostel, NUST H-12, Islamabad, Pakistan"
                placeholder="e.g. 123, Main Street, Lahore, Pakistan"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary2 focus:border-primary2 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary2 hover:bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary"
            >
              Create your account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline dark:text-primary2"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
