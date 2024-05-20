"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { useFoodItemsStore } from "@/store/foodItems";

export default function Page() {
  const cart = useCartStore((state) => state.cart);
  const handleDelete = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const foodItems = useFoodItemsStore((state) => state.foodItems);

  useEffect(() => {
    setTotalPrice(
      cart.reduce((acc, item) => {
        const foodItem = foodItems.find((foodItem) => foodItem._id === item.id);
        if (!foodItem) {
          return acc;
        }
        return acc + foodItem.price * item.quantity;
      }, 0)
    );
  }, [cart, foodItems]);

  const handleIncrement = (id: string) => {
    const item = cart.find((item) => item.id === id)!;
    updateQuantity(id, item.quantity + 1);
  };

  const handleDecrement = (id: string) => {
    const item = cart.find((item) => item.id === id)!;
    updateQuantity(id, item.quantity - 1);
  };

  return (
    <>
      <Navbar />
      <section className="py-8 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto grid grid-cols-4">
          <h2 className="title font-bold text-4xl leading-10 mb-8 text-center text-black col-span-4">
            Your cart
          </h2>

          <div className="col-span-3">
            {cart.map((item) => {
              const foodItem = foodItems.find(
                (foodItem) => foodItem._id === item.id
              );
              console.log(foodItem);

              if (!foodItem) {
                return null;
              }

              return (
                <div
                  key={item.id}
                  className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4"
                >
                  <div className="col-span-12 lg:col-span-2 img box grid place-items-center">
                    <Image
                      src={foodItem.image}
                      alt={foodItem.name}
                      className="max-lg:w-full lg:w-[180px] object-fit-contain"
                      width={180}
                      height={180}
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                    <div className="flex items-center justify-between w-full mb-4">
                      <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
                        {foodItem.name}
                      </h5>
                      <button
                        className="rounded-full group flex items-center justify-center focus-within:outline-red-500"
                        onClick={() => handleDelete(item.id)}
                      >
                        <svg
                          width="34"
                          height="34"
                          viewBox="0 0 34 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                            cx="17"
                            cy="17"
                            r="17"
                            fill=""
                          />
                          <path
                            className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                            d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                            stroke="#EF4444"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                      {foodItem.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <button
                          className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handleDecrement(item.id)}
                          disabled={item.quantity === 1}
                        >
                          <svg
                            className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                            width="18"
                            height="19"
                            viewBox="0 0 18 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.5 9.5H13.5"
                              stroke=""
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          id="number"
                          className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100  text-center"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
                          onClick={() => handleIncrement(item.id)}
                        >
                          <svg
                            className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                            width="18"
                            height="19"
                            viewBox="0 0 18 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.75 9.5H14.25M9 14.75V4.25"
                              stroke=""
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <h6 className="text-primary font-manrope font-bold text-2xl leading-9 text-right">
                        Rs. {foodItem.price}
                      </h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-span-1 align-self-start  lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto sticky top-0">
            <div className="flex flex-col md:flex-row items-center md:items-center justify-between mb-8">
              <h5 className="text-gray-900 font-semibold text-2xl leading-9 max-md:text-center max-md:mb-4">
                Total
              </h5>
              <h6 className="font-bold text-2xl lead-10 text-primary2">
                Rs. {totalPrice}
              </h6>
            </div>
            <div className="max-lg:max-w-lg max-lg:mx-auto">
              <button className="rounded-full py-4 px-6 bg-primary2 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-primary ">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
