"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
export default function ProductDetailPageBreadcrumb() {
    const router = useRouter();
    const pathname = usePathname();

    const paths = pathname.split("/");
    const currentPage = paths[paths.length-1].replace("_", " ");

    return <div className="w-screen py-2 px-6 border-b fixed bg-white flex items-center gap-4">
        <button onClick={()=>{
            router.back();
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm0-9h4v2h-4v3l-4-4 4-4v3z"/></svg>
        </button>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-gray-300"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/></svg>

        <Link href="/admin/dashboard/products">
            Products
        </Link>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-gray-300"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/></svg>

        <p>
            {currentPage}
        </p>

    </div>
}