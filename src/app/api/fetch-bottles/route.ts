import { NextResponse } from "next/server";
import { supabase } from "../../../../supabase";

export async function POST(req: Request) {
  try {
    if (!req.body) {
      console.log('No body.')
    }

    const apiUrl = "https://modern-snake-evenly.ngrok-free.app/api/get_collected_bottles";

    const formData = new FormData();
    formData.append('date_filter', 'all');

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: new Headers({
        'ngrok-skip-browser-warning': 'let me in',
      }),
      body: formData
    });

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
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch external data" }, { status: 500 });
  }
}