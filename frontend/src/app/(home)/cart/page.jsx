"use client";
import React, { useEffect, useState } from "react";
import { deleteCartItem, getCartProducts } from "@/controllers/cart.controller";
import { SITE_CONFIG } from "@/config/site.config";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { getStripeClientSecret } from "@/controllers/order.controller";
import { toast } from "react-toastify";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    _getCartProducts();
  }, []);

  const _getCartProducts = () => {
    const cartProducts = getCartProducts();
    setCart(cartProducts);
  };

  const _getClientSecret = async () => {
    toast.loading("Please wait...");
    const cart = getCartProducts();
    const cartTotal = cart.reduce((pV, cV) => {
      const price = cV.product.price;
      const total = parseFloat(price) * cV.quantity;
      return pV + total;
    }, 0);

    try {
      const resp = await getStripeClientSecret(cartTotal * 100);

      toast.dismiss();

      const clientSecret = resp.data.client_secret;
      router.push(`/completeorder?scs=${clientSecret}`);
    } catch (error) {
      toast.dismiss();
      toast.error("oops!, can't proceed now!");

      console.error(error);
    }
  };

  const btnDeleteCartItem = (index) => {
    const newCartProducts = deleteCartItem(index);
    setCart(newCartProducts);
  };

  if (cart.length == 0) {
    return (
      <div className="px-9 py-8 text-center">
        <h3>No products in your Cart!</h3>
      </div>
    );
  }

  const cartTotal = cart.reduce((pV, cV) => {
    const price = cV.product.price;
    const total = parseFloat(price) * cV.quantity;
    return pV + total;
  }, 0);

  return (
    <div className="px-9 py-8">
      <Head>
        <title>Cart</title>
      </Head>
      <h1>Cart ({cart.length} Items)</h1>

      <div className="flex mt-8 gap-4 flex-col-reverse md:flex-row">
        <div className="flex flex-col gap-6 w-full md:w-[70%]">
          {cart.map((cartItem, index) => (
            <div
              className="w-full flex gap-4 bg-white px-4 py-4 rounded-2xl border"
              key={index}
            >
              <Link href={`/p/${cartItem.product._id}`}>
                <img
                  className="w-24 h-28 bg-gray-300 rounded-xl object-cover"
                  src={cartItem.product?.photos[0]?.secure_url}
                />
              </Link>
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-2xl mb-1 text-ellipsis">
                  {cartItem.product.name}
                </p>
                <p>
                  {SITE_CONFIG.CURRENCY_SYMBOL}
                  {cartItem.product.price}
                </p>
                <p>Qty.: {cartItem.quantity}</p>
                {cartItem?.size ? <p>Size: {cartItem.size}</p> : <></>}
              </div>
              <div>
                <button
                  onClick={() => {
                    btnDeleteCartItem(index);
                  }}
                  className="bg-red-50 hover:bg-red-100 w-9 h-9 rounded-full flex items-center justify-center"
                >
                  <svg
                    className="fill-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full md:w-[30%] h-fit border rounded-2xl p-4">
          <div className="text-xl mb-4">
            Cart Total:{" "}
            <span className="font-bold">
              {SITE_CONFIG.CURRENCY_SYMBOL}
              {cartTotal}/-
            </span>
          </div>
          <div className="mb-4 flex justify-between">
            <p>Cart Total:</p>
            <div className="">
              {SITE_CONFIG.CURRENCY_SYMBOL}
              {cartTotal}/-
            </div>
          </div>
          <div className="mb-4 flex justify-between">
            <p>Discount (0%):</p>
            <div className="">
              -{SITE_CONFIG.CURRENCY_SYMBOL}
              0/-
            </div>
          </div>
          <div className="mb-4 flex justify-between">
            <p>Payable Total:</p>
            <div className="font-bold">
              {SITE_CONFIG.CURRENCY_SYMBOL}
              {cartTotal}/-
            </div>
          </div>
          <hr />
          <div className="mt-4">
            <label htmlFor="couponcode" className="block">
              Apply Coupon Code
            </label>
            <div className="w-full mt-2 border rounded-lg flex items-center gap-2">
              <input
                type="text"
                placeholder="Write Coupon Code here..."
                className="px-4 py-3 outline-none flex-1 rounded-lg"
                id="couponcode"
              />
              <button className="block text-eshop-dark font-bold px-2 py-2 mr-2 rounded-lg hover:bg-gray-100">
                Apply
              </button>
            </div>
          </div>
          <p className="my-4 text-center">100% Secure Payment</p>
          <button
            onClick={() => {
              _getClientSecret();
            }}
            className="block text-center w-full bg-eshop-dark hover:bg-gray-800 text-white px-5 py-4 rounded-xl"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
