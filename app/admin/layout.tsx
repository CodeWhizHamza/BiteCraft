"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaRegUser } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import { useUserAuth } from "@/store/userAuth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showMenu, setShowMenu] = useState(false);
  const logout = useUserAuth((state) => state.logout);
  const isLoggedIn = useUserAuth((state) => state.isLoggedIn);

  return (
    <>
      {isLoggedIn && (
        <nav className="flex flex-col md:flex-row items-center w-full p-2 text-black rounded-none shadow-md bg-opacity-80 justify-between mx-auto text-blue-gray-900 bg-primary border-primary">
          <div className="w-full flex items-center justify-between flex-1">
            <Link
              className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
              href="/"
            >
              <Image
                src="/logo-without-text.png"
                width={60}
                height={60}
                alt="Logo"
                className="object-contain w-auto h-auto"
              />
            </Link>

            {/* Hamburger icon that's visible only till md screen and then hidden */}
            <div className="block md:hidden">
              <button
                className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900"
                onClick={() => setShowMenu(!showMenu)}
              >
                <FaBars style={{ fontSize: "25px", color: "#ecf0f1" }} />
              </button>
            </div>
          </div>

          <div className={`${!showMenu && "hidden"} md:block`}>
            <ul className="flex gap-4 flex-col justify-center items-center md:flex-row text-white">
              <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
                <Link href="/admin/food-menu">Food Menu</Link>
              </li>
              <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
                <Link href="/admin/orders">Orders</Link>
              </li>
              <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
                <Link href="/admin/users">Users</Link>
              </li>
              <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
                <Link href="/admin/reviews">Reviews</Link>
              </li>
              <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
                <button
                  onClick={() => logout()}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      )}

      <main>{children}</main>
    </>
  );
}
