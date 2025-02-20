import { supabase } from "../../../../supabase"; 



export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log(body);

        const { data, error } = await supabase
        .from("adminUser")
        .select("*")
        .eq("email", body.email)
        .single();

        console.log(data);

        if (data){
            console.log("email existing! ", data)
            if (body.password == data.password){
                return new Response(JSON.stringify({ message: "Received", data: body }), {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                    });
            } else if (body.password != data.password){
                return new Response(JSON.stringify({ message: "wrong password", data: body }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                    });
            }

        } else if (error) {
            return new Response(JSON.stringify({ message: "No such email exists", data: body }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
                });
        }
    } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
    });
    }
}

// try {
//     const formData = await request.formData()
// const email = formData.get('email')
// const password = formData.get('password')

// const { data, error } = await supabase
// .from("adminUser")
// .select("email")
// .eq("email", email)
// .single();

// if (error) {
//     return new Response(JSON.stringify({ error: "Database error", details: error.message }), { status: 500 });
// }

// return new Response(JSON.stringify({ message: "Email exists" }), { status: 200 });
// }
// catch (error) {
//     console.log(error);
// }