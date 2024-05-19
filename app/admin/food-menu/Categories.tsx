import axios from "axios";
import CategoryModal from "./CategoryModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUserAuth } from "@/store/userAuth";

export default function Categories() {
  const token = useUserAuth((state) => state.authToken);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");

  const handleAddCategoryClicked = () => {
    setTitle("Add New Category");
    setShowModal(true);
  };

  const handleAddCategoryFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    setSpinning: (value: boolean) => void
  ) => {
    e.preventDefault();
    setSpinning(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await axios.post(
        "/admin/food-menu/category",
        {
          name: formData.get("categoryName"),
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      const data = await response.data;
      toast.success(data.message);

      setSpinning(false);
      setShowModal(false);
    } catch (error: any) {
      if (error.response) {
        const data = await error.response.data;
        toast.error(data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
      setSpinning(false);
    }
  };

  return (
    <>
      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
            Food Categories
          </h2>
          <button
            className="text-blue-600 dark:text-blue-500 hover:underline"
            onClick={handleAddCategoryClicked}
          >
            Add New Category
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category Name
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Number of Items</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17&quot;
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4 text-right flex gap-4 justify-end">
                  <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button className="font-medium text-red-600 dark:text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <CategoryModal
        show={showModal}
        setShow={setShowModal}
        title={title}
        onSubmit={handleAddCategoryFormSubmit}
      />
    </>
  );
}
