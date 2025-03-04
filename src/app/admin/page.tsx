"use client";
import React, { Suspense, useEffect, useRef } from "react";
import { useState } from 'react';
import { AdminCard } from "../ui/components/card";
import AdminNav from "../ui/components/admin/adminNav";
import DashboarHeader from "../ui/components/admin/card";
import BottleStats from "./bottleStats"
import PieChart from "../ui/components/chart";
import { Check, Loader2, Save, SquarePen, TriangleAlert, X } from "lucide-react";
import { calculateTimePerDispensed, convertLiterToMl, formatTimePerDispensed } from "@/lib/utils";
import { BackwashIndSkeleton, BottleBinIndSkeleton, CardSkeletons, PieSkeleton, TableRowSkeleton } from "../ui/skeletons";
import Pagination from "../ui/components/pagination";
import Table from "../ui/components/admin/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { poppins } from "../ui/fonts";
import { Settings } from 'lucide-react';
import { LayoutGrid } from 'lucide-react';
import { supabase } from "../../../supabase"
import { toast, Toaster } from "sonner";

interface AdminCardItems {
    number: string,
    label: string,
    iconLink: string,
    title: string,
    className: string,
    iconSize?: string,
}

let adminCardItems:AdminCardItems[]
// let bottleSize 

export default function AdminPage() {

    const [activeTab, setActiveTab] = useState('overview');
    const [bottleStats, setBottleStats] = useState({ totalLiters: 0, totalBottles: 0, smallTotal: 0, mediumTotal: 0, largeTotal:0 });
    const [loading, setLoading] = useState(true)
    const smallCF = bottleStats.smallTotal * 45.54
    const mediumCF = bottleStats.mediumTotal * 91.08
    const largeCF = bottleStats.largeTotal * 240.12
    const totalCF = (smallCF + mediumCF + largeCF) * 0.001

    adminCardItems = [
{
    number: bottleStats.totalLiters.toString(),
    label: 'liters',
    iconLink: '/icons/droplet.png',
    title: 'clean water distributed',
    className: 'bg-[#4668B2] text-[#4668B2]',
    iconSize: 'w-4 h-4'
},
{
    number: bottleStats.totalBottles.toString(),
    label: 'plastics',
    iconLink: '/icons/plastic-bottle.png',
    title: 'PET Bottles Recycled',
    className: 'bg-[#4987B0] text-[#4987B0]',
    iconSize: 'w-4 h-4'
},
{
    number: totalCF.toFixed(1).toString(),
    label: 'kilograms',
    iconLink: '/icons/carbon-footprint.png',
    title: 'carbon footprints reduced',
    className: 'bg-[#7CBA5A] text-[#7CBA5A]'
},
{
    number: '0',
    label: 'NTU',
    iconLink: '/icons/carbon-footprint.png',
    title: 'turbidity clarity',
    className: 'bg-[#4A803D] text-[#4A803D]'
},
];

return (
    <div className="min-h-screen">
        <header>
            <AdminNav />
        </header>
        <main className="flex relative flex-col">
            <div className="mt-28 md:top-0 w-full bg-white z-10">
                <DashboarHeader />
            </div>
            <div className="~mt-10/28 flex justify-center">
                <div className="w-full max-w-[1260px] mx-4 sm:mx-6 md:mx-8 lg:mx-auto">
                    <Suspense fallback={<div>Loading...</div>}>
                        <DashboardCard activeTab={activeTab} setActiveTab={setActiveTab} loading={loading} />
                    </Suspense>
                </div>
            </div>
            <BottleStats onDataUpdate={setBottleStats} setLoading={setLoading} />
        </main>

        <Toaster richColors position="top-right" />
    </div>
);
}

interface DashboardCardProps {
activeTab: string;
setActiveTab: (tab: string) => void;
loading: boolean;
}

function DashboardCard({ activeTab, setActiveTab, loading }: DashboardCardProps){
    const [bottleStats, setBottleStats] = useState({ totalLiters: 0, totalBottles: 0, smallTotal: 0, mediumTotal: 0, largeTotal:0 });
    const [isEdit, setIsEdit] = useState(false)

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [dateFilter, setDateFilter] = useState({ from: '', to: '' })
    const [totalPages, setTotalPages] = useState(1)
    const [data, setData] = useState(null)
    const [tableLoading, setTableLoading] = useState(true)
    const tableRef = useRef<HTMLDivElement>(null);
    const scrollPosition = useRef(0);

    const from = searchParams.get('from')
    const to = searchParams.get('to')
    const page = searchParams.get('page')

    const [dispensedValue, setDispensedValue] = useState<{small: string; medium: string; large: string;}>({
        small: '250',
        medium: '500',
        large: '1000',
    })

    const [originalDispensedValue, setOriginalDispensedValue] = useState({
        small: '250',
        medium: '500',
        large: '1000',
    });


    const fetchPumperValues = async () => {
        try {
            
            const res = await fetch("/api/fetch-pumper-values");
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error);
            }

        setDispensedValue({
            small: data[0].ml.toString(),
            medium: data[1].ml.toString(),
            large: data[2].ml.toString()
        })
        setOriginalDispensedValue({
            small: data[0].ml.toString(),
            medium: data[1].ml.toString(),
            large: data[2].ml.toString()
        })
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchPumperValues();
    }, []);

    const handleDispenseValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target;
        setDispensedValue((prevValue) => ({...prevValue, [name]: value}))
    }

    const updatePumperValues = async () => { 

        const data = {
            small_ml: dispensedValue.small,
            medium_ml: dispensedValue.medium,
            large_ml: dispensedValue.large,
            small_sec: calculateTimePerDispensed(dispensedValue.small),
            medium_sec: calculateTimePerDispensed(dispensedValue.medium),
            large_sec: calculateTimePerDispensed(dispensedValue.large)
        }

        try {

            const res = await fetch("/api/update-pumper-values", {
                method: "POST", 
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const response = await res.json();

            if (!res.ok) {
                toast.error(response.error);
            } else {
                toast.success(response.message);
            }

            console.log("Pumper values updated successfully!");
        } catch (error) {
            console.error("Error updating pumper values:", error);
        }
    }
``
    const handleSaveSettings = () => {
        // call the save server action
        console.log(dispensedValue)
        updatePumperValues()
        setIsEdit(!isEdit)
        setOriginalDispensedValue(dispensedValue)
    }

    const handleCancelSettings = () => {
        setIsEdit(!isEdit)
        setDispensedValue(originalDispensedValue)
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const fromValue = params.get("from") || "";
        const toValue = params.get("to") || "";
    
        if (fromValue !== dateFilter.from || toValue !== dateFilter.to) {
            setDateFilter({ from: fromValue, to: toValue });
        }
    }, [from, to]);
    
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
    
        if (dateFilter.from) {
            params.set("from", dateFilter.from);
        } else {
            params.delete("from");
        }
    
        if (dateFilter.to) {
            params.set("to", dateFilter.to);
        } else {
            params.delete("to");
        }
    
        if (params.toString() !== searchParams.toString()) {
            const timeout = setTimeout(() => {
                router.push(`${pathname}?${params.toString()}`, { scroll: false });
            }, 300);
    
            return () => clearTimeout(timeout);
        }
    }, [dateFilter]);
    
    
    useEffect(() => {
        if (tableRef.current) {
            scrollPosition.current = tableRef.current.getBoundingClientRect().top + window.scrollY;
        }
    }, [page]); 
    
    useEffect(() => {
        const getData = async () => {
            setTableLoading(true);
            try {
                const res = await fetch(`/api/table/fetch-data?${searchParams.toString()}`);
                if (!res.ok) throw new Error("Failed to fetch table data.");
    
                const data = await res.json();
                setTotalPages(data.totalPages);
                setData(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setTableLoading(false);
            }
        };
    
        getData();
    }, [page, to, from]);
    
    useEffect(() => {
        if (data) {
            window.scrollTo({
                top: scrollPosition.current,
                behavior: "instant", 
            });
        }
    }, [data]); 
    

    function handleDateFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setDateFilter(prev => ({...prev, [name] : value}))
    }

return (
    <div className="w-full">
        <div className="flex bg-transparent overflow-x-auto">
            <button
                className={`w-[180px] md:w-[243px] h-[45px] md:h-[54px] px-4 md:px-[30px] py-2 md:py-[15px] rounded-t-lg text-sm md:text-base transition-colors duration-200 flex items-center gap-2 ${
                    activeTab === 'overview' 
                    ? 'bg-blue-100 text-[#4668B2] border-2 border-[#4668B2]' 
                    : 'text-gray-400'
                    }`}
                    onClick={() => setActiveTab('overview')}
                    >
                    <LayoutGrid size={16} />
                    <span>System Overview</span>
            </button>

            <button
                className={`w-[170px] md:w-[227px] h-[45px] md:h-[54px] px-4 md:px-[30px] py-2 md:py-[15px] rounded-t-lg text-sm md:text-base transition-colors duration-200 flex items-center gap-2 ${
                activeTab === 'settings' 
                ? 'bg-green-100 text-[#7CBA5A] border-2 border-[#7CBA5A]' 
                : 'text-gray-400'
                }`}
                onClick={() => setActiveTab('settings')}
                    >
                      <Settings size={16} />
                      <span>System Settings</span>
            </button>
        </div>

            <div className={`border-t-4 w-full rounded-b-lg ${
                activeTab === 'overview' 
                ? 'border-[#4668B2]'
                : 'border-[#7CBA5A]'
            }`}>
            {activeTab === 'overview' ? (
                <div className="flex py-4 flex-col w-full gap-8">
                    <div className="flex flex-wrap justify-around gap-6 lg:gap-4 w-full mt-4">
                        {loading ? 
                            <CardSkeletons/>
                        :
                            adminCardItems.map((item, idx) => (
                                <AdminCard 
                                    key={idx}
                                    className={`${item.className} shrink-0 w-[301px] h-[187px] rounded-lg shadow-[0px_2px_4px_0px_#00000040] [&>div:first-child]:${item.className.split(' ')[0]} [&>div:first-child]:h-[128px] [&>div:first-child]:rounded-t-lg [&>div:first-child]:p-4 [&>div:last-child]:h-[59px] [&>div:last-child]:gap-2 [&>div:last-child]:py-4 [&>div:last-child]:px-5 [&>div:last-child]:rounded-b-lg`}
                                    number={item.number} 
                                    label={item.label} 
                                    iconLink={item.iconLink}      
                                    title={item.title} 
                                />
                            ))
                        }
                    </div>

                    <div className={`${poppins.className} px-4 md:px-0 flex flex-wrap items-stretch justify-between gap-4`}>
                        { loading ? 
                            <PieSkeleton />
                        :
                            <PieChart bottleStats={bottleStats} className="flex-[2_1_513px] min-w-[250px] sm:min-w-[400px] md:min-w-[513px] w-full"/>
                        }
                        <BottleStats onDataUpdate={setBottleStats} className="p-8 flex rounded-lg gap-4 flex-col flex-[1_1_407px] min-w-[250px] sm:min-w-[320px] md:min-w-[407px] w-full shadow-card-shadow" />
                        
                        { loading ?
                            <BackwashIndSkeleton />
                        : 
                            <div className="p-8 flex rounded-lg gap-4 flex-col flex-[1_1_407px] min-w-[250px] sm:min-w-[320px] md:min-w-[407px] w-full shadow-card-shadow">
                                <h1 className="font-semibold">Backwash Indicator</h1>
                                <h3 className="font-light text-sm">Tell if the filter should be backwash. The default is every 2 weeks</h3>
                                <div className="flex flex-col gap-[10px]">
                                    <div className="flex gap-2 sm:text-nowrap text-sm">
                                        <div className="rounded-lg shrink-0 bg-green-second justify-center flex items-center size-[34px]">
                                            <Check color="white" />
                                        </div>
                                        <div>
                                            <h3 className="text-green-second">Filter OK</h3>
                                            <p className="font-light text-sm text-stone-400">Turbidity is within safe range (less than 5 NTU)</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 sm:text-nowrap text-sm">
                                        <div className="rounded-lg shrink-0 bg-yellow-500 justify-center flex items-center size-[34px]">
                                            <TriangleAlert color="white" />
                                        </div>
                                        <div>
                                            <h3 className="text-yellow-500">Backwash Recommended Soon</h3>
                                            <p className="font-light text-sm text-stone-400">Turbidity is acceptable (5 - 10 NTU)</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 sm:text-nowrap text-sm">
                                        <div className="rounded-lg shrink-0 bg-red-700 justify-center flex items-center size-[34px]">
                                            <X color="white" />
                                        </div>
                                        <div>
                                            <h3 className="text-red-700">Perform Backwash Immediately</h3>
                                            <p className="font-light text-sm text-stone-400">Turbidity exceeds safe limits (more than 10 NTU)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        { loading ? 
                            <BottleBinIndSkeleton />
                        : 
                            <div className="p-8 flex rounded-lg gap-4 flex-col flex-[1_1_291px] min-w-[200px] sm:min-w-[250px] md:min-w-[291px] w-full shadow-card-shadow">
                                <h1 className="font-semibold">Bottle Bin Indicator</h1>
                                <h3 className="font-light text-sm">Predic if the bottle bin is full and should be replaced</h3>
                                <div className="flex gap-2">
                                    <div className="rounded-lg size-[34px] shrink-0 bg-green-second flex items-center justify-center">
                                        <Check color="white" />
                                    </div>
                                    <div className="text-sm">
                                        <h3 className="text-green-second">Bin OK</h3>
                                        <p className="text-stone-500 text-sm">Bin is not full</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="rounded-lg size-[34px] shrink-0 bg-stone-600 flex items-center justify-center">
                                        <X color="white" />
                                    </div>
                                    <div className="text-sm">
                                        <h3 className="text-stone-600">Replaced</h3>
                                        <p className="text-stone-500 text-sm">Bin is full</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="w-full flex justify-end mt-4">
                        <div className="flex flex-col sm:flex-row gap-4 items-center [&>div>input]:border [&>div>input]:py-2 [&>div>input]:px-4 [&>div>input]:outline-none">
                            <div className="flex items-center gap-4">
                                <label htmlFor="from">From: </label>
                                <input value={dateFilter.from} onChange={handleDateFilterChange} name="from" id="from" type="date" />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="to">To: </label>
                                <input value={dateFilter.to} onChange={handleDateFilterChange} name="to" id="to" type="date" />
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div ref={tableRef} className="flex flex-col w-full">
                        <Table data={data} loading={tableLoading} />

                        <div className="my-6 flex justify-center">
                            <Pagination totalPages={totalPages} />
                        </div>
                    </div>

                </div>
            ) : (
                <div className="w-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-lg p-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <h1 className="font-bold ~text-xl/3xl">Water Dispense Settings</h1>
                        { !isEdit && (
                            <button onClick={() => setIsEdit(!isEdit)} 
                                className="text-white bg-blue-main flex justify-center items-center px-4 py-2 rounded-lg gap-2">
                                <div className="flex size-6">
                                    <SquarePen />
                                </div>
                                Edit
                            </button>
                        ) }
                        { isEdit && (
                            <div className="flex gap-4 items-center">
                                <button onClick={handleSaveSettings} 
                                    className="text-white bg-green-second flex justify-center items-center px-4 py-2 rounded-lg gap-2">
                                    <div className="flex size-6">
                                        <Save />
                                    </div>
                                    Save
                                </button>
                                <button onClick={handleCancelSettings} 
                                    className="text-white bg-red-700 flex justify-center items-center px-4 py-2 rounded-lg gap-2">
                                    <div className="flex size-6">
                                        <X />
                                    </div>
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                    <h2 className="font-light">Adjust the water dispense by WEWO depends on the bottle size</h2>
                    
                    <div className="w-full overflow-auto">
                        <table className="w-full">
                            <thead className="[&>tr>th]:py-2 bg-blue-main [&>tr>th]:px-4 [&>tr>th]:border-2 [&>tr>th]:text-white [&>tr>th]:font-bold [&>tr>th]:tracking-wider">
                                <tr>
                                    <th>Bottle Size</th>
                                    <th>Volume Range (ml)</th>
                                    <th>Pumper Open Time (secs)</th>
                                    <th>Dispensed Water (ml)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y hover:[&>tr]:text-white hover:[&>tr]:bg-slate-400 [&>tr]:transition-all text-center text-nowrap [&>tr>td]:py-2 [&>tr>td]:px-3">
                                { loading ? 
                                    <>
                                        <TableRowSkeleton />
                                        <TableRowSkeleton />
                                        <TableRowSkeleton />
                                    </> : 
                                    <>
                                        <tr>
                                            <td>Small</td>
                                            <td>250 ml - 350 ml</td>
                                            <td>{formatTimePerDispensed(calculateTimePerDispensed(dispensedValue.small || 0))}</td>
                                            <td>
                                                {isEdit ? (
                                                    <input 
                                                        value={dispensedValue.small} 
                                                        name="small" 
                                                        onChange={handleDispenseValueChange} 
                                                        type="text"
                                                        className="border p-1 text-black" 
                                                    />
                                                ) : (
                                                    convertLiterToMl(dispensedValue?.small || "0")
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Medium</td>
                                            <td>400 ml - 700 ml</td>
                                            <td>{formatTimePerDispensed(calculateTimePerDispensed(dispensedValue.medium || 0))}</td>
                                            <td>
                                                {isEdit ? (
                                                    <input value={dispensedValue.medium} 
                                                        name="medium" 
                                                        onChange={handleDispenseValueChange} 
                                                        type="text" 
                                                        className="border p-1 text-black" 
                                                    />
                                                ) : (
                                                    convertLiterToMl(dispensedValue?.medium || "0")
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Large</td>
                                            <td>900 ml - 2 L</td>
                                            <td>{formatTimePerDispensed(calculateTimePerDispensed(dispensedValue.large || 0))}</td>
                                            <td>
                                                {isEdit ? (
                                                    <input value={dispensedValue.large} 
                                                        name="large"
                                                        onChange={handleDispenseValueChange} 
                                                        type="text" 
                                                        className="border p-1 text-black" 
                                                    />
                                                ) : (
                                                    convertLiterToMl(dispensedValue?.large || "0")
                                                )}
                                            </td>
                                        </tr>
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            </div>

            {tableLoading && 
                <div className="absolute inset-0 z-50 bg-slate-700/90">
                    <div className="w-full h-screen flex items-center justify-center overflow-hidden">
                        <Loader2 className="animate-spin text-white" size={64} />
                    </div>
                </div>
            }
    </div>
);
}



