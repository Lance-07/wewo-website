import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { IconItem } from "@/lib/data";


type SimpleCardProps = {
    number: string;
    label: string;
    iconLink: string
    title: string;
    description: string;
    baseColor: string;
}



type DynamicCardProps = {
    imgSrc: string;
    title: string;
    description: string;
    baseColor: BaseColor;
}

interface HorizontalCardProps extends DynamicCardProps {
    /* imgSrc: string; 
    title: string; 
    description: string; 
    baseColor: BaseColor;
    */ 
    iconItems: IconItem[],
}

type colorVariants = {
    blue: string;
    green: string;
    darkBlue: string;
}

type BaseColor = keyof colorVariants;

const getColorVariants = (type: string): colorVariants => ({
    blue: type === 'dynamic' ? 'hover:bg-[#4987B0] hover:text-white text-[#4987B0]' : 'text-[#4987B0]',
    green: type === 'dynamic' ? 'hover:bg-[#7CBA5A] hover:text-white text-[#7CBA5A]' : 'text-[#7CBA5A]',
    darkBlue: type === 'dynamic' ? 'hover:bg-[#4668B2] hover:text-white text-[#4668B2]' : 'text-[#4668B2]',
});

const buttonVariants: colorVariants = {
    blue: 'bg-[#4987B0] text-white group-hover:text-[#4987B0]',
    green: 'bg-[#7CBA5A] text-white group-hover:text-[#7CBA5A]',
    darkBlue: 'bg-[#4668B2] text-white group-hover:text-[#4668B2]',
}

const iconVariants: colorVariants = {
    blue: 'bg-[#4987B0]',
    green: 'bg-[#7CBA5A]',
    darkBlue: 'bg-[#4668B2]',
}


export function SimpleCard({number, label, iconLink, title, description, baseColor} : SimpleCardProps) {
    return (
        <div className="shadow-card-shadow flex flex-col justify-center items-center rounded-2xl overflow-hidden w-[235px] h-[301px]" style={{ color: `${baseColor}`}}>
            <div className="bg-[#FAFAFB] flex justify-center items-center h-full w-full">
                <p className="font-extrabold text-[5rem]">{number}</p>
                <p className="vertical-rl rotate-180">{label}</p>
            </div>
            <div className={`text-white flex flex-col justify-center items-center text-center h-full px-5 text-xs`}
                style={{ backgroundColor: baseColor }}>
                <Image src={`/${iconLink}`} alt={`icon ${iconLink}`} width={19} height={19} className="mb-2" />
                <p className="font-semibold tracking-wider capitalize text-wrap mb-1">{title}</p>
                <p className="font-light">{description}</p>
            </div>
        </div>
    )
}

export function DynamicCard({imgSrc, title, description, baseColor} : DynamicCardProps) {
    const colorVariants = getColorVariants('dynamic');

    return (
        <div className={`${colorVariants[baseColor]} max-w-[366px] max-h-[356px] overflow-hidden flex flex-col items-center rounded-2xl transition-all duration-300 ease-in-out group`}>
            <Image src={imgSrc} width={366} height={136} alt={title} className="h-[136px] object-cover" />
            <div className={`flex flex-col w-full flex-1`}>
                <div className="flex flex-col pt-5 px-5 w-full flex-1">
                    <p className="capitalize font-bold text-2xl">{title}</p>
                    <p className="text-sm font-light">{description}</p>
                </div>
                <button className={`self-end rounded-tl-2xl p-2 ${buttonVariants[baseColor]} transition-all duration-300 ease-in-out`}>
                    <ChevronRight size={32} />
                </button>
            </div>
        </div>
    )
}

export function HorizontalCard({imgSrc, title, description, baseColor, iconItems} : HorizontalCardProps) {
    const colorVariants = getColorVariants('horizontal');

    return (
        <div className={`flex ${colorVariants[baseColor]} gap-10 w-[745px]`}>
            <Image src={imgSrc} width={355} height={301} alt={title} className="object-contain min-w-[355px] min-h-[301px] w-1/2" />
            <div className="flex flex-col flex-1 w-1/2 space-y-3">
                <p className="font-bold text-4xl uppercase">{title}</p>
                <p className="font-light">{description}</p>
                <ul className="space-y-2">
                    {iconItems.map((iconItem, index) => (
                        <li key={index} className="flex gap-3">
                            <div className={`${iconVariants[baseColor]} rounded w-7 h-7 flex justify-center items-center`}>
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