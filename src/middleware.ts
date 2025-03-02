import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/server-utils";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/auth/login")) {
        return checkLogin(request);
    }


    if (pathname.startsWith("/admin")) {
        return checkAdminAuth(request);
    }
    return await updateSession(request)
}

function checkLogin(request: NextRequest) {
    const token = request.cookies.get("wewotoken")?.value;
    if (token) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }
}

function checkAdminAuth(request: NextRequest){
    const token = request.cookies.get("wewotoken")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
}