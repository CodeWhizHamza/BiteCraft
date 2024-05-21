"use client";

import React from "react";
import AccordionWithCustomIcon from "./AccordionWithCustomIcon";

export default function HomeCookedGoodness() {
  return (
    <>
      <div className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900 bg-primary2">
        <div className="mx-auto w-full max-w-screen-xl p-4 mt-12 py-6 lg:py-8 shadow-2xl rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-primary border-primary">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Home Cooked Goodness
          </h2>
          <AccordionWithCustomIcon />
        </div>
      </div>
    </>
  );
}
