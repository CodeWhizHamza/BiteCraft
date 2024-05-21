export default function Modal({
  show,
  isFullWidth = false,
  onClose,
  children,
}: {
  show: boolean;
  isFullWidth?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          !show && "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen min-h-full bg-slate-700 bg-opacity-40 backdrop-blur-sm grid`}
        onMouseDown={(e) => {
          // @ts-ignore
          if (e.target.id === "crud-modal") {
            onClose();
          }
        }}
      >
        <div
          className={`relative p-4 w-full max-w-md max-h-full ${
            isFullWidth
              ? "min-w-96 sm:min-w-[40rem] md:min-w-[50rem] lg:min-w-[60rem] xl:min-w-[70rem]"
              : "min-w-[30rem]"
          }`}
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white absolute top-2 end-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              data-modal-toggle="crud-modal"
              onClick={onClose}
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

            {children}
          </div>
        </div>
      </div>
    </>
  );
}
