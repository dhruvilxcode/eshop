"use client";

import Link from "next/link";

export default function Sidebar({params}) {
    const {productId} = params;

    return <div className="w-80 h-screen border-r flex flex-col gap-4 pt-14">
        <Link href={`/admin/dashboard/products/${productId}/basic_details`} className="block px-3 py-2 bg-gray-200 rounded-md mx-4">
            Basic Details
        </Link>
        <Link href={`/admin/dashboard/products/${productId}/advance_details`} className="block px-3 py-2 bg-gray-200 rounded-md mx-4">
            Advance Details
        </Link>
        <Link href={`/admin/dashboard/products/${productId}/images`} className="block px-3 py-2 bg-gray-200 rounded-md mx-4">
            Images
        </Link>
        <Link href={`/admin/dashboard/products/${productId}/sizes`} className="block px-3 py-2 bg-gray-200 rounded-md mx-4">
            Sizes
        </Link>
        <Link href={`/admin/dashboard/products/${productId}/variants`} className="block px-3 py-2 bg-gray-200 rounded-md mx-4">
            Variants
        </Link>
    </div>
}