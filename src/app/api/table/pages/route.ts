import { NextResponse } from "next/server";
import tableData from "@/lib/tableData.json";

const ITEMS_PER_PAGE = 10;

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const from = searchParams.get("from") || "";
        const to = searchParams.get("to") || "";

        let filteredData = [...tableData];

        if (from) {
            const fromDate = new Date(from);
            filteredData = filteredData.filter(item => new Date(item.date) >= fromDate);
        }

        if (to) {
            const toDate = new Date(to);
            filteredData = filteredData.filter(item => new Date(item.date) <= toDate);
        }

        const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

        return NextResponse.json({ totalPages });
    } catch (error) {
        console.error("Error fetching total pages:", error);
        return NextResponse.json({ error: "Failed to fetch total pages" }, { status: 500 });
    }
}
