import { NextResponse } from "next/server";
import { supabase } from "../../../../supabase";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { status } = body;
        console.log(status);

        const { data, error } = await supabase
            .from('WaterLevelStatus')
            .upsert([{ id: 1, status }])
            .select('status');

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: "Received!" }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
