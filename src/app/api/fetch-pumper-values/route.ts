import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../supabase";

export async function GET(req: NextRequest) {
    try {
        const { data, error } = await supabase
            .from('PumperValues')
            .select('ml')

        if (error) NextResponse.json({error: error.message}, {status: 500});

        const renamedSizes = data ? Object.fromEntries(
            Object.entries(data).map(([key, value]) => {
                const newKeys = ["small", "medium", "large"];
                return [newKeys[+key], value.ml];
            })
        ) : {};

        console.log(renamedSizes)

        return NextResponse.json({renamedSizes, message: 'Successfully fetch pumper values.'}, { status: 200 },);        
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch external data" }, { status: 500 });
        
    }
}