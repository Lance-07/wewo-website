"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // useEffect(() => {
    //     document.documentElement.style.scrollBehavior = "auto"; // Disable smooth scrolling
    //     return () => {
    //         document.documentElement.style.scrollBehavior = ""; // Restore default when leaving Admin
    //     };
    // }, []);

    // useEffect(() => {
    //     async function checkAuth() {
    //         const res = await fetch("/api/verify", { method: "GET" });
    //         if (!res.ok) {
    //             router.push("/auth/login"); // Redirect if token is invalid
    //             return;
    //         }
    //         setIsLoading(false);
    //     }

    //     checkAuth();
    // }, [router]);

    // if (isLoading) return <p>Loading...</p>;

    return <div>{children}</div>;
}
