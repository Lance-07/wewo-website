import { NextRequest, NextResponse } from "next/server";
import { verifyResetToken } from "../utils";

export async function GET(request: NextRequest) {
    try {
        const token = request.nextUrl.searchParams.get("token");

        if (!token) {
            return NextResponse.json({ message: "Token is required" }, { status: 400 });
        }

        const userId = await verifyResetToken(token);

        if (!userId) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }

        return NextResponse.json({ message: "Token is valid" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
