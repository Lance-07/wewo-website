export default async function Page() {
  const getBottles = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/update-pumper-values', {
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
      console.error('Error fetching bottles:', error);
      return null;
    }
  };

  const data = await getBottles();

  console.log(data);

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