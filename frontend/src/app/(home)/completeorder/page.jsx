"use client";
import React from "react";
import { STRIPE_PUBLISHABLE_KEY } from "@/config/api.config";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";

const stripePromise = loadStripe(`${STRIPE_PUBLISHABLE_KEY}`);

export default function CompleteOrderPage({ searchParams }) {

  const options = {
    // passing the client secret obtained in step 3
    clientSecret: `${searchParams.scs}`,
    // Fully customizable with appearance API.
    // appearance: {/*...*/},
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      
      <StripeForm scs={`${searchParams.scs}`} />
      
    </Elements>
  );
}
