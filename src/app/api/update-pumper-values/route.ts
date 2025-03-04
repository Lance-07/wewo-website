import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json()
  try {
    if (!req.body) {
      console.log('No body')
    }

    const apiUrl = "https://modern-snake-evenly.ngrok-free.app/api/update_pumper_values";
    console.log("req.body: ", body.small_sec);

    const formData = new FormData();
    formData.append('small_sec', body.small_sec)
    formData.append('small_ml', body.small_ml)
    formData.append('medium_sec', body.medium_sec)
    formData.append('medium_ml', body.medium_ml)
    formData.append('large_sec', body.large_sec)
    formData.append('large_ml', body.large_ml)

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: new Headers({
        'ngrok-skip-browser-warning': 'let me in',
      }),
      body: formData
    });
    
    if (!res.ok) throw new Error("Failed to fetch data from ngrok");

    const data = await res.text();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch external data" }, { status: 500 });
  }
}