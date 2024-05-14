"use client";

import React, { useState } from "react";

import { CiLocationOn } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Navbar({ foodTypes }) {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const handleSubmitLocation = () => {
    setShowLocationModal(false);
  };

  return (
    <>
      <div className=" w-full z-10">
        <nav
          style={{ backgroundColor: "#d35400", border: "#d35400" }}
          className=" block w-full max-w-full px-4 py-8 text-black rounded-none shadow-md h-max  bg-opacity-80 lg:px-8  lg:py-4"
        >
          <div className="container flex flex-wrap items-center justify-between mx-auto text-blue-gray-900">
            <div className="flex items-center">
              {" "}
              {/* Combined container for icon and "Deliver to" */}
              <a
                className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
                onClick={() => setShowLocationModal(true)}
              >
                <CiLocationOn
                  className="mt-4"
                  style={{ fontSize: "28px", color: "#ecf0f1" }}
                />
              </a>
              <a className="flex flex-col mb-2 ml-2">
                <span className="ml-2 mt-8" style={{ color: "#ecf0f1" }}>
                  {" "}
                  Deliver to{" "}
                </span>
                <span
                  className="ml-2"
                  style={{ fontSize: "12px", color: "#ecf0f1" }}
                >
                  {selectedCity && selectedArea ? (
                    <>
                      {selectedArea}, {selectedCity}
                    </>
                  ) : (
                    "Select location"
                  )}
                </span>
              </a>
            </div>
            {showLocationModal ? (
              <>
                <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen">
                  <div className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900 mt-20">
                    <div className="flex-col mx-auto w-full max-w-screen-sm h-[25rem] p-4 py-6 lg:py-8 bg-white border border-gray-200 rounded-t-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <h2
                        style={{ color: "#d35400" }}
                        className="text-2xl font-bold mb-8 text-center "
                      >
                        Select your location
                      </h2>
                      <form className="max-w-md mx-auto">
                        <div className="relative">
                          <select
                            id="cities"
                            value={selectedCity}
                            onChange={handleCityChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          >
                            <option value="" disabled selected hidden>
                              Choose city
                            </option>
                            <option value="Islamabad">Islamabad</option>
                            <option value="Lahore">Lahore</option>
                            <option value="Bahawalpur">Bahawalpur</option>
                            <option value="Karachi">Karachi</option>
                          </select>
                          <select
                            value={selectedArea}
                            onChange={handleAreaChange}
                            id="areas"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option value="" disabled selected hidden>
                              Choose area
                            </option>
                            {selectedCity === "Islamabad" && (
                              <>
                                <option value="" disabled selected hidden>
                                  Choose area
                                </option>
                                <option value="DHA">DHA</option>
                                <option value="G-9">G-9</option>
                                <option value="H-12">H-12</option>
                                <option value="F-Markaz">F-Markaz</option>
                              </>
                            )}
                            {selectedCity === "Lahore" && (
                              <>
                                <option value="" disabled selected hidden>
                                  Choose area
                                </option>
                                <option value="Faisal Bagh">Faisal Bagh</option>
                                <option value="Kot Begum">Kot Begum</option>
                                <option value="Green Town">Green Town</option>
                                <option value="Iqbal Town">Iqbal Town</option>
                              </>
                            )}
                            {selectedCity === "Karachi" && (
                              <>
                                <option value="" disabled selected hidden>
                                  Choose area
                                </option>
                                <option value="Clifton">Clifton</option>
                                <option value="DHA">DHA</option>
                                <option value="Allama Iqbal Colony">
                                  Allama Iqbal Colony
                                </option>
                                <option value="Lyari">Lyari</option>
                              </>
                            )}
                            {selectedCity === "Bahawalpur" && (
                              <>
                                <option value="" disabled selected hidden>
                                  Choose area
                                </option>
                                <option value="Allama Iqbal Town">
                                  Allama Iqbal Town
                                </option>
                                <option value="Model Town A">
                                  Model Town A
                                </option>
                                <option value="Azizabad Colony">
                                  Azizabad Colony
                                </option>
                                <option value="Johar Town">Johar Town</option>
                              </>
                            )}
                          </select>
                        </div>
                      </form>

                      <button
                        style={{ backgroundColor: "#d35400" }}
                        className="block mx-auto mt-12 my-20 w-auto px-14 h-8  text-white rounded-full shadow hover:shadow-xlg font-semibold"
                        onClick={handleSubmitLocation}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            <a className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
              <h1
                style={{
                  fontSize: "30px",
                  color: "#ecf0f1",
                  fontFamily: "font-serif",
                  fontWeight: "bold",
                }}
              >
                KitchenKonnect
              </h1>
            </a>
            <div className="hidden lg:block">
              <ul className="flex flex-col float-right gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
                  <a
                    href="#"
                    className="flex items-center"
                    onClick={() => setShowSearchModal(true)}
                  >
                    <IoMdSearch
                      style={{ fontSize: "25px", color: "#ecf0f1" }}
                    />
                  </a>
                </li>
                <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
                  <a className="flex items-center">
                    <FaRegUser style={{ fontSize: "25px", color: "#ecf0f1" }} />
                  </a>
                </li>
                <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
                  <a className="flex items-center">
                    <AiOutlineShoppingCart
                      style={{ fontSize: "25px", color: "#ecf0f1" }}
                    />
                  </a>
                </li>
              </ul>
              {showSearchModal ? (
                <>
                  <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen">
                    <div className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900 mt-20">
                      <div className="flex-col mx-auto w-full max-w-screen-sm h-[20rem] p-4 py-6 lg:py-8 bg-white border border-gray-200 rounded-t-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h2
                          style={{ color: "#d35400" }}
                          className="text-2xl font-bold mb-4 text-center"
                        >
                          Search
                        </h2>
                        <form className="max-w-md mx-auto">
                          <label
                            for="default-search"
                            className="mb-2 text-sm text-gray-900 sr-only dark:text-white"
                          >
                            Search
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                              </svg>
                            </div>
                            <input
                              type="search"
                              id="default-search"
                              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Search products here..."
                              required
                            />
                            <button
                              style={{ backgroundColor: "#d35400" }}
                              type="submit"
                              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Search
                            </button>
                          </div>
                        </form>
                        <button
                          style={{ backgroundColor: "#d35400" }}
                          className="block mx-auto mt-20 my-20 w-auto px-8 h-8 bg-red-800 text-white rounded-full shadow hover:shadow-xlg font-semibold"
                          onClick={() => setShowSearchModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </nav>
      </div>
      <div className="">
        <MenuNavbar foodTypes={foodTypes} />
      </div>
    </>
  );
}

function MenuNavbar({ foodTypes }) {
  return (
    <nav
      style={{ backgroundColor: "#f39c12", border: "#d35400" }}
      className=" block w-full max-w-full px-4 py-8 text-black bg-white border rounded-none shadow-md h-max  bg-opacity-80 lg:px-8  lg:py-4"
    >
      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <MenuList foodTypes={foodTypes} />
      </div>
    </nav>
  );
}
function MenuList({ foodTypes }) {
  return (
    <ul className="flex flex-col float-right gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {foodTypes.map((item) => (
        <Item item={item} scrollToId={item.id} key={item.id} />
      ))}
    </ul>
  );
}
function Item({ item, scrollToId }) {
  const [clicked, setClicked] = useState(item.clicked);

  function handleClick() {
    //not worked :(((
  }

  return (
    <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
      <a className="flex items-center" href={scrollToId}>
        <button
          style={{ backgroundColor: "#f1c40f" }}
          type="button"
          className="text-white px-8  bg-blue-700 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-0"
        >
          {item.type}
        </button>
      </a>
    </li>
  );
}
