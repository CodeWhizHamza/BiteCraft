import axios from "axios";
import FoodItemModal from "./FoodItemModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUserAuth } from "@/store/userAuth";
import Swal from "sweetalert2";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa6";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
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
      setLoading(false);
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

    const imageFormData = new FormData();
    imageFormData.append("file", imageFile);

    // @ts-ignore
    const response = await fetch("/api/upload", {
      method: "POST",
      body: imageFormData,
    });
    const data = await response.json();
    const imageString = `/images/uploads/${data.path.split("\\").pop()}`;

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
          isAvailable: formData.get("isAvailable") === "0",
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
          const response = await axios.delete(`/admin/food-menu/items/${id}`, {
            headers: {
              "auth-token": token,
            },
          });
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
                  <div className="flex items-center">Image</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Available
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    <div className="flex justify-center items-center space-x-2">
                      <FaSpinner
                        className="animate-spin text-3xl"
                        size={20}
                        color="#2563EB"
                      />
                    </div>
                  </td>
                </tr>
              )}

              {items.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="w-auto h-auto max-w-14 max-h-14 object-cover rounded-full"
                        width={60}
                        height={60}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-3">{item.name}</td>
                  <td className="px-6 py-3">{item.price}</td>
                  <td className="px-6 py-3">{item.category}</td>
                  <td className="px-6 py-3">
                    {item.description.slice(0, 20) + "..."}
                  </td>
                  <td className="px-6 py-3">
                    {item.isAvailable ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center space-x-4">
                      <button
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                        onClick={() => {
                          setTitle("Edit Food Item");
                          setShowModal(true);
                          setSelectedItem(item);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 dark:text-red-400 hover:underline"
                        onClick={() => handleDeleteCategoryClicked(item._id)}
                      >
                        Delete
                      </button>
                    </div>
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
