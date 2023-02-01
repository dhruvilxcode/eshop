"use client";

import { getProfile } from "@/controllers/auth.controller";
import { useEffect } from "react";

export default function AdminDashboardPage() {
  useEffect(()=>{
    _getProfile();
  },[]);

  const _getProfile = async () => {
    try {
      const resp = await getProfile();

      console.log(resp.data);

    } catch (error) {
      console.error(error);
    }
  };

  return <div className="">
    Dashboard
  </div>;
}
