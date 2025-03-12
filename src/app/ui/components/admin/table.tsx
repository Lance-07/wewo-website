'use client';
import moment from "moment";
import { TableSkeleton } from "../../skeletons";
import { convertLiterToMl } from "@/lib/utils";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

interface ApiResponse {
    data: TableData[];
}

const fetcher = async (url: string) => {
    const response = await fetch(url);
    const result: ApiResponse = await response.json();
    return result.data;
};

export default function Table() {
    const searchParams = useSearchParams();

    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";
    const page = searchParams.get("page") || "1";

    const query = new URLSearchParams({ from, to, page }).toString();

    const { data, error, isLoading } = useSWR<TableData[]>(`/api/table/fetch-data?${query}`, fetcher)

    return (
        <div className="w-full overflow-auto shadow-card-shadow rounded-lg">
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
                    {isLoading ? 
                        Array.from({ length: 10 }).map((_, index) => <TableSkeleton key={index} />)
                        : 
                        data && data.length > 0 ? data.map((item : TableData) => (
                            <tr key={item.id} className="even:bg-gray-100">
                                <td>{moment(item.date).format('LL')}</td>
                                {/* <td>{moment(item.date).format()}</td> */}
                                <td>{convertLiterToMl(item.waterDistribution)}</td>
                                <td>{item.totalBottles}</td>
                                <td>{item.co2}</td>
                                <td>{item.bottles.small}</td>
                                <td>{item.bottles.medium}</td>
                                <td>{item.bottles.large}</td>
                            </tr>
                        )) : 
                        <tr className="h-80">
                            <td className="text-center" colSpan={7}>No Record</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}