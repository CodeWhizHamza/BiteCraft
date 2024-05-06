"use client";

import React from "react";
import { createContext } from "react";
import { MdCall } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
function AccordionCustomIcon() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <div className="mb-2">
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="py-3 px-4 bg-gray-100 dark:bg-gray-700 cursor-pointer"
          >
            What is KitchenKonnect?
          </AccordionHeader>
          {open === 1 && (
            <AccordionBody className="p-4">
              KitchenKonnect is your one-stop shop for delicious, home-cooked
              meals delivered straight to your door. We use fresh, seasonal
              ingredients to create a variety of dishes that cater to all
              palates.
            </AccordionBody>
          )}
        </Accordion>
      </div>

      <div className="mb-2">
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className="py-3 px-4 bg-gray-100 dark:bg-gray-700 cursor-pointer"
          >
            How does KitchenKonnect work?
          </AccordionHeader>
          {open === 2 && (
            <AccordionBody className="p-4">
              Ordering from KitchenKonnect is simple! Just browse our rotating
              menu online, choose your desired meals, select your delivery time,
              and checkout. We'll take care of the rest, preparing your food
              with love and delivering it fresh to your doorstep.
            </AccordionBody>
          )}
        </Accordion>
      </div>

      <div className="mb-2">
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(3)}
            className="py-3 px-4 bg-gray-100 dark:bg-gray-700 cursor-pointer"
          >
            What are the benefits of using KitchenKonnect?
          </AccordionHeader>
          {open === 3 && (
            <AccordionBody className="p-4">
              KitchenKonnect offers several benefits:
              <ul className="list-disc pl-4 mt-2">
                <li>
                  Enjoy delicious, home-cooked meals without the hassle of
                  cooking.
                </li>
                <li>
                  Discover new flavors and cuisines from the comfort of your
                  home.
                </li>
                <li>
                  Save time and energy by having your food delivered fresh and
                  ready to eat.
                </li>
              </ul>
            </AccordionBody>
          )}
        </Accordion>
      </div>

      <div className="mb-2">
        <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(4)}
            className="py-3 px-4 bg-gray-100 dark:bg-gray-700 cursor-pointer"
          >
            Why KitchenKonnect?
          </AccordionHeader>
          {open === 4 && (
            <AccordionBody className="p-4">
              There are many reasons to choose KitchenKonnect for your
              home-cooked meals:
              <ul className="list-disc pl-4 mt-2">
                <li>
                  Taste the love: We use fresh, high-quality ingredients and
                  traditional cooking methods to create dishes that taste like
                  homemade.
                </li>
                <li>
                  Variety and convenience: Enjoy a wide selection of cuisines
                  and dishes, all delivered conveniently to your doorstep.
                </li>
                <li>
                  Save time and effort: Skip the grocery shopping, cooking, and
                  cleaning. We take care of everything so you can relax and
                  enjoy a delicious meal.
                </li>
              </ul>
            </AccordionBody>
          )}
        </Accordion>
      </div>
    </>
  );
}

export default function Footer() {
  return (
    <>
      <footer
        style={{ backgroundColor: "#f39c12" }}
        className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900 "
      >
        <div
          style={{ backgroundColor: "#d35400", border: "#d35400" }}
          className="w-full max-w-screen-3xl mt-12 p-4 py-6 lg:py-8 border-gray-200 rounded-lg shadow-xl mb-4 h-[20rem] dark:bg-gray-800 dark:border-gray-700"
        >
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
              © 2024 <a></a> All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
