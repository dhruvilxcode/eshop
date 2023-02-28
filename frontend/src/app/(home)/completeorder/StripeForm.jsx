"use client";

import React from "react";
import { countries } from "./countries";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FRONTEND } from "@/config/api.config";
import { toast } from "react-toastify";
import { saveOrderDetails } from "@/controllers/order.controller";
import { getCartProducts } from "@/controllers/cart.controller";
export default function StripeForm({ scs }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const form = event.target;

    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const line1 = form.line1.value;
    const line2 = form.line2.value;
    const area = form.area.value;
    const city = form.city.value;
    const state = form.state.value;
    const postalcode = form.postalcode.value;
    const country = form.country.value;

    if (
      !(
        firstname &&
        lastname &&
        phone &&
        email &&
        line1 &&
        line2 &&
        area &&
        city &&
        state &&
        postalcode &&
        country
      )
    ) {
      toast.error("Please fill up all details!");
      return;
    }

    const paymentIntent = await stripe.retrievePaymentIntent(scs);
    const paymentId = paymentIntent.paymentIntent.id;

    const amount = paymentIntent.paymentIntent.amount / 100;

    // call api to save all details
    const cartProducts = getCartProducts();

    const products = cartProducts.map((cartItem) => ({
      productId: cartItem.product._id,
      quantity: cartItem.quantity,
      size: cartItem.size,
    }));

    console.log(products);

    try {
      const order = await saveOrderDetails(
        [...products],
        firstname,
        lastname,
        phone,
        email,
        line1,
        line2,
        area,
        city,
        state,
        postalcode,
        country,
        paymentId,
        "",
        amount
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        // return_url: "https://example.com/order/123/complete",
        return_url: `${FRONTEND}/completeorder/success`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      toast.error(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="-z-50">
      <div className="px-9 py-8">
        <h1 className="text-2xl font-bold">Complete Your Order</h1>

        <div className="flex mt-8 gap-8 flex-col-reverse md:flex-row">
          <div className="flex flex-col gap-2 w-full md:w-[65%]">
            {/* name, lname */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label htmlFor="firstname" className="block">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  placeholder="Write Your First Name here..."
                  className="block w-full mt-2 px-4 py-3 border rounded-lg"
                  name="firstname"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastname" className="block">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Write Your Last Name here..."
                  className="block w-full mt-2 px-4 py-3 border rounded-lg"
                />
              </div>
            </div>
            {/* name, lname */}

            {/* phone */}
            <div className="">
              <label htmlFor="phone" className="block">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Write Your Phone here..."
                className="block w-full mt-2 px-4 py-3 border rounded-lg"
              />
            </div>
            {/* phone */}

            {/* email */}
            <div className="">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Write Your Email here..."
                className="block w-full mt-2 px-4 py-3 border rounded-lg"
              />
            </div>
            {/* email */}

            {/* address line 1 */}
            <div className="">
              <label htmlFor="line1" className="block">
                Address line 1
              </label>
              <input
                type="text"
                id="line1"
                name="line1"
                placeholder="Write Your Address here..."
                className="block w-full mt-2 px-4 py-3 border rounded-lg"
              />
            </div>
            {/* address line 1 */}

            {/* address line 2 */}
            <div className="">
              <label htmlFor="line2" className="block">
                Address line 2
              </label>
              <input
                type="text"
                id="line2"
                name="line2"
                placeholder="Write Your Address here..."
                className="block w-full mt-2 px-4 py-3 border rounded-lg"
              />
            </div>
            {/* address line 2 */}

            {/* area, city */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label htmlFor="area" className="block">
                  Area
                </label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  placeholder="Write Your Area here..."
                  className="block w-full mt-2 px-4 py-3 border rounded-lg"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="city" className="block">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Write Your City here..."
                  className="block w-full mt-2 px-4 py-3 border rounded-lg"
                />
              </div>
            </div>
            {/* area, city */}

            {/* state, postal code */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label htmlFor="state" className="block">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="Write Your State here..."
                  className="block w-full mt-2 px-4 py-3 border rounded-lg"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="postalcode" className="block">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalcode"
                  name="postalcode"
                  placeholder="Write Your Postal Code here..."
                  className="block w-full mt-2 px-4 py-3 border rounded-lg"
                />
              </div>
            </div>
            {/* area, city */}

            {/* country */}
            <div className="">
              <label htmlFor="country" className="block">
                Country
              </label>
              <select
                id="country"
                name="country"
                placeholder="Select Your Country here..."
                className="block w-full mt-2 px-4 py-3 border rounded-lg"
              >
                <option value="">Select your country</option>
                {countries.map((country, index) => (
                  <option key={index}>{country.name}</option>
                ))}
              </select>
            </div>
            {/* country */}
          </div>
          <div className="w-full md:w-[35%] h-fit border rounded-2xl p-4">
            <PaymentElement className="z-[-9999]" />
            <button
              type="submit"
              disabled={!stripe}
              className="block mt-4 text-center w-full bg-eshop-dark hover:bg-gray-800 text-white px-5 py-4 rounded-xl"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
