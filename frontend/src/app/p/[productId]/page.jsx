import React from "react";

import { API } from "@/config/api.config";
import { SITE_CONFIG } from "@/config/site.config";
import ImageSwiper from "./ImageSwiper";

// // TODO: currently in next/canary as of 14/feb/2023
// export const metadata = {
//   title: 'My Page Title',
//   description: '',
//   openGraph: {
//     title: 'Next.js',
//     description: 'The React Framework for the Web',
//     url: 'https://nextjs.org',
//     siteName: 'Next.js',
//     images: [
//       {
//         url: 'https://nextjs.org/og.png',
//         width: 800,
//         height: 600,
//       },
//       {
//         url: 'https://nextjs.org/og-alt.png',
//         width: 1800,
//         height: 1600,
//         alt: 'My custom alt',
//       },
//     ],
//     locale: 'en-US',
//     type: 'website',
//   },
// };

/**
 * @param {string} productId ID of product to fetch Product OBJ from Database.
 *  */
async function getProduct(productId) {
  const res = await fetch(`${API}/products/${productId}`);
  return res.json();
}

export default async function ProductPage({ params, searchParams }) {
  const productId = params.productId;

  const productPromise = getProduct(productId);
  const [productData] = await Promise.all([productPromise]);
  const product = productData.product;

  const name = product.name;
  const price = product.price;
  const mrp = product.mrp;
  const sku_id = product.sku_id;
  const description = product.description;
  const sizes = product.sizes;
  const featured = product.featured;
  const photos = product?.photos || [];
  const stock = product.stock;
  const collectionId = product.collectionId;

  const photo1 = photos[0]?.secure_url || "";

  return (
    <div className="flex w-full px-10 my-8 gap-8">
      <div className="w-2/4 ">
        <ImageSwiper images={photos} />
      </div>
      <div className="w-2/4">
        <label className="block mt-2 w-fit border border-eshop-dark text-eshop-dark bg-white rounded-full text-sm px-4 py-1">
          Category
        </label>

        <h3 className="mt-8 font-medium text-4xl">{name}</h3>
        <p className="text-5xl mt-4">
          <span className="text-5xl text-gray-400">
            {SITE_CONFIG.CURRENCY_SYMBOL}
          </span>
          {price}
        </p>

        <div className="mt-8">
          <div className="">
            Size: <span className="text-gray-400">S</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            {sizes.map((size, index) => (
              <div key={index} className="rounded-2xl p-4 border cursor-pointer hover:bg-gray-100 hover:text-gray-600">
                {size}
              </div>
            ))}
          </div>
        </div>

        <button className="rounded-2xl bg-eshop-dark hover:bg-gray-200 hover:text-gray-500 transition text-white mt-12 text-center px-4 py-6 w-full text-xl">
          Add to Cart
        </button>

        <div className="mt-12 flex w-full items-center justify-center gap-12">
          <button className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"/></svg>
            <p>Add to wishlist</p>
          </button>
          <button className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.12 17.023l-4.199-2.29a4 4 0 1 1 0-5.465l4.2-2.29a4 4 0 1 1 .959 1.755l-4.2 2.29a4.008 4.008 0 0 1 0 1.954l4.199 2.29a4 4 0 1 1-.959 1.755zM6 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm11-6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
            <p>Share</p>
          </button>
        </div>
      </div>
    </div>
  );
}
