import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../supabase";

export async function GET(req: NextRequest) {
  try {
    const fetchTotalBottles = supabase.rpc('get_total_combined_sum_multi', {
      p_table: 'CollectedBottles',
      p_columns: ['small', 'medium', 'large']
    });

    const fetchTotalLiters = supabase.rpc('get_total_combined_sum_multi', {
      p_table: 'CollectedBottles',
      p_columns: ['totalLiters']
    });

    const fetchSmallTotal = supabase.rpc('get_total_combined_sum_multi', {
      p_table: 'CollectedBottles',
      p_columns: ['small']
    })
    const fetchMediumlTotal = supabase.rpc('get_total_combined_sum_multi', {
      p_table: 'CollectedBottles',
      p_columns: ['small']
    })
    const fetchLargeTotal = supabase.rpc('get_total_combined_sum_multi', {
      p_table: 'CollectedBottles',
      p_columns: ['small']
    })

    const [bottlesResult, litersResult, smallResult, mediumResult, largeResult] = await Promise.all([fetchTotalBottles, fetchTotalLiters, fetchSmallTotal, fetchMediumlTotal, fetchLargeTotal]);

    if (bottlesResult.error || litersResult.error || smallResult.error || mediumResult.error || largeResult.error) {
      return NextResponse.json(
        { error: bottlesResult.error || litersResult.error },
        { status: 500 }
      );
    }

    const smallCF = smallResult.data * 45.54
    const mediumCF = mediumResult.data * 91.08
    const largeCF = largeResult.data * 240.12
    const totalCF = (smallCF + mediumCF + largeCF) * 0.001

    const responseData = {
      totalBottles: bottlesResult.data,
      totalLiters: litersResult.data,
      totalCo2:Math.round(totalCF)
    };

    console.log(responseData);
    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch external data" }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    if (!req.body) {
      console.log('No body.');
      return NextResponse.json({ error: "No body provided" }, { status: 400 });
    }

    const apiUrl = `${process.env.RPI_URL}/api/get_collected_bottles`;

    const formData = new FormData();
    formData.append('date_filter', 'all');

    const rpiRes = await fetch(apiUrl, {
      method: "POST",
      headers: new Headers({
        'ngrok-skip-browser-warning': 'let me in',
      }),
      body: formData
    });

    if (!rpiRes.ok) throw new Error("Failed to fetch data from ngrok");

    const data = await rpiRes.json();
    console.log(data);
    return NextResponse.json({ message: "Successfully fetched data." }, {status: 200});
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch external data" }, { status: 500 });
  }
}