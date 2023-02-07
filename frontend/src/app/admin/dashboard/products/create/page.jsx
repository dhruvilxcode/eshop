"use client";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCollections } from "@/controllers/collections.controller";
import { createProduct } from "@/controllers/products.controller";

export default function CreateProductPage() {
  const router = useRouter();

  const productNameRef = useRef(null);
  const productPriceRef = useRef(null);
  const collectionIdRef = useRef(null);

  const { collections, isError, isLoading } = useCollections();

  if(isLoading) {
    return <div className="w-full px-8 py-6 2xl:w-2/4 2xl:mx-auto">
      Please wait...
    </div>
  }

  if(isError) {
    console.error(isError);
    return <div className="w-full px-8 py-6 2xl:w-2/4 2xl:mx-auto">
      Something went wrong! Try later
    </div>
  }

  const btnCreateProduct = async () => {
    const productName = productNameRef.current.value;
    const productPrice = productPriceRef.current.value;
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
    form.append("name", productName);
    form.append("price", productPrice);
    form.append("collectionId", collectionId);

    try {
      toast.loading("Please wait...");
      const resp = await createProduct(form);
      toast.dismiss();

      if(resp.status === 200) {
        const product = resp.data.product;
        console.log(product);
        console.log(product._id);
        toast.success(resp.data.message);
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
    <div className="w-full px-8 py-6 2xl:w-2/4 2xl:mx-auto">
      <h3 className="text-3xl font-bold">Add Product</h3>

      <div className="mt-4">
        <label htmlFor="product_name" className="block">
          Product Name
        </label>
        <input
          ref={productNameRef}
          className="block w-80 mt-2 px-4 py-3 rounded-md outline-orange-400"
          type="text"
          name="product_name"
          id="product_name"
          placeholder="Enter Product Name here..."
        />

        <label htmlFor="product_price" className="block mt-4">
          Product Price
        </label>
        <input
          ref={productPriceRef}
          className="block w-80 mt-2 px-4 py-3 rounded-md outline-orange-400"
          type="number"
          name="product_price"
          id="product_price"
          placeholder="Enter Product Price here..."
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
            collections.map(collection=><option key={collection._id} value={collection._id}>{collection.name}</option>)
          }
        </select>

        <button
          onClick={btnCreateProduct}
          className="block w-80 mt-6 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
        >
          Create
        </button>
      </div>
    </div>
  );
}
