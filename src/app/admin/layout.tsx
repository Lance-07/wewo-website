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
    
}