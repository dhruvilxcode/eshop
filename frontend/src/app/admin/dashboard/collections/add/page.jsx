"use client";
import { createCollection } from "@/controllers/collections.controller";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddCollectionPage() {
  const router = useRouter();
  const collectionNameRef = useRef(null);

  const btnCreateCollection = async () => {
    const collectionName = collectionNameRef.current.value;

    if (!collectionName) {
      toast.error("Please provide Collection name!", {
        hideProgressBar: true,
      });
      return;
    }

    try {
      toast.loading("Please wait...");
      const resp = await createCollection(collectionName);
      toast.dismiss();

      if(resp.status === 201) {
        toast.success("Collection created.");
        router.back();
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
    <div className="w-full px-4 py-6 2xl:w-2/4 2xl:mx-auto">
      <h3 className="text-3xl font-bold">Add Collection</h3>

      <div className="mt-4">
        <label htmlFor="collection_name" className="block">
          Collection Name
        </label>
        <input
          ref={collectionNameRef}
          className="block w-80 mt-2 px-4 py-3 rounded-md outline-orange-400"
          type="text"
          name="collection_name"
          id="collection_name"
          placeholder="Enter Collection Name here..."
        />

        <button
          onClick={btnCreateCollection}
          className="block w-80 mt-6 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
        >
          Create
        </button>
      </div>
    </div>
  );
}
