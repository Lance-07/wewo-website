"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

export default async function AdminLayout({children}: { children: React.ReactNode}) {
    const token = (await cookies()).get("wewotoken")?.value;
    const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
    if (!token) {
        console.log("no token");
        redirect("/auth/login");
    }

    try {
        const payload = await jwtVerify(token, secretKey);
        console.log(payload);
        return (
            <div>
                {children}
            </div>
        )
    } catch {
        console.log("error");
        redirect("/auth/login"); // 🔹 Redirect if token is invalid
    }
    
=========
'use client';
import { useEffect } from "react";

export default function AdminLayout({children}: { children: React.ReactNode}) {
    useEffect(() => {
        document.documentElement.style.scrollBehavior = "auto"; // Disable smooth scrolling
        return () => {
            document.documentElement.style.scrollBehavior = ""; // Restore default when leaving Admin
        };
    }, []);
    return (
        <div className="[scroll-behavoir:auto]">
            {children}
        </div>
    )
>>>>>>>>> Temporary merge branch 2
}