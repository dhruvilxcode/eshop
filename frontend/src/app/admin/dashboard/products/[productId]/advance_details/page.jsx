"use client";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { updateProductAdvanceDetails, useProduct } from "@/controllers/products.controller";

export default function ProductAdvanceDetailsPage({
    params
}) {
  const { product, isError, isLoading } = useProduct(params.productId);

  const productDescriptionRef = useRef(null);
  const productSKURef = useRef(null);
  const productStockRef = useRef(null);
  const productFeaturedRef = useRef(null);
  
  if (isLoading) {
    return <div className="w-full bg-gray-100">Please wait...</div>;
  }

  if (isError) {
    console.error(isError);
    return (
      <div className="w-full bg-gray-100">
        Something went wrong while getting product details...
      </div>
    );
  }

  useEffect(()=>{
    productDescriptionRef.current.value = product.description || null;
    productSKURef.current.value = product.sku_id || null;
    productStockRef.current.value = product.stock || 0;
    productFeaturedRef.current.checked = product.featured || false;
  },[params.productId]);

  const btnSaveDetails = async () => {
    // save product details
    const productDescription = productDescriptionRef.current.value;
    const productSKU = productSKURef.current.value;
    const productStock = productStockRef.current.value || 0;
    const featured = productFeaturedRef.current.checked;

    const form = new FormData();
    form.append('description', productDescription);
    form.append('sku_id', productSKU);
    form.append('stock', productStock);
    form.append('featured', featured);

    try {
      toast.loading("Please wait...");
      const resp = await updateProductAdvanceDetails(params.productId, form);
      toast.dismiss();

      if(resp.status === 200) {
        const product = resp.data.product;
        toast.success(resp.data.message);
        return;
      }
    } catch (error) {
      toast.dismiss();
      console.error(error);

      const data = error.response.data;
      const status = error.response.status;

      toast.error(data.message, {
        hideProgressBar: true,
      });
    }
  };

  // description, sku_id, stock
  return (
    <div>

      <div className="mt-4">
        <label htmlFor="productDescription" className="block">
          Product Description
        </label>
        <textarea
          ref={productDescriptionRef}
          id="productDescription"
          name="productDescription"
          placeholder="Enter Product Description here..."
          className="block mt-2 px-4 py-3 rounded-md outline-none w-80 h-40"
        />

        <label htmlFor="productSKU" className="block mt-4">
          SKU ID
        </label>
        <input
          ref={productSKURef}
          type="text"
          id="productSKU"
          name="productSKU"
          placeholder="Enter Product SKU here..."
          className="block mt-2 px-4 py-3 rounded-md outline-none w-80"
        />

        <label htmlFor="productStock" className="block mt-4">
          Stock
        </label>
        <input
          ref={productStockRef}
          type="number"
          id="productStock"
          name="productStock"
          placeholder="Enter Product Stock here..."
          className="block mt-2 px-4 py-3 rounded-md outline-none w-80"
        />

        <label htmlFor="featured" className="block mt-4">
          Featured
        </label>
        <label className="relative flex justify-between items-center group text-xl">
          <input
            name="featured"
            id="featured"
            ref={productFeaturedRef}
            type="checkbox"
            className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
          />
          <span className="w-10 h-6 flex items-center flex-shrink-0 ml-1 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-3 group-hover:after:translate-x-1"></span>
        </label>

        <button onClick={btnSaveDetails} className="mt-8 block w-80 px-4 py-3 rounded-md bg-orange-500 hover:bg-orange-600 text-white">
          Save
        </button>
      </div>
    </div>
  );
}
