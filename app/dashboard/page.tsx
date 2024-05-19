import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="my-4 max-w-2xl mx-auto flex items-center justify-center">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg w-full max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Dashboard
          </h3>
        </div>
      </div>
    </>
  );
}
