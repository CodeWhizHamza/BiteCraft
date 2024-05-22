import { useCartStore } from "@/store/cart";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import axios from "axios";
import { useUserAuth } from "@/store/userAuth";
import IFoodItem from "@/types/FoodItem";

export default function FoodItem({ item }: { item: IFoodItem }) {
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const token = useUserAuth((state) => state.authToken);
  const isLoggedIn = useUserAuth((state) => state.isLoggedIn);

  const [reviews, setReviews] = useState<any>([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/reviews/${item._id}`);
        const data = response.data.data;
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchReviews();
  }, [item._id]);

  useEffect(() => {
    const totalStars = reviews.reduce(
      (acc: number, review: any) => acc + review.stars,
      0
    );
    const avgRating = reviews.length > 0 ? totalStars / reviews.length : 0;
    setAverageRating(avgRating);
  }, [reviews]);

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleAddToCart = (id: string) => {
    addToCart(id);
    toast.success("Item added to cart");
  };

  const handleReviewSubmit = async (e: any) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error("Please login to submit a review");
      return;
    }

    const form = e.target;
    const formData = new FormData(form);

    const comment = formData.get("comment");
    const stars = rating;

    if (!stars) {
      toast.error("Please rate the product");
      return;
    }

    try {
      const response = await axios.post(
        "/reviews",
        {
          comment,
          stars,
          productId: item._id,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      const data = response.data;

      console.log(data);
      setReviews([...reviews, data.data]);
      console.log("Review submitted: ", data);
      toast.success("Review submitted successfully");
    } catch (error) {
      console.error("Error submitting review: ", error);

      if (error.response) {
        return toast.error(error.response.data.message);
      } else toast.error("Error submitting review");
    }
  };

  return (
    <>
      <article className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a
          onClick={() => setShowModal(true)}
          className="flex justify-center items-center cursor-pointer"
        >
          <Image
            src={item.image}
            className="p-8 rounded-t-lg"
            alt="product-img"
            width={300}
            height={300}
            priority
          />
        </a>
        <div className="p-5">
          <a onClick={() => setShowModal(true)} className="cursor-pointer">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words hyphens-auto">
            {item.description}
          </p>

          <div className="flex items-center mb-4 justify-between">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {[1, 2, 3, 4, 5].map((index) => (
                <svg
                  key={index}
                  className={`w-6 h-6 ${
                    index <= Math.round(averageRating)
                      ? "text-yellow-300"
                      : "text-gray-200 dark:text-gray-600"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
            <span className="bg-orange-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-gray-800 ms-3">
              {Math.round(averageRating * 10) / 10}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Rs. {item.price}
            </span>
            <button
              className="text-white bg-primary hover:bg-primary3 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center  dark:hover:bg-primary dark:focus:ring-0"
              onClick={() => handleAddToCart(item._id)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </article>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        isFullWidth={true}
      >
        <div className="p-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div className="">
              <Image
                src={item.image}
                alt="product-img"
                width={500}
                height={500}
                className="w-full object-contain rounded-md"
                priority
              />
            </div>
            <div className="grid gap-5 place-content-start">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {item.name}
              </h2>
              <p className="text-gray-700 dark:text-gray-400">
                {item.description}
              </p>
              <div className="grid gap-2">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  Rs. {item.price}
                </span>
                <button
                  className="text-white bg-primary hover:bg-primary3 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:hover:bg-primary dark:focus:ring-0 max-w-60"
                  onClick={() => handleAddToCart(item._id)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          <form className="mt-5" onSubmit={handleReviewSubmit}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Rate this product
            </h3>
            <div className="flex items-center gap-2">
              Stars:
              <div className="flex items-center gap-x-1">
                {[1, 2, 3, 4, 5].map((index) => (
                  <svg
                    key={index}
                    className={`w-6 h-6 ${
                      index <= rating
                        ? "text-yellow-300"
                        : "text-gray-200 dark:text-gray-600"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                    onClick={() => handleStarClick(index)}
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
            </div>
            <textarea
              className="w-full p-3 mt-3 border border-gray-200 rounded-lg dark:border-gray-700"
              placeholder="Add a comment"
              name="comment"
            ></textarea>
            <button
              className="w-full max-w-32 mt-3 text-white bg-primary hover:bg-primary3 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:hover:bg-primary dark:focus:ring-0"
              type="submit"
            >
              Submit
            </button>
          </form>

          <div className="mt-5">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">
              Reviews
            </h3>

            <div className="grid gap-y-2">
              {reviews.length === 0 && (
                <p className="text-gray-700 dark:text-gray-400">
                  No reviews yet
                </p>
              )}

              {reviews.map((review: any) => (
                <div
                  key={review._id}
                  className="grid grid-cols-12 items-center justify-items-center"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full leading-0 grid place-items-center font-bold col-span-2 md:col-span-1">
                    {review.username[0].toUpperCase()}
                  </div>
                  <div className="col-span-10 md:col-span-11 justify-self-start">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        {review.username}
                      </h4>
                      <span className="text-gray-700 dark:text-gray-400">
                        <div className="flex items-center gap-x-0">
                          {[1, 2, 3, 4, 5].map((index) => (
                            <svg
                              key={index}
                              className={`w-4 h-4 ${
                                index <= review.stars
                                  ? "text-yellow-300"
                                  : "text-gray-200 dark:text-gray-600"
                              }`}
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                          ))}
                        </div>
                      </span>
                    </div>
                    <p className="mt-1 text-gray-700 dark:text-gray-400">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
