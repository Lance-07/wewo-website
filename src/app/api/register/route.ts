import { supabase } from "../../../../supabase"; 



export async function POST(request: Request) {

    const body = await request.text();
    console.log("Raw request body:", body); 
    return new Response(JSON.stringify({ message: "success", data: body }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
        });
}
// narereceive na