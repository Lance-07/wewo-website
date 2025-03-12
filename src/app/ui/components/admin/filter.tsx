'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function FilterOption() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams());

  // Get current search params
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  function updateSearchParam(key: string, value: string) {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    router.push(`${pathname}?${searchParams.toString()}`, { scroll: false });
  }

  return (
    <div className="flex self-end flex-col sm:flex-row gap-4 items-center [&>div>input]:border [&>div>input]:py-2 [&>div>input]:px-4 [&>div>input]:outline-none">
        <div className="flex items-center gap-4 w-full">
            <label htmlFor="from">From: </label>
            <input 
              value={from}
              onChange={(e) => updateSearchParam("from", e.target.value)}
              name="from" 
              id="from" 
              type="date" />
        </div>
        <div className="flex items-center gap-4 w-full">
            <label htmlFor="to">To: </label>
            <input 
              value={to}
              onChange={(e) => updateSearchParam("to", e.target.value)}
              name="to" 
              id="to" 
              type="date" 
              className="w-full" />
        </div>
    </div>
  )
}