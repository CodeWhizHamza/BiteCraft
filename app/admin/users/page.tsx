"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUserAuth } from "@/store/userAuth";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa6";

export default function Page() {
  const token = useUserAuth((state) => state.authToken);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/users", {
          headers: {
            "auth-token": token,
          },
        });
        const data = await response.data;
        setUsers(data.data);
      } catch (error: any) {
        console.log(error);
        if (error.response) {
          const data = await error.response.data;
          toast.error(data.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      }
      setLoading(false);
    };

    fetchUsers();
  }, [token]);

  return (
    <>
      <section className="container p-4 mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
            Users
          </h2>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User name
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    <FaSpinner className="animate-spin mx-auto text-3xl" />
                  </td>
                </tr>
              )}
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {user.phoneNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {user.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
