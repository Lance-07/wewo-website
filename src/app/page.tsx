import Image from "next/image";
import Button from "./ui/components/button";
import { Carousel } from "./ui/components/carousel";
import { carouselItems } from "@/lib/data";


export default function HomePage() {
    return (
        <main>
            <div className="relative w-full h-[778px] overflow-hidden flex">
                <Carousel carouselItems={carouselItems} />
            </div>
        </main>
    )
}

{/*TODO: Add Horizontal Card and Buttons */}
function SecondSection() { 
    return (
        <section className="relative w-full h-[607px]">
            {/* Overlay Color Gradient */}
            <div className="absolute h-full w-full inset-0 bg-[linear-gradient(to_right,_#344D80_0%,_#53BAC6_31%,_#7CBA5A_68%,_#4A803D_100%)]"></div>

            {/* Dark Effect Overlay Gradient */}
            <div className="w-full h-full opacity-25 absolute inset-0 pointer-events-none bg-gradient-to-b from-black from-0%"></div>

            {/* White Effect Overlay Gradient */}
            <div className="absolute h-full w-full inset-0 bg-gradient-to-b from-transparent to-white from-[27%] to-[72%]"></div>

            {/* Content */}
            <div className="absolute w-full inset-0 text-white container mx-auto">
                <div className="flex justify-center items-center h-full">
                    <div className="bg-white w-[80%] h-[519px] rounded-t-[34px] flex justify-center items-center">
                        <div className="w-1/3 flex flex-col text-[#4668B2]">
                            <h1 className="text-5xl font-bold tracking-widest">
                                <span className="text-[#4668B2]">WE</span>
                                <span className="text-[#7CBA5A]">WO</span>
                            </h1>
                            <h2>First Portable RVM: Transforming Plastic Waste into Clean Water for Non-Potable Use</h2>

                        </div>
                        <div className="flex-1"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}