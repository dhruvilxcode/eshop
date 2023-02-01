import { NextResponse } from "next/server";

export default function middleware(req) {
    const tokenCookie = req.cookies.get("token");
    const token = tokenCookie?.value;

    const url = req.url;
    // console.log(url);

    if(!url.includes("/admin/login")) {
        if(!token) {
            const nextUrl = req.nextUrl.clone()
            const redirectTo = encodeURIComponent(url)
            nextUrl.pathname = `/admin/login`;
            
            return NextResponse.rewrite(nextUrl);
        }
    }
}

export const config = {
    matcher: ['/admin/:path*'],
}