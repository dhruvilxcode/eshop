"use client";
import React from "react";
import Link from "next/link";
import {
  activateCoupon,
  deactivateCoupon,
  deleteCoupon,
  useCoupons,
} from "@/controllers/coupons.controller";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

export default function CouponsPage() {
  const { coupons, isError, isLoading, APIURL } = useCoupons();
  const { mutate } = useSWRConfig();

  if (isError) {
    console.error(isError);
    return (
      <div className="w-full px-4 py-6">There is error getting Coupons!</div>
    );
  }

  if (isLoading) {
    return <div className="w-full px-4 py-6">Please wait...</div>;
  }

  const btnDeleteCoupon = async (couponCode) => {
    try {
      const isConfirm = window.confirm(
        "Are you sure?, this process is not reversible ✋🛑"
      );

      if (!isConfirm) {
        return;
      }

      toast.loading("Please wait...");
      const resp = await deleteCoupon(couponCode);
      if (resp.status === 201) {
        toast.dismiss();
        toast.success(resp.data.message);
        return;
      }
    } catch (error) {
      console.error(error);
      const data = error?.response?.data || "";
      toast.dismiss();
      toast.error(data?.message || "something went wrong!");
    }
  };

  const activateTheCoupon = async (code) => {
    try {
      toast.loading("Please wait...");
      const resp = await activateCoupon(code);
      if (resp.status === 201) {
        toast.dismiss();
        toast.success(resp.data.message);
        return;
      }
    } catch (error) {
      console.error(error);
      const data = error?.response?.data || "";
      toast.dismiss();
      toast.error(data?.message || "something went wrong!");
    }
  };

  const deactivateTheCoupon = async (code) => {
    try {
      toast.loading("Please wait...");
      const resp = await deactivateCoupon(code);
      if (resp.status === 201) {
        toast.dismiss();
        toast.success(resp.data.message);
        return;
      }
    } catch (error) {
      console.error(error);
      const data = error?.response?.data || "";
      toast.dismiss();
      toast.error(data?.message || "something went wrong!");
    }
  };

  return (
    <div className="w-full px-4 py-6 2xl:w-2/4 2xl:mx-auto">
      <h3>Coupons</h3>

      <Link
        href="/admin/dashboard/coupons/create"
        className="mt-4 inline-block bg-slate-200 hover:bg-slate-300 text-sm text-slate-800 rounded-md px-4 py-2"
      >
        Create Coupon
      </Link>

      <div className="mt-6 flex flex-col gap-4 w-full md:w-2/4 2xl:w-full md:mx-auto">
        {coupons.map((coupon) => (
          <div
            className="w-full px-4 py-3 border rounded-md bg-white"
            key={coupon._id}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p>{coupon.code}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {coupon.discount}% OFF
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="relative flex justify-between items-center group p-2 text-xl">
                  <input
                    checked={coupon.active}
                    onChange={async (e) => {
                      const checked = e.target.checked;

                      if (checked) {
                        await activateTheCoupon(coupon.code);
                      } else {
                        await deactivateTheCoupon(coupon.code);
                      }
                      mutate(APIURL);
                    }}
                    type="checkbox"
                    className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                  />
                  <span className="w-10 h-6 flex items-center flex-shrink-0 ml-1 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-3 group-hover:after:translate-x-1"></span>
                </label>

                <button
                  onClick={() => {
                    btnDeleteCoupon(coupon.code);
                  }}
                  className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-200 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-red-400"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
