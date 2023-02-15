import React from "react";
import { API } from "@/config/api.config";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site.config";

async function getProducts() {
  const res = await fetch(`${API}/products`);
  return res.json();
}

export default async function HomePage() {
  const productsData = getProducts();

  const [products] = await Promise.all([productsData]);

  return (
    <div className="container grid grid-cols-2 mx-auto gap-4">
      {products?.length > 0 ? (
        products.map((product) => (
          <Link href={`/p/${product._id}`} key={product._id} className="block">
            <img className="object-cover" src={product?.photos[0]?.secure_url} alt={product.name} />
            <div className="my-4 px-4">
              <p>{product.name}</p>
              <p>{SITE_CONFIG.CURRENCY_SYMBOL}{product.price}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No products found!</p>
      )}
    </div>
  );
}
