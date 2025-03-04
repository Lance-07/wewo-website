import { NextResponse } from "next/server";

export async function POST(req: Request) {
try {
  if (!req.body) {
    console.log('No body')
  }

  const apiUrl = "https://modern-snake-evenly.ngrok-free.app/api/get_turbidity_values";

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
  console.log(data);
  return NextResponse.json(data);
} catch (error) {
  console.error("Error fetching data:", error);
  return NextResponse.json({ error: "Failed to fetch external data" }, { status: 500 });
}
}