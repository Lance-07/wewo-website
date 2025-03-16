import { NextResponse } from "next/server";
import { supabase } from "../../../../supabase";

export async function POST(req: Request) {
try{
    const body = await req.json();
    const { status } = body; 
    console.log(status);

        const { data, error } = await supabase
            .from('WaterLevelStatus')
            .upsert([
                {id: 1, status}, 
            ])
            .select('status');
        
        if (!data){
            return error
        }

    return NextResponse.json({"message": "received!"});

} catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
}
