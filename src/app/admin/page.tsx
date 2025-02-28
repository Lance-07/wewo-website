"use client"
import React, { useEffect } from "react";
import { useState } from 'react';
import { AdminCard } from "../ui/components/card";
import AdminNav from "../ui/components/admin/adminNav";
import DashboarHeader from "../ui/components/admin/card";
import BottleStats from "./bottleStats"
import PieChart from "../ui/components/chart";
import { Check, Save, SquarePen, TriangleAlert, X } from "lucide-react";
import { convertLiterToMl } from "@/lib/utils";
import { BackwashIndSkeleton, BottleBinIndSkeleton, CardSkeletons, PieSkeleton, TableRowSkeleton } from "../ui/skeletons";
import sampleData from '../../lib/tableData.json'
import Pagination from "../ui/components/pagination";
import Table from "../ui/components/admin/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { headers } from "next/headers";
import { poppins } from "../ui/fonts";
import { supabase } from "../../../supabase"

interface AdminCardItems {
    number: string,
    label: string,
    iconLink: string,
    title: string,
    className: string
}

let adminCardItems:AdminCardItems[]
// let bottleSize 

export default function AdminPage() {

    const [activeTab, setActiveTab] = useState('overview');
    const [bottleStats, setBottleStats] = useState({ totalLiters: 0, totalBottles: 0, smallTotal: 0, mediumTotal: 0, largeTotal:0 });
    const [loading, setLoading] = useState(false)
    const smallCF = bottleStats.smallTotal * 45.54
    const mediumCF = bottleStats.mediumTotal * 91.08
    const largeCF = bottleStats.largeTotal * 240.12
    const totalCF = (smallCF + mediumCF + largeCF) * 0.001

    console.log("small: ", smallCF)
    console.log("mediumCF: ", mediumCF)
    console.log("totalCF: ", totalCF);
    

    adminCardItems = [
{
    number: bottleStats.totalLiters.toString(),
    label: 'liters',
    iconLink: '/icons/droplet.png',
    title: 'clean water distributed',
    className: 'bg-[#4668B2] text-[#4668B2]'
},
{
    number: bottleStats.totalBottles.toString(),
    label: 'plastics',
    iconLink: '/icons/plastic-bottle.png',
    title: 'PET Bottles Recycled',
    className: 'bg-[#4987B0] text-[#4987B0]'
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
        <main className="flex flex-col">
            <div className="mt-28 md:top-0 w-full bg-white z-10">
                <DashboarHeader />
            </div>
            <div className="~mt-11/28 flex justify-center">
                <div className="w-full max-w-[1260px] mx-4 sm:mx-6 md:mx-8 lg:mx-auto">
                    <DashboardCard activeTab={activeTab} setActiveTab={setActiveTab} loading={loading} />
                </div>
            </div>
            <BottleStats onDataUpdate={setBottleStats} setLoading={setLoading} />
        </main>
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

    const [timeframe, setTimeframe] = useState<string | null>('all')

    // Query the value from the db and map in this state so when the user click edit, the last value will show in the input.
    // if no value (undefined) the html will show 0 ml no worries on no value.

        const fetchPumperValues = async () => {
            try {
                
            const { data, error } = await supabase
            .from("PumperValues")
            .select("ml")
            if (error) {
                return error
            }
            console.log("data from pumper: ", data);

            setDispensedValue({
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

    const handleDispenseValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target;
        console.log(name, value) 

        setDispensedValue((prevValue) => ({...prevValue, [name]: value}))
    }

    const updatePumperValues = async () => { 
        try {
        await supabase.from("PumperValues")
            .update({ ml: dispensedValue.small })
            .eq("id", 1);

        await supabase.from("PumperValues")
            .update({ ml: dispensedValue.medium })
            .eq("id", 2);

        await supabase.from("PumperValues")
            .update({ ml: dispensedValue.large })
            .eq("id", 3);

        console.log("Pumper values updated successfully!");
    } catch (error) {
        console.error("Error updating pumper values:", error);
    }
    }

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

    // TODO:
    // split the number of rows to 10 :done
    // implement filter for daily (current day), weekly, monthly :done
    // filter for from (starting date) to (ending date) :wip (functions done) - frontend (not yet)
    
    // useEffect(() => {
    //     const params = new URLSearchParams(searchParams);
    //     const value = params.get('timeframe')
    //     setTimeframe(value)
    // }, [])

    // function handleTimeframeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    //     const value = e.target.value;
    //     setTimeframe(value)
    //     const params = new URLSearchParams(searchParams);
    //     params.set('timeframe', value)
    //     router.push(`${pathname}?${params.toString()}`)
    // }

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const fromValue = params.get('from');
        const toValue = params.get('to');

        setDateFilter((prev) => ({...prev, from: fromValue || '', to: toValue || ''}))
    }, [])

    function handleDateFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setDateFilter(prev => ({...prev, [name] : value}))
        console.log(dateFilter)
        const params = new URLSearchParams(searchParams);
        params.set(name, value)
        router.push(`${pathname}?${params.toString()}`)
    }

    console.log(dateFilter)

return (
    <div className="w-full">
        <div className="flex bg-transparent overflow-x-auto">
            <button
                className={`w-[180px] md:w-[243px] h-[45px] md:h-[54px] px-4 md:px-[30px] py-2 md:py-[15px] rounded-t-lg text-sm md:text-base transition-colors duration-200 ${
                    activeTab === 'overview' 
                    ? 'bg-blue-100 text-blue-500 border-2 border-blue-500' 
                    : 'text-gray-400'
                    }`}
                    onClick={() => setActiveTab('overview')}
                    >
                    System Overview
            </button>

            <button
                className={`w-[170px] md:w-[227px] h-[45px] md:h-[54px] px-4 md:px-[30px] py-2 md:py-[15px] rounded-t-lg text-sm md:text-base transition-colors duration-200 ${
                activeTab === 'settings' 
                ? 'bg-green-100 text-green-600 border-2 border-green-500' 
                : 'text-gray-400'
                }`}
                onClick={() => setActiveTab('settings')}
                    >
                System Settings
            </button>
        </div>

            <div className={`border-t-2 rounded-b-lg ${
                activeTab === 'overview' 
                ? 'border-blue-500' 
                : 'border-green-500'
            }`}>
            {activeTab === 'overview' ? (
                <div className="flex  flex-col gap-8">
                    <div className="flex flex-wrap justify-center gap-4 lg:justify-between mt-4">
                        {loading ? 
                            <CardSkeletons/>
                        :
                            adminCardItems.map((item, idx) => (
                                <AdminCard 
                                    key={idx}
                                    className={`${item.className} w-[280px] sm:w-[320px] md:w-[240px] lg:w-[270px] h-full md:h-[187px]`}
                                    number={item.number} 
                                    label={item.label} 
                                    iconLink={item.iconLink}      
                                    title={item.title} 
                                />
                            ))
                        }
                    </div>

                    <div className={`${poppins.className}  flex flex-wrap gap-4`}>
                        { loading ? 
                            <PieSkeleton />
                        :
                            <PieChart bottleStats={bottleStats} className="flex-[2_1_513px] min-w-[250px] sm:min-w-[400px] md:min-w-[513px] w-full" />
                        }
                        <BottleStats onDataUpdate={setBottleStats} />

                        { loading ?
                            <BackwashIndSkeleton />
                        : 
                            <div className="p-8 flex rounded-lg gap-4 flex-col flex-[1_1_407px] min-w-[250px] sm:min-w-[320px] md:min-w-[407px] w-full shadow-card-shadow">
                                <h1 className="font-semibold">Backwash Indicator</h1>
                                <h3 className="font-light text-sm">Tell if the filter should be backwash. The default is every 2 weeks</h3>
                                <div className="flex flex-col gap-[10px]">
                                    <div className="flex gap-2 sm:text-nowrap text-sm">
                                        <div className="rounded-lg bg-green-second justify-center flex items-center size-[34px]">
                                            <Check color="white" />
                                        </div>
                                        <div>
                                            <h3 className="text-green-second">Filter OK</h3>
                                            <p className="font-light text-sm text-stone-400">Turbidity is within safe range (less than 5 NTU)</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 sm:text-nowrap text-sm">
                                        <div className="rounded-lg bg-yellow-500 justify-center flex items-center size-[34px]">
                                            <TriangleAlert color="white" />
                                        </div>
                                        <div>
                                            <h3 className="text-yellow-500">Backwash Recommended Soon</h3>
                                            <p className="font-light text-sm text-stone-400">Turbidity is acceptable (5 - 10 NTU)</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 sm:text-nowrap text-sm">
                                        <div className="rounded-lg bg-red-700 justify-center flex items-center size-[34px]">
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
                                    <div className="rounded-lg size-[34px] bg-green-second flex items-center justify-center">
                                        <Check color="white" />
                                    </div>
                                    <div className="text-sm">
                                        <h3 className="text-green-second">Bin OK</h3>
                                        <p className="text-stone-500 text-sm">Bin is not full</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="rounded-lg size-[34px] bg-stone-600 flex items-center justify-center">
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
                        {/* <span className="py-2 px-4 flex min-w-52 border border-gray-200">
                            <select onChange={handleTimeframeChange} value={timeframe || 'all'} className="w-full h-full outline-none">
                                <option value="all">All</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </span> */}
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

                    <Table />

                    <div className="my-6 flex justify-center">
                        <Pagination />
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
                                            <td>1 sec</td>
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
                                            <td>2 sec</td>
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
                                            <td>3 sec</td>
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
    </div>
);
}



