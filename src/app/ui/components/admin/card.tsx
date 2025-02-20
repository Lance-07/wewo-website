import { poppins } from "@/app/ui/fonts";
import { FC, ReactNode } from 'react';
import React from "react";



export default function DashboardHeader() {
  return (
    <div className={`${poppins.className} bg-white flex justify-center`}>
      <div className="md:fixed md:top-[60px] w-full max-w-[1150px] h-[100px] mx-4 sm:mx-6 md:mx-8 lg:mx-auto rounded-tl-lg bg-white shadow-lg flex flex-col justify-center items-center">
        <h1 className="text-base sm:text-md md:text-lg lg:text-xl font-bold leading-tight tracking-wider text-center px-2">
          Welcome to the WEWO Admin Dashboard!
        </h1>
        <p className={`${poppins.className} text-[10px] sm:text-xs md:text-sm font-normal leading-tight tracking-wide text-center max-w-3xl mt-1 px-2`}>
          Manage and monitor the WEWO system effortlessly. Track water quality, bottle collections, and system performance—all in one place.
        </p>
      </div>
    </div>
  );
}

interface DiffCardProps {
    title: string;
    children?: ReactNode;
    width?: string;
}

export const DiffCard: FC<DiffCardProps> = ({ title, children, width }) => {
    return (
        <div className={`w-full ${width} h-[250px] md:h-[291px] pt-[32px] bg-white rounded-tl-[12px] shadow-lg`}>
            <div className="px-4 md:px-6">
                <h3 className="text-base md:text-lg font-semibold">{title}</h3>
                <div className="mt-4">
                    {children}
                </div>
            </div>
        </div>
    );
};
