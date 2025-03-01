"use client";
import Button from "@/app/ui/components/button";
import { Carousel } from "@/app/ui/components/carousel";
import {cardItems, carouselItems, faqItems, iconItems} from "@/lib/data";
import { Card, DynamicCard, HorizontalCard, SimpleCard } from "@/app/ui/components/card";
import React, { ReactNode } from "react";
import Image from "next/image";
import { poppins } from "@/app/ui/fonts";
import {ChevronLeft, ChevronRight, Facebook, Mail} from "lucide-react";
import clsx from "clsx";
import {Accordion, AccordionItem} from "@/app/ui/components/accordion";
import Link from "next/link";
import { InView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import Navbar from "@/app/ui/components/navbar";
import Footer from "@/app/ui/components/footer";


export default function LandingPage() {

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <section id="home" className="relative w-full h-[778px] overflow-hidden flex">
                    <Carousel carouselItems={carouselItems} />
                </section>

                
                <Impact />
                <About />
                <HowItWorks />
                <InfiniteCarousel />
                <Importance />  
                <FAQs />
                <CTA />
                <Footer />
            </main>
        </>
    )
}

function Impact() {
    const [activeIdx, setActiveIdx] = React.useState(0);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        if (window.innerWidth > 1450) {
            setIsMobile(false);
        } else {
            setIsMobile(true);
        }

        const updateMedia = () => {
        if (window.innerWidth > 1450) {
            setIsMobile(false);
        } else {
            setIsMobile(true);
        }
        };
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, []);

    return (
        <InView as={'section'} rootMargin="-50%" threshold={0} triggerOnce={true} onChange={(inView) => console.log('inview', inView)} >
            {({ inView, ref }) => (
                <section ref={ref} id={'impacts'} className="flex justify-center items-center relative w-full lg:h-[607px] py-20 lg:py-0 ~px-6/20">
                    {/* Overlay Color Gradient */}
                    <div className="absolute h-full w-full inset-0 bg-[linear-gradient(to_right,_#344D80_0%,_#53BAC6_31%,_#7CBA5A_68%,_#4A803D_100%)]"></div>

                    {/* Dark Effect Overlay Gradient */}
                    <div className="w-full h-full opacity-25 absolute inset-0 pointer-events-none bg-gradient-to-b from-black from-0%"></div>

                    {/* White Effect Overlay Gradient */}
                    <div className="absolute h-full w-full inset-0 bg-gradient-to-b from-transparent to-white from-[27%] to-[72%]"></div>

                    {/* Content */}
                    <div className={cn(`relative transition-all translate-y-full duration-1000 opacity-0 w-full text-white mx-auto`,
                        { 'opacity-100 -translate-y-0': inView}
                    )}>
                        <div className="flex justify-center items-center h-full">
                            <div className="relative bg-white lg:h-[519px] gap-[50px] rounded-t-[34px] flex flex-col justify-center container mx-auto items-center ~px-4/20 ~py-4/12">
                                <div className="flex w-full relative gap-[50px] h-full flex-col lg:flex-row justify-between ">
                                    <div className="w-full h-full border-red-500 lg:w-1/3 flex flex-col text-[#4668B2]">
                                        <h1 className="text-5xl font-bold tracking-widest mb-4">
                                            <span className="text-[#4668B2]">WE</span>
                                            <span className="text-[#7CBA5A]">WO</span>
                                        </h1>
                                        <h2>First Portable RVM: Transforming Plastic Waste into Clean Water for Non-Potable Use</h2>

                                        <div className="flex lg:flex-col gap-3 mt-6 py-2 px-[1px] text-nowrap overflow-x-auto">

                                            <Button onClick={() => setActiveIdx(0)} background={true} border={true} active={activeIdx === 0} variant="gradient">
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

                                            <Button onClick={() => setActiveIdx(1)} background={true} border={true} active={activeIdx === 1} variant="blue">
                                                Water Distributed
                                            </Button>

                                            <Button onClick={() => setActiveIdx(2)} background={true} border={true} active={activeIdx === 2} variant="green">
                                                PET Bottles Recycled
                                            </Button>

                                            <Button onClick={() => setActiveIdx(3)} background={true} border={true} active={activeIdx === 3} variant="darkblue">
                                                CO2 Reduced
                                            </Button>

                                        </div>
                                    </div>

                                    {/* <AnimatedSections activeIdx={activeIdx}>
                                        <div className="flex flex-col items-center h-full lg:flex-row w-full gap-5 justify-center">
                                            <SimpleCard 
                                                number="23" label="liters" iconLink="/icons/droplet.png"
                                                className="flex-row w-full h-[90px] max-w-[301px] lg:h-[301px] lg:flex-col bg-blue-second text-blue-second border-2 border-blue-second"
                                                title="clean water distributed"  
                                                description={isMobile ? "" : "Like filling thousands of water bottles, ensuring access to life’s most vital resource."} />
                                            <SimpleCard  
                                                number="70" label="plastics" iconLink="/icons/plastic-bottle.png"
                                                className="flex-row w-full h-[90px] max-w-[301px] lg:h-[301px] lg:flex-col bg-green-second text-green-second border-2 border-green-second"
                                                title="PET bottles recycled"  
                                                description={isMobile ? "" : "Like filling thousands of water bottles, ensuring access to life’s most vital resource."}  />
                                            <SimpleCard  
                                                number="3" label="kilograms" iconLink="/icons/carbon-footprint.png"
                                                className="flex-row w-full h-[90px] max-w-[301px] lg:h-[301px] lg:flex-col bg-blue-main text-blue-main border-2 border-blue-main"
                                                title="carbon footprints reduced"  
                                                description={isMobile ? "" : "Like filling thousands of water bottles, ensuring access to life’s most vital resource."} />
                                        </div>  
                                        <HorizontalCard 
                                            imgSrc="/illustrations/splash.png" 
                                            baseColor="blue" 
                                            title="clean water distributed"     
                                            description="Accommodating 1,000 liters of clean water is like filling a community reservoir, ensuring vital access for all."
                                            iconItems={iconItems['clean-water']}
                                            className="h-full"
                                        />
                                        <HorizontalCard 
                                            imgSrc="/illustrations/plastic-bottle.png" 
                                            baseColor="green" 
                                            title="recycled plastic bottles"     
                                            description="Recycling 1,000 bottles may seem small, but it’s like clearing a mountain of waste—every bottle counts toward a greener planet."
                                            iconItems={iconItems['recycled-plastic']}
                                            className="h-full"
                                        />
                                        <HorizontalCard 
                                            imgSrc="/illustrations/carbon-footprint.png" 
                                            baseColor="darkBlue" 
                                            title="reduced carbon footprint on earth"     
                                            description="Cutting 1,000 kilograms of emissions is like removing 5 cars from the road for a year, helping clean the air and promote a greener future."
                                            iconItems={iconItems['reduced-carbon']}
                                            className="h-full"
                                        />
                                    </AnimatedSections> */}

                                    <div className="flex-1 relative border-blue-500">
                                        { activeIdx === 0 && 
                                            <div className="flex flex-col items-center lg:flex-row w-full gap-5 justify-center">
                                                <SimpleCard 
                                                    number="23" label="liters" iconLink="/icons/droplet.png"
                                                    className="flex-row w-full h-[90px] max-w-[301px] lg:h-[301px] lg:flex-col bg-blue-second text-blue-second border-2 border-blue-second"
                                                    title="clean water distributed"  
                                                    description={isMobile ? "" : "Like filling thousands of water bottles, ensuring access to life’s most vital resource."} />
                                                <SimpleCard  
                                                    number="70" label="plastics" iconLink="/icons/plastic-bottle.png"
                                                    className="flex-row w-full h-[90px] max-w-[301px] lg:h-[301px] lg:flex-col bg-green-second text-green-second border-2 border-green-second"
                                                    title="PET bottles recycled"  
                                                    description={isMobile ? "" : "Like filling thousands of water bottles, ensuring access to life’s most vital resource."}  />
                                                <SimpleCard  
                                                    number="3" label="kilograms" iconLink="/icons/carbon-footprint.png"
                                                    className="flex-row w-full h-[90px] max-w-[301px] lg:h-[301px] lg:flex-col bg-blue-main text-blue-main border-2 border-blue-main"
                                                    title="carbon footprints reduced"  
                                                    description={isMobile ? "" : "Like filling thousands of water bottles, ensuring access to life’s most vital resource."} />
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

                                <Button active={true} border={true} variant="gradient">
                                    <Link href={'/articles'}>Read More &gt;</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </InView>
    )
}

function About() {

    return (
        <InView as={'section'} rootMargin="-50%" threshold={0} triggerOnce={true}>
            {({ inView, ref }) => (
                <section ref={ref} id={'about'} className="overflow-hidden bg-white lg:h-[675px] w-full py-20 lg:py-0 flex justify-center items-center">
                    <div className="flex flex-col lg:flex-row items-center gap-10 container ~px-6/20 mx-auto">
                        <div className={cn(`w-full lg:w-1/2 order-2 lg:order-1 lg:h-[429px] -translate-x-full opacity-0 rounded-[34px] overflow-hidden shadow-[0_4px_4px_rgba(0,_0,_0,_25%)] transition-all duration-1000 ease-in-out`,
                            { 'translate-x-0 opacity-100' : inView }
                        )}>
                            <Image src={'/images/synergy.png'} width={700} height={430} alt="about us" className="w-full h-full object-cover" />
                        </div>
                        <div className={cn(`overflow-hidden order-1 lg:order-2 translate-x-full opacity-0 transition-all duration-1000 relative w-full lg:w-1/2 rounded-r-[34px] lg:py-4 lg:h-[475px] lg:pr-8`,
                            { 'translate-x-0 opacity-100' : inView}
                        )}>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#486BB3] via-[#53BAC6] to-green-third from-15% via-60% to-95% opacity-25 hidden lg:block"></div>

                            <div className="absolute w-full h-full inset-0 bg-gradient-to-r from-white from-15% to-85% hidden lg:block"></div>
                            {/* <div className="absolute inset-0 from-transparent to-white from-15% to-85%"></div> */}

                            <div className="relative lg:pl-3 flex flex-col justify-center h-full gap-3">
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
                                        <span>you can be part of this change.</span>
                                    </p>
                                </div>
                                <Button type="button" href={'#cta'} className={'px-4 hidden lg:block'} active={true} border={true} variant={'gradient'}>Connect With Us &gt;</Button>
                            </div>
                        </div>
                        <Button type="button" href={'#cta'} className={'px-4 self-center order-3 lg:hidden'} active={true} border={true} variant={'gradient'}>Connect With Us &gt;</Button>
                    </div>
                </section>
            )}
        </InView>
    )
}

function HowItWorks() {
    return (
        <section id={'how-it-works'} className="bg-stone-50 py-20 md:py-0 md:h-[635px]">
            <div className="flex h-full flex-col justify-center items-center ~px-6/20 container mx-auto gap-10">
                <h1 className="text-blue-main text-[2.5rem] leading-[38.4px] font-bold">Turning Waste into <span className="text-green-third">Clean Water</span></h1>
                <div className="flex gap-6 flex-col md:flex-row">
                    <DynamicCard 
                        className="w-full"
                        imgSrc="/illustrations/collect-plastic.png"
                        title="collect plastic"
                        description="Deposit plastic bottles into the Reverse Vending Machine (RVM) to start the recycling process."
                        baseColor="blue"
                    />
                    <DynamicCard 
                        className="w-full"
                        imgSrc="/illustrations/filter-water.png"
                        title="filter water"
                        description="Rainwater is purified through natural filtration and UV sterilization, ensuring clean, non-potable water."
                        baseColor="green"
                    />
                    <DynamicCard 
                        className="w-full"
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
    const arrWords: string[] = ["Recycle", 'Repeat', 'Collect', 'Filter', 'Store', 'Dispense', "Recycle", 'Repeat', 'Collect', 'Filter', 'Store', 'Dispense', "Recycle", 'Repeat', 'Collect', 'Filter', 'Store', 'Dispense']
    return (
        <div className="~h-14/24 bg-custom-gradient overflow-hidden">
            <div className="flex items-center w-[calc(350px_*_12)] text-[1.5rem] tracking-wider h-full text-center text-white font-medium animate-infinite-scroll">
                {arrWords.map((word, idx) => 
                    <div key={idx} className="w-[350px]">{word}</div>
                )}
            </div>
        </div>
    )
}

function Importance() {
    const [position, setPosition] = React.useState(0);
    const [distance, setDistance] = React.useState(0)

    const handleLeft = () => {
        if (position === 0) return;
        setDistance(distance - 328);
        setPosition(position - 1);
    }

    const handleRight = () => {
        if (position === cardItems.length - 2) return;
        setDistance(distance + 328);
        setPosition(position + 1);
    }

    return (
        <section id={'importance'} className="md:h-[667px] flex flex-col md:flex-row">
            <div className="w-full py-4 md:py-0 md:w-1/3 h-full flex relative justify-center items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#344D80] to-[#2C4D24]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#344D80] via-[#4769AF] to-[#53BAC5]"></div>

                <div className="relative text-white w-[80%] flex flex-col justify-evenly h-full">
                    <div className="space-y-6">
                        <h1 className="font-bold text-[2.5rem]">Why WEWO Matters</h1>
                        <h2 className={`font-light ${poppins.className}`}>WEWO transforms plastic waste into clean water, reducing pollution, helping communities, and promoting a greener, sustainable future.</h2>
                        {/* TODO: Add icon */}
                        <Button type="button" href={'#cta'} active={true} border={true} variant="gradient">
                                Connect With Us &gt;
                        </Button>

                    </div>

                    <div className="justify-end hidden md:flex">
                        <button onClick={handleLeft} className={clsx(
                            {
                                'opacity-50': position === 0
                            }
                        )}>
                            <ChevronLeft size={64} />
                        </button>
                        <button onClick={handleRight} className={clsx(
                            {
                                'opacity-50': position === cardItems.length - 2
                            }
                        )}>
                            <ChevronRight size={64} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full py-10 md:py-0 md:w-2/3 h-full flex relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#93E16E] via-[#7BBA5D] to-[#447538] via-55%"></div>

                <div className="flex ~px-4/10 relative w-full md:h-full items-center overflow-x-auto md:overflow-hidden">
                    <div  className="flex ~gap-4/10 md:w-[calc(328px_*_5)] transition-all duration-300"
                        style={{ transform: `translateX(calc(-${distance}px - ${position * 10}px))` }}>
                        {cardItems.map((card, idx) => (
                            <Card className="min-w-[301px]" key={idx} imgSrc={card.image} title={card.title} description={card.description} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function FAQs() {
    return (
        <section id={'faqs'} className="bg-white md:h-[690px] py-20 md:py-0 flex w-full justify-center items-center">
            <div className="flex flex-col items-center md:h-[425px] w-11/12">
                <h1 className="font-bold text-4xl mb-10">
                    <span className="text-blue-main">Frequently </span>
                    <span className="text-green-third">Asked Questions</span>
                </h1>

                <div className={`md:w-[600px] ${poppins.className}`}>
                    <Accordion className={'flex flex-col gap-4 text-blue-main'}>
                        {faqItems.map((faqItem, idx: number) => (
                            <AccordionItem value={(idx + 1).toString()} trigger={faqItem.header} key={idx}>
                                {faqItem.content}
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}

function CTA() {
    const [isReady, setIsReady] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

        const res = await fetch("/api/send-message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        if (res.ok) {
            alert('Message sent successfully!')
            setMessage("");
        } else {
            alert('Failed to send message. Try again.');
            setMessage("")
        }
        setLoading(false)
    };

    console.log(isReady);
    return (
        <section id="cta" className="md:h-[586px] py-20 md:py-0 w-full relative">
            <div className="absolute h-full w-full inset-0 bg-[linear-gradient(to_right,_#344D80_0%,_#53BAC6_31%,_#7CBA5A_68%,_#4A803D_100%)]"></div>
            {/* Dark Effect Overlay Gradient */}
            <div className="w-full h-full opacity-25 absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black"></div>
            {/* White Effect Overlay Gradient */}
            <div className="absolute h-full w-full inset-0 bg-gradient-to-t from-transparent to-white from-[27%] to-[72%]"></div>

            <div className={'container ~px-6/20 mx-auto h-full flex items-center'}>
                <div className={'bg-white relative w-full h-[436px] rounded-[34px] overflow-y-hidden flex justify-center items-center text-blue-main'}>
                    <div className={clsx('max-w-xl w-11/12 md:w-1/2 text-center space-y-8 transition-all duration-500 ease-in-out',
                        {
                            'opacity-0 -translate-y-full' : isReady
                        }
                    )}>
                        <h1 className={'font-bold text-4xl'}>
                            <span className="text-blue-main">Ready to </span>
                            <span className="text-green-third">Take An Action?</span>
                        </h1>
                        <h2>In just a few steps, you&#39;ll discover how <span className={'text-green-third font-bold'}>WEWO</span> transforms
                            waste into clean water, making sustainability effortless.</h2>
                        <Button
                            onClick={() => setIsReady(!isReady)}
                            className={'px-6 py-4'}
                            childrenStyle={"bg-gradient-to-r from-[#4A6BB3] to-[#4A7F3B]"}>
                            { loading ? 'Sending...' :
                                <span className={'text-white flex'}>
                                    Message Us
                                    <span><ChevronRight /></span>
                                </span>
                            }
                        </Button>
                    </div>

                    <form onSubmit={sendMessage} className={cn('max-w-xl w-11/12 md:w-1/2 text-center space-y-8 absolute opacity-0 translate-y-full transition-all duration-500 ease-in-out',
                        {
                            'opacity-100 -translate-y-0': isReady
                        }
                    )}>
                        <h1 className={'font-bold text-4xl tracking-wider'}>
                            <span className="text-blue-main">Let&#39;s Make </span>
                            <span className="text-green-third">A Difference!</span>
                        </h1>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={'block resize-none focus:outline-none w-full rounded-xl bg-stone-50 shadow-[0_4px_4px_rgba(0,_0,_0,_10%)] h-[122px] p-[10px] text-sm placeholder:text-[rgba(70,_104,_178,_60%)]'}
                            placeholder={'Tell us how you\'d like to get involved or ask us anything!'}>

                        </textarea>
                        <Button disabled={loading} type="submit" className={'px-6 py-4'} active={false} variant={'no-border'}
                                childrenStyle={"bg-gradient-to-r from-[#4A6BB3] to-[#4A7F3B]"}>
                            <span className={'text-white flex'}>
                                { loading ? 'Sending...' : ('Send Message')}
                                <span><ChevronRight/></span>
                            </span>
                        </Button>
                    </form>

                </div>
            </div>
        </section>
    )
}

// export function AnimatedSections({ activeIdx, children }: { activeIdx: number; children: ReactNode }) {
//     return (
//         <div className="flex-1 box h-full overflow-hidden  relative">
//             <div className="relative h-full w-full">
//                 <div
//                     className="absolute w-full flex flex-col justify-evenly gap-6 transition-transform duration-500"
//                     style={{ transform: `translateY(-${activeIdx * 345}px)` }}
//                 >
//                     {children}
//                 </div>
//             </div>
//         </div>
//     );
// }