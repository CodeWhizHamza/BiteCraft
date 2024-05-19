"use client";

import React, { useState } from "react";

import { CiLocationOn } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { FaRegUser, FaBars } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="w-full z-10">
        <nav
          style={{ backgroundColor: "#d35400", border: "#d35400" }}
          className="flex flex-col md:flex-row items-center w-full p-2 text-black rounded-none shadow-md bg-opacity-80 justify-between mx-auto text-blue-gray-900"
        >
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
            <ul className="flex gap-4 flex-col justify-center items-center md:flex-row">
              <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900 overflow-hidden">
                <form>
                  <label
                    htmlFor="search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div
                      className={`${
                        showSearchBox || showMenu ? "" : "opacity-0 scale-x-0"
                      } transition-all duration-300 origin-right`}
                    >
                      <input
                        type="search"
                        id="search"
                        className="block bg-transparent focus:bg-transparent  w-full px-4 py-2 text-sm text-white rounded-lg placeholder-gray-200 dark:text-white border md:border-0"
                        placeholder="Search"
                        required
                      />
                    </div>

                    <div className="absolute inset-y-0 end-0 md:flex items-center hidden">
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
                <Link className="flex items-center" href="/cart">
                  <AiOutlineShoppingCart
                    style={{ fontSize: "25px", color: "#ecf0f1" }}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
