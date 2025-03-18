'use client';
import { cn } from "@/lib/utils";
import { Chart as ChartJS, ArcElement, Tooltip} from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { poppins } from "../fonts";
// import BottleStats from "../../admin/bottleStats"
ChartJS.register(ArcElement, Tooltip)

const bottles = [
    {
        bottle: 'small',
        color: '#4987B0'
    },
    {
        bottle: 'medium',
        color: '#7CBA5A'
    },
    {
        bottle: 'large',
        color: '#4668B2'
    },
]

interface BottleStats {
  smallTotal: number;
  mediumTotal: number;
  largeTotal: number;
}

interface PieChartProps {
    className?: string;
    bottleStats: BottleStats;
  }

export default function PieChart({ className, bottleStats }: PieChartProps) {

    console.log('bottle stats: ',bottleStats)
    const data = {
        labels: bottles.map(bottle => bottle.bottle),
        datasets: [
            {
                // data: [bottleSize.small, bottleSize.medium, bottleSize.large],
                label: '',
                data: [bottleStats.smallTotal, bottleStats.mediumTotal, bottleStats.largeTotal],
                backgroundColor: bottles.map(bottle => bottle.color),
                borderColor:  bottles.map(bottle => bottle.color),
                borderWidth: 1,
            },
        ],
    }
    return (
        <div className={cn(`${poppins.className}  flex flex-col h-full shadow-card-shadow rounded-xl justify-center ~p-6/8`, className)}>
            <h1 className="font-semibold">Battle Count by Size</h1>
            <div className="flex flex-col justify-between sm:flex-row ">
                <div className="flex flex-col justify-between">
                    <h2 className="text-sm font-light mt-3 hidden sm:block">Here&apos;s a pie chart to visualize the overall count of bottles in the WEWO.</h2>
                    {/* <h2 className="text-sm font-light mt-3 block sm:block">Here's a pie chart to visualize the overall count of bottles in the WEWO.</h2> */}
                    <div id="caption" className="hidden sm:flex sm:flex-col">
                            {bottles.map((bottle, idx) => (
                                <div className="flex gap-2" key={idx}>
                                    <div className={cn(`bg-[${bottle.color}] w-7 h-5 rounded-sm`)}></div>
                                    <p className={cn(`text-[${bottle.color}]`)}>{bottle.bottle}</p>
                                </div>
                            ))}
                    </div>
                </div>
                <div role="figure" aria-labelledby="caption" className={`flex justify-between h-full`}>
                    <div className="flex flex-col justify-between gap-2">
                        <h2 className="text-sm font-light mt-3 sm:hidden">Here&apos;s a pie chart to visualize the overall count of bottles in the WEWO.</h2>
                        <div id="caption" className="flex flex-col justify-end sm:hidden">
                                {bottles.map((bottle, idx) => (
                                    <div className="flex gap-2" key={idx}>
                                        <div className={cn(`bg-[${bottle.color}] w-7 h-5 rounded-sm`)}></div>
                                        <p className={cn(`text-[${bottle.color}] capi`)}>{bottle.bottle}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="~w-28/52 ~h-28/52">
                            <Doughnut data={data} options={{ animation: false, responsive: true, maintainAspectRatio: false, }} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}