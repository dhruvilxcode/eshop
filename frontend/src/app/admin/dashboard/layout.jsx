"use client";
import Navbar from "./Navbar";
export default function DashboardLayout({ children }) {
  return (
    <div className="w-full bg-gray-100 flex">
      <Navbar />
      <div className="">{children}</div>
    </div>
  );
}
