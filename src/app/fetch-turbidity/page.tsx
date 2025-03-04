import { supabase } from "../../../supabase";

export default async function Page() {
    const getTurbidity = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/fetch-turbidity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
  
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Received non-JSON response");
        }
  
        return await res.json();
      } catch (error) {
        console.error('Error fetching turbidity:', error);
        return null;
      }
    };
  
    const data = await getTurbidity();
    const keys = Object.keys(data);
const lastKey = keys[keys.length - 1];
const lastTurbidity = data[lastKey];
    console.log("lastTurbidity: ", lastTurbidity);
    console.log(lastTurbidity.date);

    try {
        const {error} = await supabase
    .from("TurbidityValue")
    .upsert({id: 1, date: lastTurbidity.date, turbidity: lastTurbidity.value}, { onConflict: "id" })

    if (error){
        console.log(error);
    }

    } catch (error) {
        console.log(error);
    }
    


  
    return (
      <div>
        {/* {data ? (
          data.map((item: any, index: number) => (
            <li key={index}>{item}</li>
          ))
        ) : (
          <p>Error fetching data</p>
        )} */}
      </div>
    );
  }