"use client";

import React from "react";
import { MdCall } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";

export default function Footer() {
  return (
    <>
      <footer className="bg-primary2 flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900 ">
        <div className="w-full max-w-screen-3xl mt-12 p-4 py-6 lg:py-8 bg-primary border-primary rounded-lg shadow-xl mb-4 h-[20rem] dark:bg-gray-800 dark:border-gray-700">
          <div className="md:flex md:justify-between ml-12">
            <div className="mb-6 md:mb-0">
              <a className="flex items-center">
                <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">
                  KitchenKonnect
                </span>
              </a>
              <a href="tel:+051111224466" className="flex flex-row gap-2 mt-4">
                <MdCall className="mt-1" />
                <span className="self-center text-base whitespace-nowrap dark:text-white">
                  (051) 111224466
                </span>
              </a>
              <a className="flex flex-row gap-2">
                <MdEmail className="mt-1" />
                <span className="self-center text-base whitespace-nowrap dark:text-white">
                  support@kitchenkonnect.com
                </span>
              </a>
              <a className="flex flex-row gap-2">
                <MdLocationOn className="mt-1" />
                <span className="self-center text-base whitespace-nowrap dark:text-white">
                  KitchenKonnect-H-12, Islamabad
                </span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-xl font-bold  dark:text-white">
                  Our Timings
                </h2>
                <ul className="dark:text-white -mt-2 ">
                  <li>
                    <a>
                      <span className="self-center text-base whitespace-nowrap dark:text-white">
                        Monday-Thursday
                      </span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span className="self-center text-base whitespace-nowrap dark:text-white">
                        Friday
                      </span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span className="self-center text-base whitespace-nowrap dark:text-white">
                        Saturday-Sunday
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-11">
                <ul className="dark:text-white">
                  <li>
                    <a>
                      <span className="self-center text-base whitespace-nowrap dark:text-white">
                        11:00 AM - 03:00 AM
                      </span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span className="self-center text-base whitespace-nowrap dark:text-white">
                        {" "}
                        02:00 PM - 03:00 AM
                      </span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span className="self-center text-base whitespace-nowrap dark:text-white">
                        11:00 AM - 03:00 AM
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-black sm:mx-auto dark:border-gray-700 lg:my-8"></hr>
          <div className="sm:flex sm:items-center sm:justify-between">
            <span
              style={{ color: "black" }}
              className="text-sm text-gray-500 sm:text-center dark:text-gray-400"
            >
              © 2024 <a href="/">KitchenKonnect</a> All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
