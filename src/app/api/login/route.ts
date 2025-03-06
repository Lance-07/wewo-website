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
            if (data.loginAttempts >= 5){
                await supabase
                    .from('adminUser')
                    .update({ isLocked: 'TRUE' })
                    .eq('id', data.id)
                return NextResponse.json({ message: "TOO MANY ATTEMPTS. ACC LOCK!" }, { status: 400 });        
            } else {
                    console.log("Wrong password");
                    const { error } = await supabase
                    .from('adminUser')
                    .update({ loginAttempts: data.loginAttempts + 1 })
                    .eq('id', data.id)
                    console.log("data from password attempt block", error);
                    const attempsRemaining = 6 - (data.loginAttempts + 1)
                    let attempsMessage = attempsRemaining == 1 ? 'Only 1 attempts left before account lock!' : `Wrong password! ${attempsRemaining} attempts remaining.`;
                return NextResponse.json({ message: attempsMessage }, { status: 400 });
            }
            
        } else {
        if (data.isLocked == false){
            console.log("Login successful!");
            const token = await encrypt({ id: data.id, email: data.email });
            await supabase
            .from('adminUser')
            .update({ loginAttempts: 0 })
            .eq('id', data.id)
            const response = NextResponse.json({ message: "Log in!", token });
            response.cookies.set("wewotoken", token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === "production", 
                maxAge: 3600 * 2,
                path: "/",
            });
            return response;
            } else {
                return NextResponse.json({ message: "YOUR ACCOUNT HAS BEEN LOCKED DUE TO TOO MANY FAILED ATTEMPTS. CONTACT DEVS :P" }, { status: 400 });
            }
        }

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
}
