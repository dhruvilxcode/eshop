"use client";
import { deleteCollection, useCollections } from "@/controllers/collections.controller";
import React from "react";
import Link from "next/link"
import { toast } from "react-toastify";

export default function CollectionsPage() {
  const { collections, isError, isLoading } = useCollections(); 

  if (isError) {
    console.error(isError);
    return <div className="w-full px-4 py-6">There is error getting Collections!</div>;
  }

  if (isLoading) {
    return <div className="w-full px-4 py-6">Please wait...</div>;
  }

  /**
   * @param {string} collectionId provide unique collection id to remove the collection
   *  */ 
  const btnDeleteCollection = async (collectionId) => {
    try {
      const isConfirm = window.confirm("Are you sure?, this process is not reversible ✋🛑");

      if(!isConfirm) {
        return;
      }

      toast.loading("Please wait...");
      const resp = await deleteCollection(collectionId);
      if(resp.status === 200) {
        toast.dismiss();
        toast.success(resp.data.message);
        return;
      }

    } catch (error) {
      console.error(error);
      const data = error.response.data;
      toast.dismiss();
      toast.error(data.message);
    }
  };

  return (
    <div className="w-full px-4 py-6 2xl:w-2/4 2xl:mx-auto">
      <h3>Collections</h3>

      <Link href="/admin/dashboard/collections/add" className="mt-4 inline-block bg-slate-200 hover:bg-slate-300 text-sm text-slate-800 rounded-md px-4 py-2">
        Add Collection
      </Link>

      <div className="mt-6 flex flex-col gap-4 w-full md:w-2/4 2xl:w-full md:mx-auto">
        {collections.map((collection) => (
          <div className="w-full px-4 py-3 border rounded-md bg-white hover:bg-gray-50 cursor-pointer" key={collection._id}>
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p>{collection.name}</p>
                <p className="mt-2 text-xs text-slate-500">{collection.createdAt}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/dashboard/collections/update/${collection._id}?name=${collection.name}`} className="w-7 h-7 rounded-full bg-blue-50 hover:bg-blue-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="fill-blue-400" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path d="M6.414 16L16.556 5.858l-1.414-1.414L5 14.586V16h1.414zm.829 2H3v-4.243L14.435 2.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 18zM3 20h18v2H3v-2z"/></svg>
                </Link>
                <button onClick={()=>{
                  btnDeleteCollection(collection._id);
                }} className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="fill-red-400" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9z"/></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
