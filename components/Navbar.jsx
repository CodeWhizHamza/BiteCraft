"use client";

import React, { useState } from "react";

import { CiLocationOn } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [showSearchBox, setShowSearchBox] = useState(false);

  return (
    <>
      <div className="w-full z-10">
        <nav
          style={{ backgroundColor: "#d35400", border: "#d35400" }}
          className="flex items-center w-full px-4 py-8 text-black rounded-none shadow-md h-max bg-opacity-80 lg:px-8 lg:py-4 justify-between mx-auto text-blue-gray-900"
        >
          <a className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
            <Image
              src="/logo-without-text.png"
              width={60}
              height={60}
              objectFit="contain"
              alt="Logo"
            />
          </a>
          <div className="hidden lg:block">
            <ul className="flex flex-col float-right gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900 overflow-hidden">
                <form>
                  <label
                    for="search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div
                      className={`${
                        showSearchBox ? "" : "opacity-0 scale-x-0"
                      } transition-all duration-300 origin-right`}
                    >
                      <input
                        type="search"
                        id="search"
                        className="block bg-transparent focus:bg-transparent  w-full p-4 text-sm text-white rounded-lg placeholder-gray-200 dark:text-white"
                        placeholder="Search"
                        required
                      />
                    </div>

                    <div className="absolute inset-y-0 end-0 flex items-center">
                      <a
                        href="#"
                        className="flex items-center"
                        onClick={() => setShowSearchBox(!showSearchBox)}
                      >
                        <IoMdSearch
                          style={{ fontSize: "25px", color: "#ecf0f1" }}
                        />
                      </a>
                    </div>
                  </div>
                </form>
              </li>
              <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
                <Link className="flex items-center" href="/login">
                  <FaRegUser style={{ fontSize: "25px", color: "#ecf0f1" }} />
                </Link>
              </li>
              <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
                <a className="flex items-center">
                  <AiOutlineShoppingCart
                    style={{ fontSize: "25px", color: "#ecf0f1" }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
