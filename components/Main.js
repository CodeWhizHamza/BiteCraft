"use client";
import React, { useState } from "react";
import Image from "next/image";

const Items = ({ item, foodType }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
      <a href="#">
        <Image className="p-8 rounded-t-lg" src={item.img} alt="product-img" />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {item.name}
          </h>
        </a>
        <a href="#">
          <p>{item.description}</p>
        </a>
      </div>
      <div className="flex items-center mt-2.5 mb-5 ml-4">
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
          {[1, 2, 3, 4, 5].map((index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${
                index <= rating
                  ? "text-yellow-300"
                  : "text-gray-200 dark:text-gray-600"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
              onClick={() => handleStarClick(index)}
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
          {rating}.0
        </span>
      </div>
      <div className="flex items-center justify-between ml-4">
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          from Rs. {item.price}
        </span>
        <a href="#" className="mr-8 mb-3">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-0">
            Add To Cart
          </button>
        </a>
      </div>
    </li>
  );
};

export default function Main({ menuItems, foodType }) {
  const bakedFoodItems = menuItems.filter((item) => item.type === "Baked Food");
  const frozenFoodItems = menuItems.filter(
    (item) => item.type === "Frozen Food"
  );

  const beefFoodItems = menuItems.filter((item) => item.type === "Beef");
  const chickenFoodItems = menuItems.filter((item) => item.type === "Chicken");
  return (
    <>
      <section id="bakedFoodSection" style={{ backgroundColor: "#f39c12" }}>
        <div className="flex flex-col justify-between mx-auto text-blue-gray-900">
          <h2 className="text-2xl ml-8 mt-4 font-bold tracking-tight text-gray-900 dark:text-white">
            Baked Food
          </h2>
          <ul className="flex flex-col float-left gap-2 mt-2 mb-4  lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {bakedFoodItems.map((item) => (
              <Items item={item} key={item.id} foodType="Baked Food" />
            ))}
          </ul>
        </div>
      </section>
      <section id="frozenFoodSection" style={{ backgroundColor: "#f39c12" }}>
        <div className="flex flex-col justify-between mx-auto text-blue-gray-900">
          <h3 className="text-2xl ml-8 mt-4 font-bold tracking-tight text-gray-900 dark:text-white">
            Frozen Food
          </h3>
          <ul className="flex flex-col float-left gap-2 mt-2 mb-4  lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {frozenFoodItems.map((item) => (
              <Items item={item} key={item.id} foodType="Frozen Food" />
            ))}
          </ul>
        </div>
      </section>

      <section id="beefFoodSection" style={{ backgroundColor: "#f39c12" }}>
        <div className="flex flex-col justify-between mx-auto text-blue-gray-900">
          <h3 className="text-2xl ml-8 mt-4 font-bold tracking-tight text-gray-900 dark:text-white">
            Beef
          </h3>
          <ul className="flex flex-col float-left gap-2 mt-2 mb-4  lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {beefFoodItems.map((item) => (
              <Items item={item} key={item.id} foodType="Beef" />
            ))}
          </ul>
        </div>
      </section>

      <section id="chickenFoodSection" style={{ backgroundColor: "#f39c12" }}>
        <div className="flex flex-col justify-between mx-auto text-blue-gray-900">
          <h3 className="text-2xl ml-8 mt-4 font-bold tracking-tight text-gray-900 dark:text-white">
            Chicken
          </h3>
          <ul className="flex flex-col float-left gap-2 mt-2 mb-4  lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {chickenFoodItems.map((item) => (
              <Items item={item} key={item.id} foodType="Chicken" />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
