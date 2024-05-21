export default function MenuNavbar({ foodTypes }) {
  return (
    <nav className="bg-primary border-primary block w-full max-w-full px-4 py-8 text-black border rounded-none shadow-md h-max  bg-opacity-80 lg:px-8 lg:py-4">
      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <ul className="flex flex-col float-right gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
          {foodTypes.map((item) => (
            <li
              key={item.id}
              className="flex items-center p-1 font-sans text-sm antialiased font-medium leading-normal gap-x-2 text-blue-gray-900"
            >
              <a className="flex items-center" href={item.id}>
                <button
                  type="button"
                  className="text-white px-8 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-0 bg-primary2"
                >
                  {item.type}
                </button>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
