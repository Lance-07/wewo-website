import { supabase } from "../../../../supabase"; 
import { encrypt } from "../../../lib/server-utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Received Body:", body);

        const { data, error } = await supabase
            .from("adminUser")
            .select("*")
            .eq("email", body.email)
            .single();

        if (error || !data) {
            console.log("No such email exists:", error);
            return NextResponse.json({ message: "No such email exists" }, { status: 400 });
        }

        if (body.password !== data.password) {
            console.log("Wrong password");
            return NextResponse.json({ message: "Wrong password" }, { status: 400 });
        }

        console.log("Login successful!");
        const token = await encrypt({ id: data.id, email: data.email });

        const response = NextResponse.json({ message: "Log in!", token });
        response.cookies.set("wewotoken", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            maxAge: 3600 * 2,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
}
