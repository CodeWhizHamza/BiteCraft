import axios from "axios";
import FoodItemModal from "./FoodItemModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUserAuth } from "@/store/userAuth";
import Swal from "sweetalert2";

interface FoodItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
  isAvailable: boolean;
}

export default function FoodItems() {
  const token = useUserAuth((state) => state.authToken);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<FoodItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("/admin/food-menu/items", {
          headers: {
            "auth-token": token,
          },
        });
        const data = await response.data;
        setItems(data.data);
      } catch (error: any) {
        if (error.response) {
          const data = await error.response.data;
          toast.error(data.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      }
    };

    fetchItems();
  }, [token]);

  const handleAddItemClicked = () => {
    setTitle("Add New Food Item");
    setShowModal(true);
    setSelectedItem(null);
  };

  const handleAddItemFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    setSpinning: (value: boolean) => void
  ) => {
    e.preventDefault();
    setSpinning(true);

    const form = e.currentTarget;

    // Get image and convert it to base64 url
    const image = form.image;
    const imageFile = image.files[0];

    const imageString = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(imageFile);
    });

    const formData = new FormData(form);
    console.dir(formData);
    formData.set("image", imageString as string);

    try {
      const response = await axios.post(
        "/admin/food-menu/items",
        {
          name: formData.get("foodName"),
          price: formData.get("price"),
          category: formData.get("category"),
          description: formData.get("description"),
          isAvailable: formData.get("isAvailable") !== "0",
          image: formData.get("image"),
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      const data = await response.data;
      toast.success(data.message);

      setItems((prevCategories) => [...prevCategories, data.data]);

      setSpinning(false);
      setShowModal(false);
      form.reset();
    } catch (error: any) {
      if (error.response) {
        const data = await error.response.data;
        console.log(data);
        toast.error(data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
      setSpinning(false);
    }
  };

  const handleDeleteCategoryClicked = (id: string) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `/admin/food-menu/categories/${id}`,
            {
              headers: {
                "auth-token": token,
              },
            }
          );
          const data = await response.data;
          toast.success(data.message);

          setItems((prevCategories) =>
            prevCategories.filter((category) => category._id !== id)
          );
        } catch (error: any) {
          if (error.response) {
            const data = await error.response.data;
            toast.error(data.message);
          } else {
            toast.error("An error occurred. Please try again later.");
          }
        }
      }
    });
  };

  return (
    <>
      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
            Food Items
          </h2>
          <button
            className="text-blue-600 dark:text-blue-500 hover:underline"
            onClick={handleAddItemClicked}
          >
            Add New Food Item
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
              {items.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">5</td>
                  <td className="px-6 py-4 text-right flex gap-4 justify-end">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => console.log("Edit clicked")}
                    >
                      Edit
                    </button>
                    <button
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => handleDeleteCategoryClicked(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FoodItemModal
        show={showModal}
        setShow={setShowModal}
        title={title}
        onSubmit={handleAddItemFormSubmit}
        // @ts-ignore
        categoryDefaultValue={selectedItem}
      />
    </>
  );
}
