import { NextResponse } from "next/server";
import { supabase } from "../../../../supabase";

export async function POST(req: Request) {
  try {
    if (!req.body) {
      console.log('No body')
    }

    const apiUrl = `${process.env.RPI_URL}/api/get_turbidity_values`;

    const formData = new FormData();
    formData.append('date_filter', 'all');

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: new Headers({
        'ngrok-skip-browser-warning': 'let me in',
      }),
      body: formData
    });

    if (!res.ok) throw new Error("Failed to fetch data from ngrok");

    const data = await res.json();

    const count = Object.keys(data).length;
    const lastItem = data[count - 1];
    console.log('turbidity: ', lastItem)

    const { data: supadata, error } = await supabase
      .from('TurbidityValue')
      .upsert({id: 1, turbidity: lastItem.value, date: lastItem.date})

    if (error) throw new Error(error.message);

    return NextResponse.json(supadata, {status : 200});
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch external data" }, { status: 500 });
  }
}