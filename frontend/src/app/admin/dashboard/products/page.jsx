"use client";
import React from "react";
import Link from "next/link";
import { useProducts } from "@/controllers/products.controller";

export default function ProductsPage() {
  const { products, isError, isLoading, APIURL } = useProducts();

  if (isLoading) {
    return (
      <div className="w-full px-4 py-6 2xl:w-2/4 2xl:mx-auto">
        Please wait...
      </div>
    );
  }

  if (isError) {
    console.error(isError);
    return (
      <div className="w-full px-4 py-6 2xl:w-2/4 2xl:mx-auto">
        Something went wrong, try later!
      </div>
    );
  }

  return (
    <div className="w-full px-8 py-6 2xl:w-2/4 2xl:mx-auto">
      <h3>Products</h3>

      <Link
        href="/admin/dashboard/products/create"
        className="mt-4 inline-block bg-slate-200 hover:bg-slate-300 text-sm text-slate-800 rounded-md px-4 py-2"
      >
        Add Product
      </Link>

      <div className="mt-8 flex flex-col gap-4">
      {products.map((product) => (
        <Link href={`/admin/dashboard/products/${product._id}/basic_details`} key={product._id}>
          <div className="flex gap-4 bg-white px-4 py-4 rounded-2xl border">
          <div className="w-24 h-28 bg-gray-300 rounded-xl"></div>
          <div>
            <p>{product.name}</p>
            <p className="text-sm text-gray-500">SKU: {product.sku_id}</p>
            <div className="flex gap-4 mt-4">
              {product.featured?<div className="bg-yellow-500 px-2 text-white rounded">
                Featured
              </div>:<></>}
              <div className="bg-gray-200 px-2 text-gray-500 rounded">
                Stock: {product.stock}
              </div>
            </div>
          </div>
        </div>
        </Link>
      ))}
      </div>
    </div>
  );
}
