"use client"
import React from "react";
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
    number: '0 - 30',
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
        <main className="pt-[70px] flex flex-col">
            <div className="md:fixed md:top-0 w-full bg-white z-10">
                <DashboarHeader />
            </div>
            <div className="md:mt-[150px] flex justify-center">
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

    // Query the value from the db and map in this state so when the user click edit, the last value will show in the input.
    // if no value (undefined) the html will show 0 ml no worries on no value.
    const [dispensedValue, setDispensedValue] = useState<{small: string; medium: string; large: string;}>({
        small: '250',
        medium: '500',
        large: '1000',
    })

    const handleDispenseValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target;
        console.log(name, value) 

        setDispensedValue((prevValue) => ({...prevValue, [name]: value}))
    }

    const handleSaveSettings = () => {
        // call the save server action
        console.log(dispensedValue)
        setIsEdit(!isEdit)
    }

    // TODO:
    // split the number of rows to 10 :done
    // implement filter for daily (current day), weekly, monthly :wip (functions done) - frontend (not yet)
    // filter for from (starting date) to (ending date) :wip (functions done) - frontend (not yet)

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
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap justify-center md:justify-between mt-4">
                        {loading ? 
                            <CardSkeletons/>
                        :
                            adminCardItems.map((item, idx) => (
                                <AdminCard 
                                    key={idx}
                                    className={`${item.className} w-[280px] sm:w-[320px] md:w-[240px] lg:w-[270px] h-[150px] md:h-[187px]`}
                                    number={item.number} 
                                    label={item.label} 
                                    iconLink={item.iconLink}      
                                    title={item.title} 
                                />
                            ))
                        }
                    </div>

                    <div className="flex flex-col h-[291px] lg:flex-row gap-4 justify-between">
                        <div className="h-full">
                            { loading ? 
                                <PieSkeleton />
                            :
                                <PieChart bottleStats={bottleStats} className="min-w-[513px]" />
                            }
                        </div> 
                        <BottleStats onDataUpdate={setBottleStats} />

                        { loading ?
                            <BackwashIndSkeleton />
                        : 
                            <div className="p-8 flex rounded-lg gap-4 flex-col shadow-card-shadow">
                                <h1 className="font-semibold">Backwash Indicator</h1>
                                <h3 className="font-light text-sm">Tell if the filter should be backwash. The default is every 2 weeks</h3>
                                <div className="flex flex-col gap-[10px]">
                                    <div className="flex gap-2 text-nowrap text-sm">
                                        <div className="rounded-lg bg-green-second justify-center flex items-center size-[34px]">
                                            <Check color="white" />
                                        </div>
                                        <div>
                                            <h3 className="text-green-second">Filter OK</h3>
                                            <p className="font-light text-sm text-stone-400">Turbidity is within safe range (less than 5 NTU)</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 text-nowrap text-sm">
                                        <div className="rounded-lg bg-yellow-500 justify-center flex items-center size-[34px]">
                                            <TriangleAlert color="white" />
                                        </div>
                                        <div>
                                            <h3 className="text-yellow-500">Backwash Recommended Soon</h3>
                                            <p className="font-light text-sm text-stone-400">Turbidity is acceptable (5 - 10 NTU)</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 text-nowrap text-sm">
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
                            <div className="p-8 flex rounded-lg gap-4 flex-col shadow-card-shadow">
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

                    <div className="w-full flex justify-between">
                        <span className="py-2 px-4 flex min-w-52 border border-gray-200">
                            <select className="w-full h-full outline-none">
                                <option value="all">All</option>
                                <option value="all">Daily</option>
                                <option value="all">Weekly</option>
                                <option value="all">Monthly</option>
                            </select>
                        </span>
                        <div className="flex gap-4 items-center [&>input]:border [&>input]:py-2 [&>input]:px-4 [&>input]:outline-none">
                            <label htmlFor="from">From: </label>
                            <input id="from" type="date" />
                            <label htmlFor="to">To: </label>
                            <input id="to" type="date" />
                        </div>
                    </div>

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
                                <button onClick={() => setIsEdit(!isEdit)} 
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
                    
                    <table className="w-full">
                        <thead className="font-semibold text-stone-400 tracking-wider [&_th]:py-3 text-sm">
                            <tr>
                                <th>Bottle Size</th>
                                <th>Volume Range (ml)</th>
                                <th>Pumper Open Time (secs)</th>
                                <th>Dispensed Water (ml)</th>
                            </tr>
                        </thead>
                        <tbody className="font-light text-center divide-y [&_td]:py-3">
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
                                                    className="border p-1" 
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
                                                    className="border p-1" 
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
                                                    className="border p-1" 
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
            )}
    </div>
    </div>
);
}



