"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import Button from "./button";
import { CarouselItem as CarouselItemData } from "@/lib/data";
import clsx from "clsx";

export const Carousel = ({ carouselItems }: { carouselItems: CarouselItemData[]}) => {

  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(interval);
  })

  return (
    <>
      {carouselItems.map((item, index) => (
        <CarouselItem title={item.title} description={item.description} image={item.image} key={index} isActive={index === activeIndex} />    
      ))}

      {/* Bottom Pagination */}
      <div className="absolute bottom-4 w-full h-4 flex justify-center z-20 ">
        <div className="flex w-36 h-full justify-center items-center gap-4">

          {/* Pagination Dots */}
          {carouselItems.length > 1 && Array.from({ length: carouselItems.length }).map((_, index) => (
            <div className={clsx("h-full w-4 bg-white rounded-full opacity-80         cursor-pointer transition-all duration-500 ease-in-out", 
              { "flex-1 opacity-100": activeIndex == index}
            )} 
              key={index} 
              onClick={() => setActiveIndex(index)}></div>
          ))}
          </div>
      </div>
    </>
  )
}

// TODO: Fix flickering issue when transitioning between slides
export const CarouselItem = ({
  title,
  description,
  image,
  isActive,
}: {
  title: string,
  description: string,
  image: string,
  isActive: boolean;
}) => {

  return (
    <>
        <div className={clsx("w-full h-full inset-0 absolute overflow-hidden transition-all duration-1000 ease-in-out [backface-visibility:hidden]",
          {
            "opacity-100 z-10 pointer-events-auto": isActive,
            "opacity-0 z-0 pointer-events-none": !isActive
          }
        )}>
          {/* Hero Image */}
          <Image src={image} width={1000} height={667} alt="hero" className="w-full h-full object-cover" />

          {/* Dark Effect Overlay Gradient */}
          <div className="w-full h-full absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black from-0% to-[84%]"></div>

          {/* Overlay Color Gradient */}
          <div className="w-full h-full absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,_#344D80_0%,_#53BAC6_31%,_#7CBA5A_68%,_#4A803D_100%)] opacity-75"></div>
          
          {/* Content */}
          <div className="absolute inset-0 text-white container mx-auto">
              <div className="flex flex-col justify-center items-start gap-4 w-1/2 h-full">
                <h1 className="text-6xl font-extrabold">{title}</h1>
                <h2 className="text-base w-4/5">{description}</h2>
                {/* <Button label="Learn More" /> */}
              </div>
          </div>

        </div>
    </>
  )
};
