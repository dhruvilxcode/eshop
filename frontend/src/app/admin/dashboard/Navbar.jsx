"use client";
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "../../../../public/assets/logo.svg";
import { logOut } from '@/controllers/auth.controller';
import { toast } from 'react-toastify';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const btnLogoutUser = async () => {
    try {
      const resp = await logOut();
      if(resp.status === 200) {
        toast.success(resp.data.message);
        router.replace("/admin/login");
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="w-80 h-screen bg-white border-r-2 overflow-y-auto px-4">
      <Image 
        src={logo}
        alt="Logo of the E-Shop"
        className="h-12 my-4"
      />
      <Link href="/admin/dashboard">
        <div className={
          pathname === "/admin/dashboard" ? 
          "bg-gray-100 hover:bg-gray-100 flex gap-2 items-center px-3 py-2 mt-4 border rounded-xl" : 
          "bg-white hover:bg-gray-100 flex gap-2 items-center px-3 py-2 mt-4 border border-transparent rounded-xl"
        }>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20zm-2-1V9.978l-7-5.444-7 5.444V19h14zM7 15h10v2H7v-2z"/></svg>
          <p>Dashboard</p>
        </div>
      </Link>
      <Link href="/admin/dashboard/orders">
      <div className={
        pathname === "/admin/dashboard/orders" ? 
        "bg-gray-100 hover:bg-gray-100 flex gap-2 items-center px-3 py-2 mt-4 border rounded-xl" : 
        "bg-white hover:bg-gray-100 flex gap-2 items-center px-3 py-2 mt-4 border border-transparent rounded-xl"
      }>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM8 9h8v2H8V9zm0 4h8v2H8v-2z"/></svg>
          <p>Orders</p>
        </div>
      </Link>
      <Link href="/admin/dashboard/products">
      <div className={
        pathname === "/admin/dashboard/products" ? 
        "bg-gray-100 hover:bg-gray-100 flex gap-2 items-center px-3 py-2 mt-4 border rounded-xl" : 
        "bg-white hover:bg-gray-100 flex gap-2 items-center px-3 py-2 mt-4 border border-transparent rounded-xl"
      }>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2a7 7 0 0 1 7 7h1.074a1 1 0 0 1 .997.923l.846 11a1 1 0 0 1-.92 1.074L20.92 22H3.08a1 1 0 0 1-1-1l.003-.077.846-11A1 1 0 0 1 3.926 9H5a7 7 0 0 1 7-7zm7.147 9H4.852l-.693 9H19.84l-.693-9zM14 13v2h-4v-2h4zm-2-9a5 5 0 0 0-4.995 4.783L7 9h10a5 5 0 0 0-4.783-4.995L12 4z"/></svg>
          <p>Products</p>
        </div>
      </Link>
      <Link href="/admin/dashboard/collections">
      <div className={
        pathname === "/admin/dashboard/collections" ? 
        "bg-gray-100 hover:bg-gray-100 flex gap-2 items-center px-3 py-2 mt-4 border rounded-xl" : 
        "bg-white hover:bg-gray-100 flex gap-2 items-center px-3 py-2 mt-4 border border-transparent rounded-xl"
      }>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M20 3c.552 0 1 .448 1 1v16c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1V4c0-.552.448-1 1-1h16zm-8.811 10.158L5 14.25V19h7.218l-1.03-5.842zM19 5h-7.219l2.468 14H19V5zM9.75 5H5v7.218l5.842-1.03L9.75 5z"/></svg>
          <p>Collections</p>
        </div>
      </Link>
      <Link href="/admin/dashboard/coupons">
      <div className={
        pathname === "/admin/dashboard/coupons" ? 
        "bg-gray-100 hover:bg-gray-100 flex gap-2 items-center px-3 py-2 mt-4 border rounded-xl" : 
        "bg-white hover:bg-gray-100 flex gap-2 items-center px-3 py-2 mt-4 border border-transparent rounded-xl"
      }>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M2 9.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v5.5a2.5 2.5 0 1 0 0 5V20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5.5a2.5 2.5 0 1 0 0-5zm2-1.532a4.5 4.5 0 0 1 0 8.064V19h16v-2.968a4.5 4.5 0 0 1 0-8.064V5H4v2.968zM9 9h6v2H9V9zm0 4h6v2H9v-2z"/></svg>
          <p>Coupons</p>
        </div>
      </Link>
      <Link href="/admin/dashboard/useraccess">
      <div className={
        pathname === "/admin/dashboard/useraccess" ? 
        "bg-gray-100 hover:bg-gray-100 flex gap-2 items-center px-3 py-2 mt-4 border rounded-xl" : 
        "bg-white hover:bg-gray-100 flex gap-2 items-center px-3 py-2 mt-4 border border-transparent rounded-xl"
      }>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm9 6h1v5h-8v-5h1v-1a3 3 0 0 1 6 0v1zm-2 0v-1a1 1 0 0 0-2 0v1h2z"/></svg>
          <p>User & Access</p>
        </div>
      </Link>
      <Link href="/admin/dashboard/reports">
      <div className={
        pathname === "/admin/dashboard/reports" ? 
        "bg-gray-100 hover:bg-gray-100 flex gap-2 items-center px-3 py-2 mt-4 border rounded-xl" : 
        "bg-white hover:bg-gray-100 flex gap-2 items-center px-3 py-2 mt-4 border border-transparent rounded-xl"
      }>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M5 3v16h16v2H3V3h2zm15.293 3.293l1.414 1.414L16 13.414l-3-2.999-4.293 4.292-1.414-1.414L13 7.586l3 2.999 4.293-4.292z"/></svg>
          <p>Reports</p>
        </div>
      </Link>
      <Link href="/admin/dashboard/settings">
      <div className={
        pathname === "/admin/dashboard/settings" ? 
        "bg-gray-100 hover:bg-gray-100 flex gap-2 items-center px-3 py-2 mt-4 border rounded-xl" : 
        "bg-white hover:bg-gray-100 flex gap-2 items-center px-3 py-2 mt-4 border border-transparent rounded-xl"
      }>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 1l9.5 5.5v11L12 23l-9.5-5.5v-11L12 1zm0 2.311L4.5 7.653v8.694l7.5 4.342 7.5-4.342V7.653L12 3.311zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
          <p>Settings</p>
        </div>
      </Link>
      <button onClick={btnLogoutUser} className="bg-red-100 hover:bg-red-300 text-red-500 rounded-xl my-4 block w-full">
        <div className=" flex gap-2 items-center w-full px-3 py-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-red-500" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 0 1 8 4h-2.71a8 8 0 1 0 .001 12h2.71A9.985 9.985 0 0 1 12 22zm7-6v-3h-8v-2h8V8l5 4-5 4z"/></svg>
          <p>Logout</p>
        </div>
      </button>
    </div>
  )
}
