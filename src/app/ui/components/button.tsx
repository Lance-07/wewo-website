import { cn } from "@/lib/utils";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import React from "react";
import { poppins } from "../fonts";

type ButtonProps = {
    className?: string;
    childrenStyle?: string;
    children: React.ReactNode;
    active?: boolean;
    variant?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({className, childrenStyle, active, variant, children, ...props}: ButtonProps) {
    return (
        <button {...props} className={cn(
            `w-max relative inline-block px-3 py-1 over ${poppins.className} antialiased`,
            className,
            {
                'before:bg-[#344D8033] before:-inset-[1px] before:absolute before:rounded-full': !active,
                'before:bg-custom-gradient before:-inset-[1px] before:absolute before:rounded-full': active && variant === 'gradient',
                'before:bg-[#4987B0] before:-inset-[1px] before:absolute before:rounded-full': active && variant === 'blue',
                'before:bg-[#ABCF84] before:-inset-[1px] before:absolute before:rounded-full': active && variant === 'green',
                'before:bg-[#344D80] before:-inset-[1px] before:absolute before:rounded-full': active && variant === 'darkblue',
            }
        )}>
            <div className={cn(
                'absolute z-20 inset-[1px] rounded-full',
                {
                    "bg-gradient-to-r from-[#84A6EE] to-[#87EB6F] from-[7%] to-100% opacity-20": active && variant === 'gradient',
                    'bg-[#ECF8FF]': active && variant === 'blue',
                    'bg-[#EFFFE6]': active && variant === 'green',
                    'bg-[#EFF4FF]': active && variant === 'darkblue',
                }
                )}></div>
            <div className="absolute z-10 bg-white inset-[1px] rounded-full"></div>
            <span className={cn(
                "relative z-30 font-bold tracking-wider",
                {
                    'text-blue-main': active && variant === 'blue',
                    'text-[#74AD55]': active && variant === 'green',
                    'text-[#344D80]': active && variant === 'darkblue',
                }
            )}>{children}</span>
        </button>
    )
}

// TODO: Create button for navigation and hero section