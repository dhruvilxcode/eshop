"use client";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import { useProduct } from "@/controllers/products.controller";
export default function DashboardProductDetailPageLayout({ children, params }) {
  const { product, isError, isLoading } = useProduct(params.productId);

  if(isLoading) {
    return <div className="w-full bg-gray-100">
      Please wait...
    </div>
  }

  if(isError) {
    console.error(isError);
    return <div className="w-full bg-gray-100">
      Something went wrong while getting product details...
    </div>
  }

  return (
    <div className="w-full bg-gray-100">
      <Breadcrumb />
      <div className="w-full h-screen flex bg-gray-100 overflow-y-auto">
        <Sidebar params={params} />
        <div className="w-full pt-14 px-6 overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}
