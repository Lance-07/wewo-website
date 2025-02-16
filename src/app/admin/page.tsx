"use client"
import React from "react";
import { useState } from 'react';
import { AdminCard } from "../ui/components/card";
import { DiffCard } from "../ui/components/admin/card";
import AdminNav from "../ui/components/admin/adminNav";
import DashboarHeader from "../ui/components/admin/card";
import BottleStats from "./bottleStats"
import PieChart from "../ui/components/chart";

interface AdminCardItems {
    number: string,
    label: string,
    iconLink: string,
    title: string,
    className: string
}
let adminCardItems:AdminCardItems[]
const diffCardItems = [
{
    title: "Bottle Count by Size",
    width: "lg:w-[513px]"
},
{
    title: "Backwash Indicator",
    width: "lg:w-[407px]"
},
{
    title: "Bottle Bin Indicator",
    width: "lg:w-[300px]"
}
];

export default function AdminPage() {

    const [activeTab, setActiveTab] = useState('overview');
    const [bottleStats, setBottleStats] = useState({ totalLiters: 0, totalBottles: 0 });


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
    number: '3',
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
        
        <main className="pt-[70px] flex flex-col">
            <div className="md:fixed md:top-0 w-full bg-white z-10">
                <DashboarHeader />
            </div>
            <div className="md:mt-[150px] flex justify-center">
                <div className="w-full max-w-[1150px] mx-4 sm:mx-6 md:mx-8 lg:mx-auto">
                    <DashboardCard activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
            </div>
            <BottleStats onDataUpdate={setBottleStats} />
        </main>
    </div>
);
}

interface DashboardCardProps {
activeTab: string;
setActiveTab: (tab: string) => void;
}

function DashboardCard({ activeTab, setActiveTab }: DashboardCardProps){
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

            <div className={`border-t-2 rounded-b-lg overflow-y-auto ${
                activeTab === 'overview' 
                ? 'border-blue-500' 
                : 'border-green-500'
            }`}>
            {activeTab === 'overview' ? (
                <div className="flex flex-col gap-4">
                <div className="flex flex-wrap justify-center md:justify-between mt-4">
                    {adminCardItems.map((item, idx) => (
                    <AdminCard 
                    key={idx}
                    className={`${item.className} w-[280px] sm:w-[320px] md:w-[240px] lg:w-[270px] h-[150px] md:h-[187px]`}
                    number={item.number} 
                    label={item.label} 
                    iconLink={item.iconLink}      
                    title={item.title} 
                    />
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-4 justify-between">
                    {diffCardItems.map((item, idx) => (
                        <DiffCard
                        key={idx}
                            title={item.title}
                                width={item.width}
                        
                
                        />
                        ))}
                    </div>
                </div>
            ) : (
            
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4 justify-between">
                <div className="w-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-lg p-4">
                
                </div>
                </div>
            </div>
    
            )}
    </div>
    </div>
);
}



