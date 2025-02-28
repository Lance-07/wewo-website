"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const res = await fetch("/api/verify", { method: "GET" });
            if (!res.ok) {
                router.push("/auth/login");
                return;
            }
        }

        checkAuth();
    }, [router]);

    return <div>{children}</div>;
}
