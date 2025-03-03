export default async function Page() {
  const getBottles = async () => {
    const res = await fetch('http://localhost:3000/api/fetch_bottles', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    });

    return res.json();
  }

  const data = await getBottles();

  console.log(data)

  return (
    <div>
      
    </div>
  )
}