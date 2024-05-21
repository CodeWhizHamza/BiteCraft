"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { useFoodItemsStore } from "@/store/foodItems";
import { useUserAuth } from "@/store/userAuth";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "@/components/Modal";
import Swal from "sweetalert2";

export default function Page() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeItem = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const foodItems = useFoodItemsStore((state) => state.foodItems);

  const [totalPrice, setTotalPrice] = React.useState(0);
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [taxRate, setTaxRate] = React.useState(0.15);
  const [paymentMode, setPaymentMode] = React.useState("cash");

  const router = useRouter();

  const isLoggedIn = useUserAuth((state) => state.isLoggedIn);
  const user = useUserAuth((state) => state.user);
  const authToken = useUserAuth((state) => state.authToken);

  useEffect(() => {
    setTotalPrice(
      cart.reduce((acc, item) => {
        const foodItem = foodItems.find((foodItem) => foodItem._id === item.id);
        if (!foodItem) {
          return acc;
        }
        return acc + foodItem.price * item.quantity;
      }, 0)
    );
  }, [cart, foodItems]);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(id);
        toast.success("Your item has been deleted.");
      }
    });
  };

  const handleIncrement = (id: string) => {
    const item = cart.find((item) => item.id === id)!;
    updateQuantity(id, item.quantity + 1);
  };

  const handleDecrement = (id: string) => {
    const item = cart.find((item) => item.id === id)!;
    updateQuantity(id, item.quantity - 1);
  };

  const handleCheckoutClicked = async () => {
    if (!isLoggedIn) {
      router.push("/login");
    }

    setShowPaymentModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const paymentMethod = formData.get("payment") as string;
    setPaymentMode(paymentMethod);

    if (paymentMethod === "cash") {
      try {
        const order = {
          user: user!._id,
          items: cart,
          paymentMethod: "cash",
          total: totalPrice + totalPrice * taxRate,
        };
        const response = await axios.post("/orders", order, {
          headers: {
            "auth-token": authToken,
          },
        });
        const data = response.data;
        toast.success(data.message);
        clearCart();
        setShowPaymentModal(false);
        router.push("/dashboard");
      } catch (error) {
        console.error("Error placing order: ", error);
        toast.error("Error placing order. Please try again later.");
      }
    }
  };

  const handleScreenshotUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const image = formData.get("paymentImage") as File;

    const imageFormData = new FormData();
    imageFormData.append("file", image);

    // @ts-ignore
    const response = await fetch("/api/upload", {
      method: "POST",
      body: imageFormData,
    });
    const data = await response.json();
    const imageString = `/images/uploads/${data.path.split("\\").pop()}`;

    try {
      const order = {
        user: user!._id,
        items: cart,
        paymentMethod: "bank",
        total: totalPrice + totalPrice * taxRate,
        paymentImage: imageString,
      };
      const response = await axios.post("/orders", order, {
        headers: {
          "auth-token": authToken,
        },
      });
      const data = response.data;
      toast.success(data.message);
      clearCart();
      setShowPaymentModal(false);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error placing order: ", error);
      toast.error("Error placing order. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="py-8 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto grid grid-cols-7 gap-3">
          <h2 className="title font-bold text-4xl leading-10 mb-8 text-center text-black col-span-full">
            Your cart {cart.length === 0 && "is empty"}
          </h2>

          {cart.length > 0 && (
            <>
              <div className="col-span-full lg:col-span-5">
                {cart.map((item) => {
                  const foodItem = foodItems.find(
                    (foodItem) => foodItem._id === item.id
                  );

                  if (!foodItem) {
                    return null;
                  }

                  return (
                    <div
                      key={item.id}
                      className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4"
                    >
                      <div className="col-span-12 lg:col-span-2 img box grid place-items-center">
                        <Image
                          src={foodItem.image}
                          alt={foodItem.name}
                          className="max-lg:w-full lg:w-[180px] object-fit-contain"
                          width={180}
                          height={180}
                        />
                      </div>
                      <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                        <div className="flex items-center justify-between w-full mb-4">
                          <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
                            {foodItem.name}
                          </h5>
                          <button
                            className="rounded-full group flex items-center justify-center focus-within:outline-red-500"
                            onClick={() => handleDelete(item.id)}
                          >
                            <svg
                              width="34"
                              height="34"
                              viewBox="0 0 34 34"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                                cx="17"
                                cy="17"
                                r="17"
                                fill=""
                              />
                              <path
                                className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                                d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                                stroke="#EF4444"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                        <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                          {foodItem.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <button
                              className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={() => handleDecrement(item.id)}
                              disabled={item.quantity === 1}
                            >
                              <svg
                                className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.5 9.5H13.5"
                                  stroke=""
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <input
                              type="text"
                              id="number"
                              maxLength={item.quantity.toString().length}
                              className="border border-gray-200 rounded-full w-min max-w-14 outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100  text-center"
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
                              onClick={() => handleIncrement(item.id)}
                            >
                              <svg
                                className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.75 9.5H14.25M9 14.75V4.25"
                                  stroke=""
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                          <h6 className="text-primary font-manrope font-bold text-2xl leading-9 text-right">
                            Rs.{" "}
                            {new Intl.NumberFormat().format(
                              foodItem.price * item.quantity
                            )}
                          </h6>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="col-span-full lg:col-span-2 align-self-start lg:px-6 pb-6 max-lg:max-w-lg max-lg:mx-auto sticky top-10 h-fit">
                <div className="flex flex-col md:flex-row items-center md:items-center justify-between mb-2">
                  <h5 className="text-gray-900 font-semibold text-xl leading-9 max-md:text-center max-md:mb-4">
                    SubTotal
                  </h5>
                  <h6 className="font-bold text-xl lead-10 text-primary2">
                    Rs. {new Intl.NumberFormat().format(totalPrice)}
                  </h6>
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-center justify-between mb-8">
                  <h5 className="text-gray-900 font-semibold text-xl leading-9 max-md:text-center max-md:mb-4">
                    Tax{" "}
                    <span className="text-gray-500 text-sm">
                      ({Math.round(taxRate * 100)}%)
                    </span>
                  </h5>
                  <h6 className="font-bold text-xl lead-10 text-primary2">
                    Rs. {new Intl.NumberFormat().format(totalPrice * taxRate)}
                  </h6>
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-center justify-between mb-4">
                  <h5 className="text-gray-900 font-semibold text-2xl leading-9 max-md:text-center max-md:mb-4">
                    Total
                  </h5>
                  <h6 className="font-bold text-2xl lead-10 text-primary2">
                    Rs.{" "}
                    {new Intl.NumberFormat().format(
                      totalPrice + totalPrice * taxRate
                    )}
                  </h6>
                </div>

                <div className="max-lg:max-w-lg max-lg:mx-auto">
                  <button
                    className="rounded-md py-3 px-6 bg-primary2 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-primary"
                    onClick={handleCheckoutClicked}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
          <Modal
            show={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
          >
            {paymentMode === "bank" ? (
              <div className="p-8">
                <button onClick={() => setPaymentMode("cash")}>
                  {" "}
                  &larr; Back
                </button>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-4">
                  Bank transfer details
                </h3>
                <p className="text-gray-500 mb-4 border-b pb-4">
                  Please transfer Rs. {totalPrice + taxRate * totalPrice} to the
                  following bank account number to proceed with the order.
                </p>
                <div className="flex flex-col gap-1">
                  <p className="text-gray-900 font-semibold text-lg">
                    Bank: SadaPay
                  </p>
                  <p className="text-gray-900 font-semibold text-lg">
                    Account number: 03421798786
                  </p>
                </div>

                <form
                  className="flex flex-col mt-4"
                  onSubmit={handleScreenshotUpload}
                >
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="paymentImage"
                  >
                    Default size
                  </label>
                  <input
                    className="block w-full p-2 mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="paymentImage"
                    type="file"
                    name="paymentImage"
                    accept="image/jpeg,image/png,image/jpg"
                  />
                  <button
                    type="submit"
                    className="rounded-md py-4 px-6 bg-primary2 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-primary mt-4"
                  >
                    Proceed
                  </button>
                </form>
              </div>
            ) : (
              <PaymentSelection
                taxRate={taxRate}
                totalPrice={totalPrice}
                onSubmit={handleFormSubmit}
              />
            )}
          </Modal>
        </div>
      </section>
    </>
  );
}

function PaymentSelection({
  taxRate,
  totalPrice,
  onSubmit,
}: {
  totalPrice: number;
  taxRate: number;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-4">
        Proceed with payment
      </h3>
      <p className="text-gray-500 mb-4 border-b pb-4">
        Your total amount is
        <span className="font-bold">
          {" "}
          Rs. {totalPrice + totalPrice * taxRate}
        </span>{" "}
        with tax @{Math.round(taxRate * 100)}% included.
      </p>

      <form className="flex flex-col mt-4" onSubmit={onSubmit}>
        <label
          htmlFor="cash"
          className="flex items-center gap-4 mb-2 p-4 border rounded-md"
        >
          <input
            type="radio"
            id="cash"
            name="payment"
            value="cash"
            className="h-5 w-5 text-primary2 border-gray-300 focus:ring-primary2"
            defaultChecked
          />
          Cash on delivery
        </label>
        <label
          className="flex items-center gap-4 mb-4 p-4 border rounded-md"
          htmlFor="bank"
        >
          <input
            type="radio"
            id="bank"
            name="payment"
            value="bank"
            className="h-5 w-5 text-primary2 border-gray-300 focus:ring-primary2"
          />
          Bank transfer
        </label>
        <button
          type="submit"
          className="rounded-md py-4 px-6 bg-primary2 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-primary mt-4"
        >
          Proceed
        </button>
      </form>
    </div>
  );
}
