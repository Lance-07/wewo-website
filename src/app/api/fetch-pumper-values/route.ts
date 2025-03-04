import { NextResponse } from "next/server";
import { supabase } from "../../../../supabase";

export async function GET(req: NextResponse) {
    try {
        const { data, error } = await supabase
            .from('PumperValues')
            .select('ml')

        if (error) NextResponse.json({error: error.message}, {status: 500});

        return NextResponse.json({...data, message: 'Successfully fetch pumper values.'}, { status: 200 },);        
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch external data" }, { status: 500 });
        
    }
}