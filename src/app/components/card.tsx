import React from "react";
import Image from "next/image";


type CardProps = {
    number: string;
    label: string;
    iconLink: string
    title: string;
    description: string;
    baseColor: string;
}

export default function Card({number, label, iconLink, title, description, baseColor} : CardProps) {
    return (
        <div className="shadow-card-shadow flex flex-col justify-center items-center rounded-2xl overflow-hidden w-[235px] h-[301px]">
            <div className="bg-[#FAFAFB] flex justify-center items-center h-full w-full">
                <p className="font-extrabold text-[5rem]" style={{ color: `${baseColor}`}}>{number}</p>
                <p className="vertical-rl rotate-180" style={{ color: `${baseColor}`}}>{label}</p>
            </div>
            <div className={`text-white flex flex-col justify-center items-center text-center h-full px-5 text-xs`}
                style={{ backgroundColor: `${baseColor}` }}>
                <Image src={`/${iconLink}`} alt={`icon ${iconLink}`} width={19} height={19} className="mb-2" />
                <p className="font-semibold tracking-wider capitalize text-wrap mb-1">{title}</p>
                <p className="font-light">{description}</p>
            </div>
        </div>
    )
}