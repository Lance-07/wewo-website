"use client";
import Button from "./ui/components/button";
import { Carousel } from "./ui/components/carousel";
import { cardItems, carouselItems, iconItems } from "@/lib/data";
import { Card, DynamicCard, HorizontalCard, SimpleCard } from "./ui/components/card";
import React from "react";
import Image from "next/image";
import { poppins } from "./ui/fonts";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function HomePage() {
    return (
        <main>
            <section className="relative w-full h-[778px] overflow-hidden flex">
                <Carousel carouselItems={carouselItems} />
            </section>

            <SecondSection />
            <AboutWEWO />
            <ThirdSection />
            <InfiniteCarousel />
            <FourthSection />
            <FAQs />
            <CTA />
        </main>
    )
}

//TODO: Animation
function SecondSection() { 
    const [activeIdx, setActiveIdx] = React.useState(0);

    return (
        <section className="relative w-full h-[607px]">
            {/* Overlay Color Gradient */}
            <div className="absolute h-full w-full inset-0 bg-[linear-gradient(to_right,_#344D80_0%,_#53BAC6_31%,_#7CBA5A_68%,_#4A803D_100%)]"></div>

            {/* Dark Effect Overlay Gradient */}
            <div className="w-full h-full opacity-25 absolute inset-0 pointer-events-none bg-gradient-to-b from-black from-0%"></div>

            {/* White Effect Overlay Gradient */}
            <div className="absolute h-full w-full inset-0 bg-gradient-to-b from-transparent to-white from-[27%] to-[72%]"></div>

            {/* Content */}
            <div className="relative w-full text-white container mx-auto">
                <div className="flex justify-center items-center h-full">
                    <div className="relative bg-white gap-[50px] h-[519px] rounded-t-[34px] flex container mx-auto items-center px-20">
                        <div className="w-1/3 flex flex-col text-[#4668B2]">
                            <h1 className="text-5xl font-bold tracking-widest mb-4">
                                <span className="text-[#4668B2]">WE</span>
                                <span className="text-[#7CBA5A]">WO</span>
                            </h1>
                            <h2>First Portable RVM: Transforming Plastic Waste into Clean Water for Non-Potable Use</h2>

                            <div className="flex-1 flex flex-col gap-3 mt-6">

                                <Button onClick={() => setActiveIdx(0)} active={activeIdx === 0} childrenStyle="bg-gradient-to-r from-[#84A6EE] to-[#87EB6F] from-[7%] to-100%" variant="gradient">
                                    {activeIdx === 0 &&
                                    <>
                                        <span className="text-[#4668B2]">Key </span>
                                        <span className="text-[#7CBA5A]">Impact</span>
                                    
                                    </> 
                                    }
                                    {activeIdx !== 0 &&
                                    <>
                                        Key Impact
                                    </> 
                                    }
                                </Button>

                                <Button onClick={() => setActiveIdx(1)} childrenStyle="bg-[#ECF8FF]" active={activeIdx === 1} variant="blue">
                                    <span>Water Distributed</span>
                                </Button>

                                <Button onClick={() => setActiveIdx(2)} childrenStyle="bg-[#ECF8FF]" active={activeIdx === 2} variant="green">
                                    <span>PET Bottles Recycled</span>
                                </Button>

                                <Button onClick={() => setActiveIdx(3)} childrenStyle="bg-[#ECF8FF]" active={activeIdx === 3} variant="darkblue">
                                    <span>CO2 Reduced</span>
                                </Button>

                            </div>
                        </div>

                        <div className="flex-1">
                            { activeIdx === 0 && 
                                <div className="flex w-full gap-5 justify-center">
                                    <SimpleCard 
                                        number="23" label="liters" iconLink="/icons/droplet.png"
                                        className="bg-blue-second text-blue-second border-2 border-blue-second"
                                        title="clean water distributed"  
                                        description="Like filling thousands of water bottles, ensuring access to life’s most vital resource." />
                                    <SimpleCard  
                                        number="70" label="plastics" iconLink="/icons/plastic-bottle.png"
                                        className="bg-green-second text-green-second border-2 border-green-second"
                                        title="PET bottles recycled"  
                                        description="Like filling thousands of water bottles, ensuring access to life’s most vital resource."  />
                                    <SimpleCard  
                                        number="3" label="kilograms" iconLink="/icons/carbon-footprint.png"
                                        className="bg-blue-main text-blue-main border-2 border-blue-main"
                                        title="carbon footprints reduced"  
                                        description="Like filling thousands of water bottles, ensuring access to life’s most vital resource."/>
                                </div>
                            }

                            { activeIdx === 1 && 
                                <HorizontalCard 
                                    imgSrc="/illustrations/splash.png" 
                                    baseColor="blue" 
                                    title="clean water distributed"     
                                    description="Accommodating 1,000 liters of clean water is like filling a community reservoir, ensuring vital access for all."
                                    iconItems={iconItems['clean-water']}
                                />
                            }
                            { activeIdx === 2 && 
                                <HorizontalCard 
                                    imgSrc="/illustrations/plastic-bottle.png" 
                                    baseColor="green" 
                                    title="recycled plastic bottles"     
                                    description="Recycling 1,000 bottles may seem small, but it’s like clearing a mountain of waste—every bottle counts toward a greener planet."
                                    iconItems={iconItems['recycled-plastic']}
                                />
                            }
                            { activeIdx === 3 && 
                                <HorizontalCard 
                                    imgSrc="/illustrations/carbon-footprint.png" 
                                    baseColor="darkBlue" 
                                    title="reduced carbon footprint on earth"     
                                    description="Cutting 1,000 kilograms of emissions is like removing 5 cars from the road for a year, helping clean the air and promote a greener future."
                                    iconItems={iconItems['reduced-carbon']}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function AboutWEWO() {
    return (
        <section className="bg-white h-[675px] flex justify-center items-center container mx-auto">
            <div className="flex items-center gap-10 ">
                <div className="w-2/3 h-[429px] rounded-[34px] overflow-hidden shadow-[0_4px_4px_rgba(0,_0,_0,_25%)]">
                    <Image src={'/illustrations/splash.png'} width={700} height={430} alt="about us" className="w-full h-full object-contain" />
                </div>
                <div className="overflow-hidden relative w-1/3 rounded-r-[34px] h-[475px] pr-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#486BB3] via-[#53BAC6] to-green-third from-15% via-60% to-95% opacity-25"></div>

                    <div className="absolute w-full h-full inset-0 bg-gradient-to-r from-white from-15% to-85%"></div>
                    {/* <div className="absolute inset-0 from-transparent to-white from-15% to-85%"></div> */}

                    <div className="relative flex flex-col justify-center h-full gap-3">
                        <h2 className="text-2xl font-bold text-blue-main">WEWO for Everyone</h2>
                        <h1 className="text-4xl font-bold">
                            <span className="text-blue-main">Achieve </span>
                            <span className="text-green-third">Absolute Conservation</span>
                        </h1>
                        <div className="text-blue-main space-y-[10px]">
                            <p>
                                <strong className="font-bold tracking-wider">WEWO is a smart solution</strong> to two major problems—plastic waste and water scarcity. By recycling plastic bottles, we transform rainwater into clean, usable water, making a positive impact on our planet and communities in need
                            </p>
                            <p>
                                Our mission is <strong className="font-bold tracking-wider">to inspire a culture of sustainability</strong> by turning waste into opportunity, water into access, and technology into action. Explore the page to discover how WEWO is creating a cleaner, greener future and how 
                                <span>you can be part of this change</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ThirdSection() {
    return (
        <section className="bg-stone-50 h-[635px]">
            <div className="flex h-full flex-col justify-center items-center container mx-auto gap-10">
                <h1 className="text-blue-main text-[2.5rem] leading-[38.4px] font-bold">Turning Waste into Clean Water</h1>
                <div className="flex gap-6">
                    <DynamicCard 
                        imgSrc="/illustrations/collect-plastic.png"
                        title="collect plastic"
                        description="Deposit plastic bottles into the Reverse Vending Machine (RVM) to start the recycling process."
                        baseColor="blue"
                    />
                    <DynamicCard 
                        imgSrc="/illustrations/filter-water.png"
                        title="filter water"
                        description="Rainwater is purified through natural filtration and UV sterilization, ensuring clean, non-potable water."
                        baseColor="green"
                    />
                    <DynamicCard 
                        imgSrc="/illustrations/dispense-water.png"
                        title="dispense water"
                        description="Receive clean water in exchange for your recycled bottles, rewarding sustainability."
                        baseColor="darkBlue"
                    />
                </div>
            </div>
        </section>
    )
}

function InfiniteCarousel() {
    const arrWords: string[] = ["Recycle", 'Repeat', 'Collect', 'Filter', 'Store', 'Dispense', "Recycle", 'Repeat', 'Collect', 'Filter', 'Store', 'Dispense']
    return (
        <div className="h-[175px] bg-custom-gradient overflow-hidden">
            <div className="flex items-center w-[calc(350px_*_12)] text-[2.5rem] tracking-wider h-full text-center text-white font-medium animate-infinite-scroll">
                {arrWords.map((word, idx) => 
                    <div key={idx} className="w-[350px]">{word}</div>
                )}
            </div>
        </div>
    )
}

function FourthSection() {
    return (
        <section className="h-[667px] flex">
            <div className="w-1/3 h-full flex relative justify-center items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#344D80] to-[#2C4D24]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#344D80] via-[#4769AF] to-[#53BAC5]"></div>

                <div className="relative text-white w-[80%] flex flex-col justify-evenly h-full">
                    <div className="space-y-6">
                        <h1 className="font-bold text-[2.5rem]">Why WEWO Matters</h1>
                        <h2 className={`font-light ${poppins.className}`}>WEWO transforms plastic waste into clean water, reducing pollution, helping communities, and promoting a greener, sustainable future.</h2>
                        {/* TODO: Add icon */}
                        <Button>
                            <span className="text-blue-500">
                                Connect With Us
                            </span>
                        </Button>

                    </div>

                    <div className="flex justify-end">
                        <ChevronLeft size={64} />
                        <ChevronRight size={64} />
                    </div>
                </div>
            </div>

            <div className="w-2/3 h-full flex relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#93E16E] via-[#7BBA5D] to-[#447538] via-55%"></div>

                <div className="flex px-10 relative w-full h-full items-center gap-10 overflow-hidden">
                    <div className="flex gap-10 w-[calc(328px_*_5)]">
                        {cardItems.map((card, idx) => (
                            <Card key={idx} imgSrc={card.image} title={card.title} description={card.description} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function FAQs() {
    return (
        <section className="bg-white h-[625px] flex w-full justify-center items-center">
            <div className="w-full flex flex-col">
                <h1>Frequently Asked Questions</h1>
                <div>

                </div>
            </div>
        </section>
    )
}

function CTA() {
    return (
        <section className="h-[536px] w-full relative">
            <div className="absolute h-full w-full inset-0 bg-[linear-gradient(to_right,_#344D80_0%,_#53BAC6_31%,_#7CBA5A_68%,_#4A803D_100%)]"></div>

            {/* Dark Effect Overlay Gradient */}
            <div className="w-full h-full opacity-25 absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black"></div>

            {/* White Effect Overlay Gradient */}
            <div className="absolute h-full w-full inset-0 bg-gradient-to-t from-transparent to-white from-[27%] to-[72%]"></div>

            
        </section>
    )
}