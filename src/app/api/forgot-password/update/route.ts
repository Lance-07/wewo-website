import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../../supabase";
import { deleteResetToken, verifyResetToken } from "../utils";
import { createHash } from "crypto";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { newPass, token } = body;
        
        console.log('token: ', token)

        if (!token) {
            return NextResponse.json({ message: "Token is missing" }, { status: 400 });
        }

        const userId = await verifyResetToken(token) 

        if (!userId) {
            return NextResponse.json({ message: 'Invalid or token has been expired.'}, { status: 400 })
        }

        // const hashedPassword = createHash("sha256").update(newPass).digest("hex");

        const { error: updateError } = await supabase
            .from("adminUser")
            // .update({ password: hashedPassword })
            .update({ password: newPass })
            .eq("id", userId);

        if (updateError) {
            return NextResponse.json({ message: "Failed to update password." }, { status: 500 });
        }

        await deleteResetToken(token);
    
        return NextResponse.json({ message: "Password updated successfully. Redirecting to login." }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong.", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
} 