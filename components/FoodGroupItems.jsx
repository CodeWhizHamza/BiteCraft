import Image from "next/image";
import { useState } from "react";

export default function FoodGroupItems({ item }) {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <li className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
      <div className="w-full mt-6 ml-6 max-w-xs bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <Image
            src={item.img}
            className="p-8 rounded-t-lg"
            alt="product-img"
            width={300}
            height={300}
            priority
          />
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
      </div>
    </li>
  );
}
