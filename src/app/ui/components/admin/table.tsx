'use client';

import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { TableSkeleton } from "../../skeletons";
import { useSearchParams } from "next/navigation";
import { convertLiterToMl } from "@/lib/utils";

export default function Table() {
    const [data, setData] = useState<TableData[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const tableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (tableRef.current) {
            tableRef.current.scrollIntoView({ block: "start" });
        }
    }, [searchParams]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(`/api/table/fetch-data?${searchParams.toString()}`);
                if (!res.ok) throw new Error("Failed to fetch table data.");

                const data = await res.json();

                setData(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [searchParams]);

    console.log("data from table.tsx2: ", data);

    return (
        <div ref={tableRef} className="w-full overflow-auto shadow-card-shadow rounded-lg">
            <table className="w-full border-collapse">
                <thead className="[&>tr>th]:py-2 bg-blue-main [&>tr>th]:px-4 [&>tr>th]:border-2 [&>tr>th]:text-white [&>tr>th]:font-bold [&>tr>th]:tracking-wider">
                    <tr>
                        <th rowSpan={2}>
                            <div>
                                <p>Date</p>
                                <p className="text-sm">(mm/dd/yyyy)</p>
                            </div>
                        </th>
                        <th rowSpan={2}>Distribution</th>
                        <th rowSpan={2}>PET Bottle</th>
                        <th rowSpan={2}>CO2</th>
                        <th colSpan={3}>Bottles</th>
                    </tr>
                    <tr>
                        <th>Small</th>
                        <th>Medium</th>
                        <th>Large</th>
                    </tr>
                </thead>
                <tbody className="divide-y hover:[&>tr]:text-white hover:[&>tr]:bg-slate-400 [&>tr]:transition-all text-center text-nowrap [&>tr>td]:py-2 [&>tr>td]:px-3">
                    {loading ? 
                        Array.from({ length: 10 }).map((_, index) => <TableSkeleton key={index} />)
                        : 
                        data.map(item => (
                            <tr key={item.id} className="even:bg-gray-100">
                                <td>{moment(item.date).format('LL')}</td>
                                {/* <td>{convertLiterToMl(item.waterDistribution.toString())}</td> */}
                                <td>{item.waterDistribution}</td>
                                <td>{item.totalBottles}</td>
                                <td>{item.co2}</td>
                                <td>{item.bottles.small}</td>
                                <td>{item.bottles.medium}</td>
                                <td>{item.bottles.large}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}