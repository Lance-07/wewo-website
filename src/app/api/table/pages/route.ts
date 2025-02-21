import { NextResponse } from "next/server";
import tableData from "@/lib/tableData.json";

const ITEMS_PER_PAGE = 10;

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const timeframe = searchParams.get("timeframe") || "all";
        const from = searchParams.get("from") || "";
        const to = searchParams.get("to") || "";

        let filteredData = [...tableData];

        if (timeframe !== "all") {
            const now = new Date();
            let startDate = new Date();

            if (timeframe === "daily") {
                startDate.setDate(now.getDate() - 1);
            } else if (timeframe === "weekly") {
                startDate.setDate(now.getDate() - 7);
            } else if (timeframe === "monthly") {
                startDate.setMonth(now.getMonth() - 1);
            }

            filteredData = filteredData.filter(item => new Date(item.date) >= startDate);
        }

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
