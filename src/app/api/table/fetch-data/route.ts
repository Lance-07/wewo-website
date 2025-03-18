import { NextResponse } from "next/server";
import { supabase } from "../../../../../supabase"; 

const ITEMS_PER_PAGE = 10;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from")
    const to = searchParams.get("to")
    const page = parseInt(searchParams.get("page") || "1", 10);
    const fromDate = from ? new Date(from).toISOString() : null;
    const toDate = to ? new Date(to).toISOString() : null;
    let tableData: TableData[] = [];
    const offset = (page - 1) * ITEMS_PER_PAGE;

    try {
        let query = supabase
        .from("CollectedBottles")
        .select("*")
        .order('date', { ascending: false })
        .range(offset, offset + ITEMS_PER_PAGE - 1)

        if (fromDate && toDate) {
            console.log('run without offset')
            query = query.gte("date", fromDate).lte("date", toDate);
        } else {
            if (fromDate) query = query.gte("date", fromDate);
            if (toDate) query = query.lte("date", toDate);
            query = query.range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);
        }

        const { data, error } = await query
        if (data) {
            tableData = data.map((item) => ({
                id: item.id,               
                date: item.date,
                waterDistribution: item.totalLiters, // convert to mL
                totalBottles: item.small + item.medium + item.large,
                co2: parseFloat((((item.small * 45.54) + ( item.medium * 91.08 ) + ( item.large * 240.12 )) * 0.001).toFixed(1)),
                bottles: {
                    small: item.small,
                    medium: item.medium,
                    large: item.large
                }
            }));
        } else {
            console.log("NO BOTTLE FETCHED: ",error);
        }

        return NextResponse.json({ data: tableData as TableData[] });

    } catch (error) {
        console.log(error);
    }
}
