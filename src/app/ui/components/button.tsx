import { cn } from "@/lib/utils";
import React from "react";
import { poppins } from "../fonts";

type ButtonProps = {
    className?: string;
    childrenStyle?: string;
    children: React.ReactNode;
    active?: boolean;
    border?: boolean;
    variant?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({className, childrenStyle, active, variant, border = false, children, ...props}: ButtonProps) {
    return (
        <button {...props} className={cn(
            `w-max relative inline-block px-4 py-1 over ${poppins.className} antialiased group`,
            className,
            {
                '': !border,
                'before:bg-[#344D8033] before:-inset-[1px] before:absolute before:rounded-full': !active && border,
                'before:bg-gradient-to-r before:from-[#4A6BB3] before:to-[#4A7F3B] before:-inset-[1px] before:absolute before:rounded-full': border && variant === 'gradient',
                'before:-inset-[1px] before:bg-custom-gradient before:absolute before:rounded-full': active && border && variant === 'gradient',
                'before:bg-[#4987B0] before:-inset-[1px] before:absolute before:rounded-full': active && variant === 'blue',
                'before:bg-[#ABCF84] before:-inset-[1px] before:absolute before:rounded-full': active && variant === 'green',
                'before:bg-[#344D80] before:-inset-[1px] before:absolute before:rounded-full': active && variant === 'darkblue',
            }
        )}>
            <div className={cn(
                'absolute z-20 inset-[1px] rounded-full bg-none',
                {
                    "bg-gradient-to-r from-[#84A6EE] to-[#87EB6F] from-[7%] to-100% opacity-20": active && variant === 'gradient',
                    'bg-[#ECF8FF]': active && variant === 'blue',
                    'bg-[#EFFFE6]': active && variant === 'green',
                    'bg-[#EFF4FF]': active && variant === 'darkblue',
                },
                childrenStyle
                )}></div>
            <div className="absolute z-10 bg-white inset-[1px] rounded-full group-hover:inset-[3px] transition-all"></div>
            <span className={cn(
                "relative z-30 font-bold tracking-wider",
                {
                    ' bg-gradient-to-r from-[#4A6BB3] to-[#4A7F3B] bg-clip-text text-transparent font-light': border && variant=== 'gradient',
                    'text-blue-main': active && variant === 'blue',
                    'text-[#74AD55]': active && variant === 'green',
                    'text-[#344D80]': active && variant === 'darkblue',
                }
            )}>{children}</span>
        </button>
    )
}