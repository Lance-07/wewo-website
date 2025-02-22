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
}