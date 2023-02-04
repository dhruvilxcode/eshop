"use client";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createCoupon } from "@/controllers/coupons.controller";

export default function CreateCouponPage() {
  const router = useRouter();
  const couponCodeRef = useRef(null);
  const couponDiscountRef = useRef(null);

  const btnCreateCoupon = async () => {
    const couponCode = couponCodeRef.current.value;
    const couponDiscount = couponDiscountRef.current.value;

    if (!couponCode) {
      toast.error("Please provide Collection name!", {
        hideProgressBar: true,
      });
      return;
    }

    if(!couponDiscount) {
        toast.error("Please provide Coupon discount value between 1 to 100 %", {
            hideProgressBar: true,
        });
        return;
    }

    if(parseFloat(couponDiscount) > 100 || parseFloat(couponDiscount) < 0) {
        toast.error("Coupon discount value should be between 1 to 100 %", {
            hideProgressBar: true,
        });
        return;
    }

    try {
      toast.loading("Please wait...");
      const resp = await createCoupon(couponCode, parseFloat(couponDiscount));
      toast.dismiss();

      if (resp.status === 201) {
        toast.success("Coupon created.");
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
      <h3 className="text-3xl font-bold">Create Coupon</h3>

      <div className="mt-4">
        <label htmlFor="coupon_code" className="block">
          Coupon Code
        </label>
        <input
          ref={couponCodeRef}
          className="block w-80 mt-2 px-4 py-3 rounded-md outline-orange-400"
          type="text"
          name="coupon_code"
          id="coupon_code"
          placeholder="Enter Coupon Code here..."
        />

        <label htmlFor="coupon_discount" className="block mt-4">
          Coupon Discount
        </label>
        <input
          ref={couponDiscountRef}
          className="block w-80 mt-2 px-4 py-3 rounded-md outline-orange-400"
          type="number"
          min="1"
          max="100"
          name="coupon_discount"
          id="coupon_discount"
          placeholder="Enter Coupon Discount here..."
        />

        <button
          onClick={btnCreateCoupon}
          className="block w-80 mt-6 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
        >
          Create
        </button>
      </div>
    </div>
  );
}
