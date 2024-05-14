"use client";

import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Image from "next/image";
import Trophy from "../public/trophy.png";
export default function SearchModal() {
  const [showModal, setShowModal] = useState(false);

  const [selectedCity, setSelectedCity] = useState("");

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <>
      <div className="hidden lg:block">
        <ul className="flex flex-col float-left ml-5 mb-4 lg:mb-0 lg:mt-4  lg:items-center">
          <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
            <a
              href="#"
              className="flex items-center"
              onClick={() => setShowModal(true)}
            >
              <IoMdSearch style={{ fontSize: "25px" }} />
            </a>
          </li>
        </ul>

        {showModal ? (
          <>
            <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen">
              <div className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900 mt-20">
                <div className="flex-col mx-auto w-full max-w-screen-sm h-[20rem] p-4 py-6 lg:py-8 bg-white border border-gray-200 rounded-t-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <h2 className="text-2xl font-bold mb-8 text-center ">
                    Select your location
                  </h2>
                  <form class="max-w-md mx-auto">
                    <div class="relative">
                      <select
                        id="cities"
                        value={selectedCity}
                        onChange={handleCityChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                      >
                        <option value="" disabled selected hidden>
                          Choose city
                        </option>
                        <option value="Isbd">Islamabad</option>
                        <option value="Lhr">Lahore</option>
                        <option value="Bwp">Bahawalpur</option>
                        <option value="Khi">Karachi</option>
                      </select>
                      <select
                        id="areas"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="" disabled selected hidden>
                          Choose area
                        </option>
                        {selectedCity === "Isbd" && (
                          <>
                            <option value="" disabled selected hidden>
                              Choose area
                            </option>
                            <option value="DHA-I">DHA</option>
                            <option value="G-9">G-9</option>
                            <option value="H-12">H-12</option>
                            <option value="F-Markaz">F-Markaz</option>
                          </>
                        )}
                        {selectedCity === "Lhr" && (
                          <>
                            <option value="" disabled selected hidden>
                              Choose area
                            </option>
                            <option value="FB">Faisal Bagh</option>
                            <option value="KB">Kot Begum</option>
                            <option value="GT">Green Town</option>
                            <option value="IT">Iqbal Town</option>
                          </>
                        )}
                        {selectedCity === "Khi" && (
                          <>
                            <option value="" disabled selected hidden>
                              Choose area
                            </option>
                            <option value="CK">Clifton</option>
                            <option value="DHA-K">DHA</option>
                            <option value="AIC">Allama Iqbal Colony</option>
                            <option value="LK">Lyari</option>
                          </>
                        )}
                        {selectedCity === "Bwp" && (
                          <>
                            <option value="" disabled selected hidden>
                              Choose area
                            </option>
                            <option value="AIT">Allama Iqbal Town</option>
                            <option value="MT-A">Model Town A</option>
                            <option value="AC">Azizabad Colony</option>
                            <option value="JT">Johar Town</option>
                          </>
                        )}
                      </select>
                    </div>
                  </form>

                  <button
                    className="block mx-auto mt-12 my-20 w-auto px-14 h-8 bg-red-800 text-white rounded-full shadow hover:shadow-xlg font-semibold"
                    onClick={() => setShowModal(false)}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
