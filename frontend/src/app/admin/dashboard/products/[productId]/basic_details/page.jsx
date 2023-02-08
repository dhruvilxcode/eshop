"use client";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { updateProductBasicDetails, useProduct } from "@/controllers/products.controller";
import { useCollections } from "@/controllers/collections.controller";

export default function ProductBasicDetailsPage({ params }) {
  const { collections } = useCollections();
  const { product, isError, isLoading } = useProduct(params.productId);

  const productNameRef = useRef(null);
  const productPriceRef = useRef(null);
  const productMRPRef = useRef(null);
  const collectionIdRef = useRef(null);

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
    productNameRef.current.value = product.name;
    productPriceRef.current.value = product.price;
    productMRPRef.current.value = product.mrp;
    collectionIdRef.current.value = product.collectionId;
  },[params.productId]);

  const btnSaveDetails = async () => {
    // save product details
    const productName = productNameRef.current.value;
    const productPrice = productPriceRef.current.value;
    const productMRP = productMRPRef.current.value || 0;
    const collectionId = collectionIdRef.current.value;

    if(!productName) {
      productNameRef.current.focus();
      toast.error("Product Name is Required!", {
        hideProgressBar: true,
      });
      return;
    }

    if(!productPrice) {
      productPriceRef.current.focus();
      toast.error("Product Price is Required!", {
        hideProgressBar: true,
      });
      return;
    }

    if(!collectionId) {
      collectionIdRef.current.focus();
      toast.error("Product Collection is Required!", {
        hideProgressBar: true,
      });
      return;
    }

    const form = new FormData();
    form.append('name', productName);
    form.append('price', productPrice);
    form.append('mrp', productMRP);
    form.append('collectionId', collectionId);

    try {
      toast.loading("Please wait...");
      const resp = await updateProductBasicDetails(params.productId, form);
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

  // name, price, mrp, collectionId
  return (
    <div>
      {/* <h3>Basic Details</h3> */}

      <div className="mt-4">
        <label htmlFor="productName" className="block">
          Product Name
        </label>
        <input
          ref={productNameRef}
          type="text"
          id="productName"
          name="productName"
          placeholder="Enter Product Name here..."
          className="block mt-2 px-4 py-3 rounded-md outline-none w-80"
        />

        <label htmlFor="productPrice" className="block mt-4">
          Price
        </label>
        <input
          ref={productPriceRef}
          type="number"
          id="productPrice"
          name="productPrice"
          placeholder="Enter Product Price here..."
          className="block mt-2 px-4 py-3 rounded-md outline-none w-80"
        />

        <label htmlFor="productMRP" className="block mt-4">
          MRP
        </label>
        <input
          ref={productMRPRef}
          type="number"
          id="productMRP"
          name="productMRP"
          placeholder="Enter Product MRP here..."
          className="block mt-2 px-4 py-3 rounded-md outline-none w-80"
        />

        <label htmlFor="collection" className="block mt-4">
          Collection
        </label>
        <select
          ref={collectionIdRef}
          className="block w-80 mt-2 px-4 py-3 rounded-md outline-orange-400"
          name="collection"
          id="collection"
          placeholder="Select Product Collection..."
        >
          <option value="">Select Product Collection</option>
          {
            collections?.length > 0 ? collections.map((collection) => (
              <option key={collection._id} value={collection._id}>
                {collection.name}
              </option>
            )) : <></>
          }
        </select>

        <button onClick={btnSaveDetails} className="mt-8 block w-80 px-4 py-3 rounded-md bg-orange-500 hover:bg-orange-600 text-white">
          Save
        </button>
      </div>
    </div>
  );
}
