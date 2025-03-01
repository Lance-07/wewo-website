import { poppins } from "@/app/ui/fonts";
import { FC, ReactNode } from 'react';
import React from "react";

export default function DashboardHeader() {
  return (
    <div className={`${poppins.className} flex justify-center`}>
      <div className="w-[1260px] h-[116px] py-5 gap-2.5 bg-white rounded-lg shadow-[0px_4px_4px_0px_#00000026] flex flex-col justify-center items-center">
        <h1 className="text-blue-main text-xl font-bold leading-tight tracking-wider text-center">
          Welcome to the WEWO Admin Dashboard!&#127807;&#128167;
        </h1>
        <p className={`${poppins.className} text-sm font-normal leading-tight tracking-wide text-center`}>
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
