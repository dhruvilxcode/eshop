import React from "react";
import Footer from "../Footer";
import Navbar from "./Navbar";

export default function layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-14">{children}</div>
      <Footer />
    </>
  );
}
