"use client";

import { useUserAuth } from "@/store/userAuth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Page() {
  const token = useUserAuth((state) => state.authToken);
  const isLoggedIn = useUserAuth((state) => state.isLoggedIn);
  const user = useUserAuth((state) => state.user);
  const router = useRouter();
  const isAdmin = useUserAuth((state) => state.user?.role === "admin");

  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/orders", {
          headers: {
            "auth-token": token,
          },
        });
        console.log(response.data);
        setOrders(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching orders");
      }
      setIsLoading(false);
    };

    fetchOrders();
  }, [isLoggedIn, token]);

  const handleOrderStatusChange = async (orderId: string) => {
    const { value: status } = await Swal.fire({
      title: "Select Order Status",
      input: "select",
      inputOptions: {
        confirming: "confirming",
        processing: "processing",
        enroute: "enroute",
        delivered: "delivered",
        cancelled: "cancelled",
      },
      inputPlaceholder: "Select Order Status",
      showCancelButton: true,
    });

    if (!status) {
      return;
    }

    try {
      await axios.put(
        `/orders/${orderId}`,
        { status },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      toast.success("Order status updated successfully");

      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order._id === orderId) {
            return {
              ...order,
              status,
            };
          }
          return order;
        })
      );
    } catch (error) {
      console.log(error);
      toast.error("Error updating order status");
    }
  };

  return (
    <>
      <section className="py-8 px-4 relative container mx-auto h-full">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>

        <div className="mt-4">
          <h2 className="text-2xl font-bold">Orders</h2>
          <div className="mt-4">
            {isLoading && (
              <div className="flex justify-center items-center h-40">
                <FaSpinner className="animate-spin text-5xl text-primary" />
              </div>
            )}
            {orders.length === 0 && !isLoading && (
              <p className="text-lg">You have no orders yet</p>
            )}

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-md shadow-slate-300 rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Order ID: {order._id}</h3>
                </div>
                <p className="text-gray-500 mb-2">
                  {order.username} - {order.phoneNumber}
                </p>
                <p className="text-gray-500 mb-2">{order.address}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p
                  className={`text-sm font-bold mt-2 bg-blue-500 w-fit py-1 px-4 leading-0 text-white rounded-md`}
                >
                  {order.status.toUpperCase()}
                </p>
                <div className="mt-2 grid gap-3">
                  {order.items.map((item: any) => (
                    <div
                      key={item._id}
                      className="flex gap-2 items-center p-3 border rounded-md"
                    >
                      <div>
                        <Image
                          src={item.image}
                          width={100}
                          height={100}
                          alt={item.name}
                          className="w-auto h-auto"
                        />
                      </div>
                      <div className="flex-1 grid">
                        <p className="text-xl">
                          {item.name} - {item.quantity} item
                          {item.quantity > 1 && "s"}
                        </p>
                        <p className="text-gray-500">{item.price}</p>
                        <p className="text-gray-500 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-2 items-center flex-wrap">
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-md"
                    onClick={() => handleOrderStatusChange(order._id)}
                  >
                    Change Order Status
                  </button>

                  {order.payment === "bank" && (
                    <button
                      className="border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-md transition-colors"
                      onClick={() => {
                        Swal.fire({
                          title: "Payment Proof",
                          imageUrl: order.screenshot,
                          imageWidth: 400,
                          imageHeight: 400,
                          imageAlt: "Payment Proof",
                        });
                      }}
                    >
                      View payment proof
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
