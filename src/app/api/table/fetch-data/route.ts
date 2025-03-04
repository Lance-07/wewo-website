import { NextResponse } from "next/server";
// import tableData from "@/lib/tableData.json";
import moment from "moment";
import { supabase } from "../../../../../supabase"; 

interface bottleData {
    id: number,
    small: number,
    medium: number,
    large: number,
    totalLiters: number,
    date: string
}

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
        .select("*", {count: 'exact'})
        .order('date', { ascending: false })
        .range(offset, offset + ITEMS_PER_PAGE - 1)

        if (fromDate && toDate) {
            query = query.gte("date", from).lte("date", to).range(0, offset);
        } else {
            if (fromDate) query = query.gte("date", from);
            if (toDate) query = query.lte("date", to);
        }

        const { data, count, error } = await query
        if (data) {
            tableData = data.map((item) => ({
                id: item.id,               
                date: item.date,
                waterDistribution: item.totalLiters,
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

        const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);
        return NextResponse.json({ data: tableData, totalPages });

    } catch (error) {
        console.log(error);
    }
}
