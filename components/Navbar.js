import React from "react";

import { CiLocationOn } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 block w-full max-w-full px-4 py-8 text-black bg-white border rounded-none shadow-md h-max  bg-opacity-80 lg:px-8  lg:py-4">
      <div className="container flex flex-wrap items-center justify-between mx-auto text-blue-gray-900">
        <div className="flex items-center">
          {" "}
          {/* Combined container for icon and "Deliver to" */}
          <a className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
            <CiLocationOn className="mt-4" style={{ fontSize: "28px" }} />
          </a>
          <a className="flex flex-col mb-2 ml-2">
            <span className="ml-2 mt-8"> Deliver to </span>
            <span className="ml-2" style={{ fontSize: "12px" }}>
              National University of....
            </span>
          </a>
        </div>
        <a className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
          <h1 style={{ fontSize: "25px" }}>KitchenKonnect</h1>
        </a>
        <div className="hidden lg:block">
          <ul className="flex flex-col float-right gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
              <a className="flex items-center">
                <IoMdSearch style={{ fontSize: "25px" }} />
              </a>
            </li>
            <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
              <a className="flex items-center">
                <FaRegUser style={{ fontSize: "25px" }} />
              </a>
            </li>
            <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
              <a className="flex items-center">
                <AiOutlineShoppingCart style={{ fontSize: "25px" }} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
