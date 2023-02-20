"use client";
import React, { useState } from "react";
import { addProductToCart } from "@/controllers/cart.controller";
import { toast } from "react-toastify";

export default function AddToCart({ product }) {
  const sizes = product.sizes;
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  const btnAddProductToCart = () => {
    addProductToCart(product, 1, sizes[selectedSizeIndex]);
    toast.success("Product added to cart.");
  };

  return (
    <>
      {sizes?.length > 0 ? (
        <div className="mt-8">
          <div className="">
            Size:{" "}
            <span className="text-gray-400">{sizes[selectedSizeIndex]}</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            {sizes.map((size, index) => (
              <div>
                <input
                  type="radio"
                  className="hidden peer"
                  name="product_size"
                  id={`chksize_${index}`}
                  checked={selectedSizeIndex === index}
                  onChange={(e) => setSelectedSizeIndex(index)}
                />
                <label
                  key={index}
                  for={`chksize_${index}`}
                  className="peer-checked:bg-gray-300 peer-checked:border-transparent rounded-2xl p-4 border cursor-pointer hover:bg-gray-100 hover:text-gray-600"
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}

      <button
        onClick={btnAddProductToCart}
        className="rounded-2xl bg-eshop-dark hover:bg-gray-200 hover:text-gray-500 transition text-white mt-12 text-center px-4 py-6 w-full text-xl"
      >
        Add to Cart
      </button>
    </>
  );
}
