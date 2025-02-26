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

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const from = searchParams.get("from") ? moment(searchParams.get("from"), "YYYY/MM/DD") : null;
    const to = searchParams.get("to") ? moment(searchParams.get("to"), "YYYY/MM/DD") : null;
    //let bottleData: bottleData[] = [];
    let tableData: TableData[] = [];

    try {
        const { data, error } = await supabase
        .from("CollectedBottles")
        .select("*")
        if (data) {
            //console.log("COLLECTED BOTTLE DATA: ", data)
            //tableData = data
            tableData = data.map((item) => ({
                id: item.id,               // Ensure ID is correctly assigned
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
    } catch (error) {
        console.log(error);
    }


    const ITEMS_PER_PAGE = 10;
    let filteredData = [...tableData];

    // const today = moment().format("M/D/YYYY");

    // if (timeframe === "daily") {
    //     filteredData = filteredData.filter(item => item.date === today);
    // } else if (timeframe === "weekly") {
    //     const sevenDaysAgo = moment().subtract(7, "days");
    //     filteredData = filteredData.filter(item => moment(item.date, "M/D/YYYY").isAfter(sevenDaysAgo));
    // } else if (timeframe === "monthly") {
    //     const thirtyDaysAgo = moment().subtract(30, "days");
    //     filteredData = filteredData.filter(item => moment(item.date, "M/D/YYYY").isAfter(thirtyDaysAgo));
    // } else if (from && to) {
    //     filteredData = filteredData.filter(item => {
    //         const itemDate = moment(item.date, "M/D/YYYY");
    //         return itemDate.isBetween(from, to, "day", "[]");
    //     });
    // }

    console.log(from, to)

    if (from && to) {
        filteredData = filteredData.filter(item => {
            const itemDate = moment(item.date, "M/D/YYYY");
            return itemDate.isBetween(from, to, "day", "[]");
        });
    }

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return NextResponse.json({ data: paginatedData, totalPages });
}
