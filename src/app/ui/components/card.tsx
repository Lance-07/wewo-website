import React, { useEffect } from "react";
import Image from "next/image";
import { ChevronRight, Info } from "lucide-react";
import { IconItem } from "@/lib/data";
import { poppins } from "../fonts";
import { cn } from "@/lib/utils";
import { supabase } from "../../../../supabase"


type SimpleCardProps = {
    number: string;
    label: string;
    iconLink: string
    title: string;
    description?: string;
    className: string;
}

type DynamicCardProps = {
    imgSrc: string;
    title: string;
    description: string;
    expandDescription: string;
    baseColor: BaseColor;
    className?: string;
}

interface HorizontalCardProps extends Omit<DynamicCardProps, 'expandDescription'> {
    /* imgSrc: string; 
    title: string; 
    description: string; 
    baseColor: BaseColor;
    */ 
    iconItems: IconItem[],
}

type CardProps = Omit<DynamicCardProps, 'baseColor' | 'expandDescription'>

type colorVariants = {
    blue: string;
    green: string;
    darkBlue: string;
}

type BaseColor = keyof colorVariants;

const getColorVariants = (type: string): colorVariants => ({
    blue: type === 'dynamic' ? ' hover:text-white text-[#4987B0]' : 'text-[#4987B0]',
    green: type === 'dynamic' ? ' hover:text-white text-[#7CBA5A]' : 'text-[#7CBA5A]',
    darkBlue: type === 'dynamic' ? ' hover:text-white text-[#4668B2]' : 'text-[#4668B2]',
});


const iconVariants: colorVariants = {
    blue: 'bg-[#4987B0]',
    green: 'bg-[#7CBA5A]',
    darkBlue: 'bg-[#4668B2]',
}


export function SimpleCard({number, label, iconLink, title, description, className} : SimpleCardProps) {
    return (
        <div className={cn(
            "shadow-card-shadow flex flex-col justify-center items-center rounded-2xl overflow-hidden w-[235px] h-[301px]", 
            className,
        )}>
            <div className="bg-[#FAFAFB] gap-2 flex justify-center items-center h-full w-1/2 sm:w-full">
                <p className="font-extrabold text-5xl sm:text-7xl">{number}</p>
                <p className="vertical-rl rotate-180 text-sm sm:text-base">{label}</p>
            </div>
            <div className={`text-white flex sm:flex-col gap-2 sm:gap-0 justify-center items-center text-center w-1/2 h-full sm:w-full px-5 text-xs`}>
                <Image src={iconLink} alt={`icon ${iconLink}`} width={19} height={19} className="mb-2 shrink-0" />
                <p className="font-semibold tracking-wider capitalize text-wrap mb-1">{title}</p>
                <p className="font-light">{description}</p>
            </div>
        </div>
    )
}

export function DynamicCard({imgSrc, title, description, expandDescription, baseColor, className} : DynamicCardProps) {
    const colorVariants = getColorVariants('dynamic');

    const hoverVariants: colorVariants = {
        blue: 'group-hover:bg-[#4987B0] group-hover:translate-x-0 group-hover:translate-y-0',
        green: 'group-hover:bg-[#7CBA5A] group-hover:translate-x-0 group-hover:translate-y-0',
        darkBlue: 'group-hover:bg-[#4668B2] group-hover:translate-x-0 group-hover:translate-y-0',
    }

    const buttonVariants: colorVariants = {
        blue: 'bg-[#4987B0] group-hover:opacity-0',
        green: 'bg-[#7CBA5A] group-hover:opacity-0',
        darkBlue: 'bg-[#4668B2] group-hover:opacity-0',
    }

    return (
        <div
        className={cn(`${colorVariants[baseColor]} md:max-w-[366px] h-[356px] overflow-hidden flex flex-col items-center rounded-2xl hover:rounded-b-2xl transition-all duration-300 ease-in-out group shadow-[-2px_2px_8px_rgba(0,_0,_0,_10%)]`,
            className
        )}>
            <Image
                src={imgSrc}
                width={1000}
                height={1000}
                alt={title}
                className="h-[136px] object-cover"
            />
            <div className="flex flex-col w-full flex-1 relative group">
                <div className={`${hoverVariants[baseColor]} absolute w-full h-full transform translate-x-[100%] translate-y-[100%] transition-all duration-300`}></div>
                    <div className="flex flex-col pt-5 px-5 w-full flex-1">
                        <p className="capitalize font-bold text-2xl mb-[10px]">{title}</p>
                        {/* Default Description (Fades out on hover) */}
                        <p className="text-sm font-light transition-opacity duration-300 group-hover:opacity-0">
                            {description}
                        </p>
                        {/* Expanded Description (Overlay effect) */}
                        <p className="text-sm font-light opacity-0 translate-y-2 absolute top-12 md:top-4 lg:top-12 left-5 right-5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                            {expandDescription}
                        </p>
                    </div>
                    <div className={`self-end rounded-tl-2xl p-4 pointer-events-none transition-all duration-200 text-white opacity-100 ${buttonVariants[baseColor]}`}>
                        {/* <ChevronRight size={32} /> */}
                        <Info size={24} />
                    </div>
                </div>
        </div>

    )
}

export function HorizontalCard({imgSrc, title, description, baseColor, iconItems} : HorizontalCardProps) {
    const colorVariants = getColorVariants('horizontal');

    return (
        <div className={`${poppins.className} h-full w-full antialiased flex ${colorVariants[baseColor]} gap-10 justify-center items-center`}>
            <Image src={imgSrc} priority width={2359} height={2000} alt={title}
                className="object-contain [flex-shrink:2] h-auto w-1/3 hidden md:block" />
            <div className="flex flex-col w-full lg:w-2/3 space-y-3">
                <p className="font-bold text-4xl uppercase">{title}</p>
                <p className="font-light">{description}</p>
                <ul className="space-y-2">
                    {iconItems.map((iconItem, index) => (
                        <li key={index} className="flex gap-3">
                            <div className={`${iconVariants[baseColor]} shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)] rounded w-8 h-8 flex justify-center items-center`}>
                                {iconItem.icon}
                            </div>
                            <span className="font-light capitalize">{iconItem.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export function Card({imgSrc, title, description, className}: CardProps) {
    return (
        <div className={cn(`rounded-3xl md:w-[328px] h-auto bg-[rgba(255,_255,_255,_51%)] p-2 border-8 border-[#2C4D24]`, className)}>
            <div className="rounded-[18px] overflow-hidden flex flex-col h-full bg-white">
                <div className="h-[167px] w-full">
                    <Image src={imgSrc} width={1000} height={1000} alt={title} className="w-full h-full object-cover" />
                </div>
                <div className={`${poppins.className} text-[#2C4D24] p-3 bg-white`}>
                    <h1 className="font-semibold mb-[10px]">{title}</h1>
                    <p className="text-sm">{description}</p>
                </div>
            </div>
        </div>
    )
}

export function AdminCard({number, label, iconLink, title, className} : Omit<SimpleCardProps, 'description' | 'className'> & {
    description ?: string;
    className ?: string;
}) {
    return (
        <div className={cn(
            "shadow-card-shadow flex flex-col justify-center items-center rounded-2xl overflow-hidden", 
            className,
        )}>
            <div className="bg-[#FAFAFB] flex justify-center items-center h-3/4 w-full">
                <p className="font-extrabold text-6xl mr-1">{number}</p>
                <p className="vertical-rl text-sm rotate-180">{label}</p>
            </div>
            <div className={cn(`
                text-white flex gap-2 py-4 justify-center items-center text-center h-1/4 px-5 text-xs`, 
                
            )}>
                <Image src={iconLink} alt={`icon ${iconLink}`} width={19} height={19} className="mb-2" />
                <p className=" tracking-wider capitalize text-wrap mb-1">{title}</p>
            </div>
        </div>
    )
}