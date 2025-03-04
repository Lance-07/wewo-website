<<<<<<< HEAD
import { NextResponse } from "next/server";
=======
import { NextRequest, NextResponse } from "next/server";
>>>>>>> 1db778b906f140a5fa2a872f1ace4b5bb720a001
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

    const [bottlesResult, litersResult] = await Promise.all([fetchTotalBottles, fetchTotalLiters]);

    if (bottlesResult.error || litersResult.error) {
      return NextResponse.json(
        { error: bottlesResult.error || litersResult.error },
        { status: 500 }
      );
    }

    const responseData = {
      totalBottles: bottlesResult.data,
      totalLiters: litersResult.data
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

<<<<<<< HEAD
    // console.log('Response Status:', res.status);
    // console.log('Response Headers:', res.headers);

    // console.log(typeof res)
    // console.log('Response: ', res)

    if (!res.ok) throw new Error("Failed to fetch data from ngrok");

    const data = await res.json();
  
     

    const transformedData = Object.entries(data)
  .map(([key, value]) => ({
    id: parseInt(key, 10), 
    large: value.large,
    medium: value.medium,
    small: value.small,
    totalLiters: value.total_liters,
    date: value.date, 
  }))
  .filter(entry => entry.large !== 0 || entry.medium !== 0 || entry.small !== 0);

    
    console.log("Transformed data:", transformedData);
    
    // Insert into Supabase
    const { error } = await supabase
      .from("CollectedBottles")
      .upsert(transformedData, { onConflict: "id" })
    
    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully");
    }

    return NextResponse.json(transformedData);
=======
    if (!rpiRes.ok) throw new Error("Failed to fetch data from ngrok");

    const data = await rpiRes.json();
    console.log(data);
    return NextResponse.json({ message: "Successfully fetched data." }, {status: 200});
>>>>>>> 1db778b906f140a5fa2a872f1ace4b5bb720a001
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch external data" }, { status: 500 });
  }
}