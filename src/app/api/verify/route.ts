import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
    const token = (await cookies()).get("wewotoken")?.value;
    if (!token) {
        return new Response(JSON.stringify({ valid: false }), { status: 401 });
    }

    try {
        const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
        const { payload } = await jwtVerify(token, secretKey);
        return new Response(JSON.stringify({ valid: true, payload }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ valid: false }), { status: 401 });
    }
}
