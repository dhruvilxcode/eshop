"use client";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <title>EShop</title>
        <meta name="robots" content="noindex,nofollow" />
      </head>
      <body>
        {children} <ToastContainer />
      </body>
    </html>
  );
}
