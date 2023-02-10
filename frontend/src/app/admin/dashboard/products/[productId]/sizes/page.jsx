"use client";
import React, { useEffect, useRef, useState } from 'react'
import { toast } from "react-toastify";
import { updateProductSizes, useProduct } from "@/controllers/products.controller";

export default function ProductSizesPage({
    params
}) {

  const { product, isError, isLoading } = useProduct(params.productId);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [sizes, setSizes] = useState([]);
  const productInputSizeRef = useRef(null);

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
    setSizes(product?.sizes || []);
  },[params.productId]);

  const openSizeModal = () => {
    setShowSizeModal(true);
  };

  const btnSaveSizes = async () => {
    try {
      toast.loading("Please wait...");
      const resp = await updateProductSizes(params.productId, sizes);
      toast.dismiss();

      if(resp.status === 200) {
        const product = resp.data.product;
        toast.success(resp.data.message);
        setShowSizeModal(false);
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

  return (
    <div>
      <h3 className="text-2xl font-bold">Configure Sizes</h3>
      <p className="mt-2 text-gray-500 text-sm">
        You can use this feature to Add sizes, weights, different product
        options, without creating separate product.
      </p>

      <div className="w-full mt-4">
        <button
          onClick={openSizeModal}
          className="cursor-pointer text-sm text-gray-500 bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-2"
        >
          Add / Modify Sizes
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {sizes.map((size, index) => (
          <div className='w-full bg-white rounded-md px-4 py-2' key={index}>{size}</div>
        ))}
      </div>

      {/* add size modal */}
      <div
        className={
          showSizeModal
            ? "flex items-start overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            : "hidden"
        }
      >
        <div className="relative w-[600px] my-12 mx-auto p-10 border-0 rounded-2xl shadow-2xl flex flex-col  bg-white outline-none focus:outline-none">
          <div className="flex justify-between">
            <h3 className="text-3xl">Sizes</h3>
            <button
              onClick={() => {
                setShowSizeModal(false);
              }}
            >
              <svg
                className="fill-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
              </svg>
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={`Enter Size here...`}
                className="flex-1 block border w-full rounded-md px-3 py-2"
                ref={productInputSizeRef}
              />
              <button
                onClick={() => {
                  const size = productInputSizeRef.current.value;
                  productInputSizeRef.current.value = '';
                  productInputSizeRef.current.focus();
                  const newSizes = [...sizes, size];
                  setSizes(newSizes);
                }}
                className="hover:bg-gray-300 bg-gray-200 rounded-lg w-10 h-10 flex items-center justify-center"
              >
                <svg
                  className="fill-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                </svg>
              </button>
            </div>

            <div className="mt-4 flex gap-2">
              {sizes.map((size, i) => (
                <div 
                  key={i}
                  className="bg-gray-200 text-gray-500 px-3 py-1 rounded-full flex items-center gap-1"
                >
                  <p>{size}</p>
                  <button
                    onClick={() => {
                      // remove selected size
                      const newSizes = sizes.filter(s=>s!=size);
                      setSizes(newSizes);
                    }}
                  >
                    <svg className='fill-red-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button
                onClick={btnSaveSizes}
                className="block bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* add size modal */}
    </div>
  );
}
