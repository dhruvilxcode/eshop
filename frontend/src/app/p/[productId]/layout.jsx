import Footer from "@/app/Footer";
import React from "react";
import Navbar from "./Navbar";

export default function ProductPageLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="pt-14">{children}</div>
      <Footer />
    </div>
  );
}
