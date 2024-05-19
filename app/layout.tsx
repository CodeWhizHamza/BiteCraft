"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getApiUrl from "@/lib/getApiUrl";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
