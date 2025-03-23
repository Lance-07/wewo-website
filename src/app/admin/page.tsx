"use client";
import React, { Suspense, useEffect, useRef } from "react";
import { useState } from 'react';
import { AdminCard } from "../ui/components/card";
import AdminNav from "../ui/components/admin/adminNav";
import DashboarHeader from "../ui/components/admin/card";
import BottleStats from "./bottleStats"
import PieChart from "../ui/components/chart";
import { Check, Droplet, DropletOff, Loader2, SquarePen, TriangleAlert, X } from "lucide-react";
import { calculateTimePerDispensed, convertLiterToMl, formatTimePerDispensed } from "@/lib/utils";
import { BackwashIndSkeleton, BottleBinIndSkeleton, CardSkeletons, PieSkeleton, TableRowSkeleton, WaterStatusSkeleton } from "../ui/skeletons";
import Pagination from "../ui/components/pagination";
import Table from "../ui/components/admin/table";
import { poppins } from "../ui/fonts";
import { Settings } from 'lucide-react';
import { LayoutGrid } from 'lucide-react';
import { toast, Toaster } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useSWR from "swr";
import FilterOption from "../ui/components/admin/filter";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface AdminCardItems {
    number: string,
    label: string,
    iconLink: string,
    title: string,
    className: string,
    iconSize?: string,
}

let adminCardItems:AdminCardItems[]

export default function AdminPage() {

    const [activeTab, setActiveTab] = useState('overview');
    const [bottleStats, setBottleStats] = useState({ totalLiters: 0, totalBottles: 0, smallTotal: 0, mediumTotal: 0, largeTotal:0, ntu:0 });
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
    number: bottleStats.ntu.toString(),
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
    const [saveLoading, setSaveLoading] = useState(false);
    const errorShownRef = useRef<{ [key: string]: boolean }>({});
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();

    const [dispensedValue, setDispensedValue] = useState<{small: string; medium: string; large: string;}>({
        small: '0',
        medium: '0',
        large: '0',
    })

    const fetchPumperValues = async () => {   
        const res = await fetch("/api/fetch-pumper-values");
        const data = await res.json();

        return data.renamedSizes;
    }

    const { data : dispensedData, error: dispensedError, isLoading: dispensedLoading, mutate: dispensedMutate } = useSWR(`/api/fetch-pumper-values`, fetchPumperValues);

    if (dispensedError && !errorShownRef.current["dispensedError"]) {
        toast.error(dispensedError.message);
        errorShownRef.current["dispensedError"] = true;
    }

    const { data: totalPages, error: totalPagesError, isLoading } = useSWR(`/api/table/fetch-total-pages?${queryString}`, fetcher)

    if (totalPagesError && !errorShownRef.current["totalPagesError"]) {
        toast.error(totalPagesError.message);
        errorShownRef.current["totalPagesError"] = true;
    }

    const { data: waterStatus, error: waterStatusError, isLoading: waterStatusLoading } = useSWR<{status: boolean}>('/api/get-water-status', fetcher)

    if (waterStatusError && !errorShownRef.current["waterStatusError"]) {
        toast.error(waterStatusError.message);
        errorShownRef.current["waterStatusError"] = true;
    }

    useEffect(() => {
        if (dispensedData) {
            setDispensedValue({
                small: dispensedData.small.toString(),
                medium: dispensedData.medium.toString(),
                large: dispensedData.large.toString()
            })
        }
    }, [dispensedData])

    const smallTime = calculateTimePerDispensed(dispensedValue?.small || 0);
    const mediumTime = calculateTimePerDispensed(dispensedValue?.medium || 0);
    const largeTime = calculateTimePerDispensed(dispensedValue?.large || 0);

    const handleDispenseValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setDispensedValue((prevValue) => ({ ...prevValue, [name]: value }));
    };

    const updatePumperValues = async (): Promise<boolean> => { 

        const bodyData = {
            small_ml: dispensedValue.small,
            medium_ml: dispensedValue.medium,
            large_ml: dispensedValue.large,
            small_sec: calculateTimePerDispensed(dispensedValue.small),
            medium_sec: calculateTimePerDispensed(dispensedValue.medium),
            large_sec: calculateTimePerDispensed(dispensedValue.large)
        }

        const updatedValues = {
            small: Number(dispensedValue.small),
            medium: Number(dispensedValue.medium),
            large: Number(dispensedValue.large),
        }

        if (dispensedMutate) {
            dispensedMutate({ ...dispensedData, ...updatedValues }, false);
        }

        try {

            const res = await fetch("/api/update-pumper-values", {
                method: "POST", 
                body: JSON.stringify(bodyData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const response = await res.json();

            if (!res.ok) {
                toast.error(response.error);
                return false;
            } else {
                toast.success(response.message);

                return true;
            }
        } catch (error) {
            console.error("Error updating pumper values:", error);
            return false;
        }
    }

    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaveLoading(true)
        if (await updatePumperValues()) {
            setIsEdit(!isEdit)
        }
        setSaveLoading(false)
    }

    const handleCancelSettings = () => {
        setIsEdit(!isEdit)
        setDispensedValue({
            small: dispensedData.small.toString(),
            medium: dispensedData.medium.toString(),
            large: dispensedData.large.toString()
        })
    }

return (
    <>
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

                        <div className="w-full md:px-0 px-4 grid gap-4 auto-rows-auto grid-cols-1 sm:grid-cols-[minmax(400px,513px)_auto] lg:grid-cols-[513px_auto_291px]">
                            { loading ? 
                                <PieSkeleton />
                            :
                                <PieChart bottleStats={bottleStats} className="min-w-[250px] sm:min-w-[400px] md:min-w-[513px] sm:col-span-2 lg:col-span-1 w-full"/>
                            }
                            <BottleStats onDataUpdate={setBottleStats} className="p-8 flex rounded-lg gap-4 flex-col flex-[1_1_407px] min-w-[250px] sm:min-w-[320px] md:min-w-[407px] w-full shadow-card-shadow" />
                            { loading ?
                                <BackwashIndSkeleton />
                            : 
                                <div className="p-8 flex rounded-lg gap-4 flex-col min-w-[250px] sm:min-w-[320px] md:min-w-[417px] w-full shadow-card-shadow">
                                    <h1 className="font-semibold">Backwash Indicator</h1>
                                    <h3 className="font-light text-sm">Tell if the filter should be backwash. The default is every 2 weeks</h3>
                                    <div className="flex flex-col gap-[10px]">
                                        <div className="flex items-center gap-2 sm:text-nowrap text-sm">
                                            <div className="rounded-lg shrink-0 bg-green-second justify-center flex items-center size-[34px]">
                                                <Check color="white" />
                                            </div>
                                            <div>
                                                <h3 className="text-green-second">Filter OK</h3>
                                                <p className="font-light text-sm text-stone-400">Turbidity is within safe range (less than 5 NTU)</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 sm:text-nowrap text-sm">
                                            <div className="rounded-lg shrink-0 bg-yellow-500 justify-center flex items-center size-[34px]">
                                                <TriangleAlert color="white" />
                                            </div>
                                            <div>
                                                <h3 className="text-yellow-500">Backwash Recommended Soon</h3>
                                                <p className="font-light text-sm text-stone-400">Turbidity is acceptable (5 - 10 NTU)</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 sm:text-nowrap text-sm">
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
                                <div className="p-8 flex rounded-lg gap-4 flex-col min-w-[200px] md:min-w-[291px] w-full shadow-card-shadow">
                                    <h1 className="font-semibold">Bottle Bin Indicator</h1>
                                    <h3 className="font-light text-sm">Predict if the bottle bin is full and should be replaced</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="rounded-lg size-[34px] shrink-0 bg-green-second flex items-center justify-center">
                                            <Check color="white" />
                                        </div>
                                        <div className="text-sm">
                                            <h3 className="text-green-second">Bin OK</h3>
                                            <p className="text-stone-500 text-sm">Bin is not full</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
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

                        <div className="space-y-4">
                            <div className="w-full flex flex-col sm:flex-row items-center mt-4 px-3">
                                <h2 className="text-blue-main text-3xl mb-2 sm:mb-0 text-center sm:mr-auto font-bold">WEWO's Usage Logs</h2>
                                <FilterOption />
                            </div>

                            <hr />

                            <div className="flex flex-col w-full px-3">
                                <Table />

                                <div className="my-6 flex justify-center">
                                    <Pagination totalPages={totalPages} isLoading={isLoading} />
                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="w-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-lg p-8 space-y-4">
                        <div className="flex items-center justify-between">
                            <h1 className="font-bold ~text-xl/3xl">Water Dispense Settings</h1>
                                <Dialog open={isEdit} onOpenChange={setIsEdit}>
                                    <DialogTrigger asChild>
                                        <button 
                                            className="text-white bg-blue-main flex justify-center items-center px-4 py-2 gap-2 rounded-lg">
                                            <span>Edit</span>
                                            <SquarePen />
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="[&_label]:text-blue-main sm:max-w-md py-8">
                                        <DialogHeader>
                                            <DialogTitle>Update Pumper Values</DialogTitle>
                                            <DialogDescription>This will update the amount of water the WEWO machine release per bottle sizes.</DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleSaveSettings} className="flex flex-col w-full gap-4 [&>div>p]:text-xs [&>div>p]:mt-[2px] [&>div>p]:text-gray-500">
                                            <div className="w-full">
                                                <label htmlFor="small" className="w-full inline-flex">Small 
                                                    <span className="text-xs ml-auto text-gray-500">(min 100 | max 250)</span>
                                                </label>
                                                <input type="number" 
                                                    className="mt-1 w-full px-3 py-2 border border-[#4668B2] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" 
                                                    placeholder="240"
                                                    required
                                                    value={dispensedValue.small}
                                                    onChange={handleDispenseValueChange}
                                                    name="small"
                                                    id="small"
                                                    min={100}
                                                    max={250}
                                                />
                                                <p>Pumper open time: {formatTimePerDispensed(smallTime)}</p>
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="medium" className="w-full inline-flex">Medium 
                                                    <span className="text-xs ml-auto text-gray-500">(min 351 | max 400)</span>
                                                </label>
                                                <input type="number" 
                                                    className="mt-1 w-full px-3 py-2 border border-[#4668B2] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" 
                                                    placeholder="400"
                                                    required
                                                    value={dispensedValue.medium}
                                                    onChange={handleDispenseValueChange}
                                                    name="medium"
                                                    id="medium"
                                                    min={351}
                                                    max={400}
                                                />
                                                <p>Pumper open time: {formatTimePerDispensed(mediumTime)}</p>
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="large" className="w-full inline-flex">Large 
                                                    <span className="text-xs ml-auto text-gray-500">(min 701 | max 900)</span>
                                                </label>
                                                <input type="number" 
                                                    className="mt-1 w-full px-3 py-2 border border-[#4668B2] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" 
                                                    placeholder="750"
                                                    required
                                                    value={dispensedValue.large}
                                                    onChange={handleDispenseValueChange}
                                                    name="large"
                                                    id="large"
                                                    min={701}
                                                    max={900}
                                                />
                                                <p>Pumper open time: {formatTimePerDispensed(largeTime)}</p>
                                            </div>
                                            <DialogFooter className="mt-4">
                                                <div className="w-full flex gap-4 justify-center">
                                                    <DialogClose asChild>
                                                        <button
                                                        onClick={handleCancelSettings}
                                                        className="text-black border border-slate-800 flex justify-center items-center px-4 py-2 rounded-lg gap-2 w-full transition-all hover:border-black hover:bg-slate-100"
                                                        >
                                                        <div className="flex items-center gap-2">
                                                            <span>Close</span>
                                                        </div>
                                                        </button>
                                                    </DialogClose>
                                                    <button
                                                        type="submit"
                                                        className="text-white bg-blue-main flex justify-center items-center px-4 py-2 rounded-lg gap-2 w-full transition-transform duration-200 hover:scale-105 hover:bg-blue-700"
                                                    >
                                                        {saveLoading && <Loader2 className="animate-spin text-white" size={24} />}
                                                        {!saveLoading && (
                                                        <div className="flex items-center gap-2">
                                                            <span>Save</span>
                                                        </div>
                                                        )}
                                                    </button>
                                                </div>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
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
                                    { dispensedLoading ? 
                                        <>
                                            <TableRowSkeleton />
                                            <TableRowSkeleton />
                                            <TableRowSkeleton />
                                        </> : 
                                        <>
                                            <tr>
                                                <td>Small</td>
                                                <td>250 ml - 350 ml</td>
                                                <td>{formatTimePerDispensed(calculateTimePerDispensed(dispensedData?.small || 0))}</td>
                                                <td>
                                                    {/* {isEdit ? (
                                                        <input 
                                                            value={dispensedValue.small} 
                                                            name="small" 
                                                            onChange={handleDispenseValueChange} 
                                                            type="text"
                                                            className="border p-1 text-black" 
                                                        />
                                                    ) : (
                                                        convertLiterToMl(dispensedValue?.small || "0")
                                                    )} */}
                                                    {convertLiterToMl(dispensedData?.small || "0")}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Medium</td>
                                                <td>400 ml - 700 ml</td>
                                                <td>{formatTimePerDispensed(calculateTimePerDispensed(dispensedData?.medium || 0))}</td>
                                                <td>
                                                    {/* {isEdit ? (
                                                        <input value={dispensedValue.medium} 
                                                            name="medium" 
                                                            onChange={handleDispenseValueChange} 
                                                            type="text" 
                                                            className="border p-1 text-black" 
                                                        />
                                                    ) : (
                                                        convertLiterToMl(dispensedValue?.medium || "0")
                                                    )} */}
                                                    {convertLiterToMl(dispensedData?.medium || "0")}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Large</td>
                                                <td>900 ml - 2 L</td>
                                                <td>{formatTimePerDispensed(calculateTimePerDispensed(dispensedData?.large || 0))}</td>
                                                <td>
                                                    {/* {isEdit ? (
                                                        <input value={dispensedValue.large} 
                                                            name="large"
                                                            onChange={handleDispenseValueChange} 
                                                            type="text" 
                                                            className="border p-1 text-black" 
                                                        />
                                                    ) : (
                                                        convertLiterToMl(dispensedValue?.large || "0")
                                                    )} */}
                                                    {convertLiterToMl(dispensedData?.large || "0")}
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
        
        {
            waterStatusLoading ? <WaterStatusSkeleton /> : <WaterStatus status={waterStatus?.status} />
        }
    </>
);
}

function WaterStatus({status}: {status: boolean | undefined}) {

    return (
        <div className="fixed bottom-4 z-40 right-4 sm:right-9">
            <div className={clsx(`relative group shadow-xl opacity-75 hover:opacity-100 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full`,
                {
                    'bg-red-500' : !status,
                    'bg-blue-main': status
                }
            )}>
                <div>
                    { 
                        status ? <Droplet color="white" size={32} /> : <DropletOff color="white" />
                    }
                </div>
                <div className="group-hover:opacity-100 pointer-events-none opacity-0 transition-all group-hover:translate-x-0 translate-x-1/2 bg-white border border-gray-500/25 shadow-lg absolute text-nowrap right-2 bottom-14 sm:bottom-[10%] sm:right-16 px-3 py-2 rounded-md">
                    <p className="text-stone-700">
                        {status ? "WEWO's not empty" : "WEWO's empty!"}
                    </p>
                </div>
            </div>
        </div>
    )
    
}



