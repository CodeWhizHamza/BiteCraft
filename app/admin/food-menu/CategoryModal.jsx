import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";

export default function CategoryModal({
  title,
  show,
  setShow,
  onSubmit,
  categoryDefaultValue = "",
}) {
  const [spinning, setSpinning] = useState(false);

  return (
    <>
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          !show && "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full bg-slate-700 bg-opacity-40 backdrop-blur-sm grid`}
        onMouseDown={(e) => {
          if (e.target.id === "crud-modal") {
            setShow(!show);
          }
        }}
      >
        <div className="relative p-4 w-full min-w-96 max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
                onClick={() => setShow(!show)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form
              className="p-4 md:p-5"
              onSubmit={(e) => onSubmit(e, setSpinning)}
            >
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="categoryName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="categoryName"
                    id="categoryName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type category name"
                    defaultValue={categoryDefaultValue}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
                disabled={spinning}
              >
                {spinning ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    />
                  </svg>
                )}
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
