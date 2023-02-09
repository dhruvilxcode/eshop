"use client";
import React from "react";
import { toast } from "react-toastify";
import { mutate } from "swr"
import { deleteProductImage, updateProductImages, useProduct } from "@/controllers/products.controller";

export default function ProductImagesPage({ params }) {
  const { product, isError, isLoading, APIURL } = useProduct(params.productId);

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

  const btnDeleteImage = async (imageId, imageURL, public_id) => {
    const isConfirm = window.confirm("Are you sure? This process is not reversible ✋🛑")

    if(!isConfirm) {
      return;
    }

    try {
      toast.loading("Please wait...");
      const resp = await deleteProductImage(params.productId, imageId, imageURL, public_id);
      toast.dismiss();

      if(resp.status === 200) {
        const product = resp.data.product;
        toast.success(resp.data.message);
        mutate(APIURL);
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
  }

  const btnAddImages = async (e)=>{
    const files = e.target.files;
    const form = new FormData();

    for (const file of files) {
      form.append("images", file);
    }

    try {
      toast.loading("Please wait...");
      const resp = await updateProductImages(params.productId, form);
      toast.dismiss();

      if(resp.status === 200) {
        const product = resp.data.product;
        toast.success(resp.data.message);
        mutate(APIURL);
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
      <div className="w-full text-right">
        <label className="cursor-pointer text-sm text-gray-500 bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-2">
          Add Images
          <input 
            type="file" 
            accept="image/*"
            name="images[]"
            multiple
            className="hidden"
            onChange={btnAddImages}
          />
        </label>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 pb-10 ">
        {product?.photos?.length > 0 ? (
          product.photos.map((photo, i) => (
            <div
              key={photo._id}
              className="flex w-72 flex-col gap-4 bg-white px-4 py-4 rounded-2xl border"
            >
              <img
                className="w-full h-96 object-cover bg-gray-300 rounded-xl"
                src={photo.secure_url}
              />
              <div>
                <p className="text-gray-400"># {i+1}</p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <a href={photo.secure_url} target="_blank" className="flex gap-1 text-sm px-2 py-1 border hover:bg-blue-100 border-blue-400 text-blue-400 rounded-md">
                    <svg className="fill-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/></svg>
                    <p>View</p>
                  </a>

                  <button onClick={()=>{
                    btnDeleteImage(photo._id, photo.secure_url, photo?.public_id || '');
                  }} className="flex gap-1 text-sm px-2 py-1 border hover:bg-red-100 border-red-400 text-red-400 rounded-md">
                    <svg className="fill-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/></svg>
                    <p>Delete</p>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No Images found!, Add Images to see it here...</div>
        )}
      </div>
    </div>
  );
}
