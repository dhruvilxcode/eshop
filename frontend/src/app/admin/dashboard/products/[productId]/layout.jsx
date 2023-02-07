"use client";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
export default function DashboardProductDetailPageLayout({ children, params }) {
  return (
    <div className="w-full bg-gray-100">
      <Breadcrumb />
      <div className="w-full h-screen flex bg-gray-100 overflow-y-auto">
        <Sidebar params={params} />
        {children}
      </div>
    </div>
  );
}
