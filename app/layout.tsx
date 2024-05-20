"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getApiUrl from "@/lib/getApiUrl";
import { useEffect } from "react";
import { useFoodItemsStore } from "@/store/foodItems";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setIsLoading, setFoodItems } = useFoodItemsStore();
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/food-menu/items");
        const data = response.data;
        setFoodItems(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching food items: ", error);
      }
    };

    fetchFoodItems();
  }, [setFoodItems, setIsLoading]);

  axios.defaults.baseURL = getApiUrl();

  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning={true} className={inter.className}>
        {children}

        <ToastContainer stacked position="bottom-right" />
      </body>
    </html>
  );
}
