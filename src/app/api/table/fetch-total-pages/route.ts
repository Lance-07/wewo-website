import { NextResponse } from "next/server";
import { supabase } from "../../../../../supabase";

const ITEMS_PER_PAGE = 10;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const fromDate = from ? new Date(from).toISOString() : null;
  const toDate = to ? new Date(to).toISOString() : null;

    let query = supabase
      .from("CollectedBottles")
      .select("*", { count: 'exact' })
      .order('date', { ascending: false });

    if (fromDate && toDate) {
      query = query.gte("date", fromDate).lte("date", toDate);
    }

    const { data, count, error } = await query;
    if (data) {

      const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);
      console.log('total pages: ', totalPages)
      return NextResponse.json(totalPages);
    } else {
      console.log("NO BOTTLE FETCHED: ", error);
    }
}