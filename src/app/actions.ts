'use server'
import { decrypt } from "@/lib/server-utils"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"

export async function getUser() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("wewotoken")?.value;
        if (session) {
            const parsed = await decrypt(session);
            console.log(parsed)
            return parsed;
        } else {
            throw new Error("Session cookie not found");
        }
    } catch (error) {
        console.log(error)
    }
}