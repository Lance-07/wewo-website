import { NextResponse } from "next/server";
import { supabase } from "../../../../supabase";

export async function POST(req: Request) {
  try {
    if (!req.body) {
      console.log('No body');
    }

    const body = await req.json();

    const apiUrl = `${process.env.RPI_URL}/api/update_pumper_values`;

    const formData = new FormData();
    formData.append('small_sec', body.small_sec.toString());
    formData.append('small_ml', body.small_ml.toString());
    formData.append('medium_sec', body.medium_sec.toString());
    formData.append('medium_ml', body.medium_ml.toString());
    formData.append('large_sec', body.large_sec.toString());
    formData.append('large_ml', body.large_ml.toString());

    const rpiRes = await fetch(apiUrl, {
      method: "POST",
      headers: new Headers({
        'ngrok-skip-browser-warning': 'let me in',
      }),
      body: formData
    });

    if (!rpiRes.ok) {
      throw new Error("Failed to fetch data from ngrok");
    } else {
        const { data, error } = await supabase
        .from('PumperValues')
        .upsert([
          {id: 1, value: body.small_sec, ml: body.small_ml}, 
          {id: 2, value: body.medium_sec, ml: body.medium_ml}, 
          {id: 3, value: body.large_sec, ml: body.large_ml},
        ])
        .select('name, value, ml');

        if (error) throw new Error(error.message);

        console.log('updated value from supabase: ', data)
    }
      
    const responseData = await rpiRes.text();
    console.log(responseData);

    return NextResponse.json({message: "Successfully updated pumper values."}, {status: 200});
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to update pumper values." }, { status: 500 });
  }
}