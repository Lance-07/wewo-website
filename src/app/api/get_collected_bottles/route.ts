import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const externalRes = await fetch('https://modern-snake-evenly.ngrok-free.app/api/get_collected_bottles', {
        method: 'POST',
        headers: {
            "ngrok-skip-browser-warning": "let me in",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            date_filter: 'all'
        })
    })

    
        // Parse JSON
        // const externalData = await externalRes.json();

        // const externalBody = externalData.body;
        console.log(externalRes)

}