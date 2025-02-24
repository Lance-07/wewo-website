'use client';

import clsx from "clsx";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function adminNav() {

  const [menu, setMenu] = useState(false)

  return (
   <nav className="bg-[#4668B2] p-2 md:p-4 lg:p-6 fixed top-0 w-full z-50 border-b-4 border-[#7CBA5A]">
      <div className="flex justify-between items-center relative">
          <div className="flex-1 flex items-center gap-2 justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <Image src="/icons/logo2.png" width={50} height={50} alt="logo" />
            <h1 className="text-white text-3xl font-bold">WEWO</h1>
          </div>
          <div className="relative ml-auto">
            <button onClick={() => setMenu(!menu)} id="menu-btn" className="text-white focus:outline-none">
              <EllipsisVertical />
            </button>
            <div className={clsx(`absolute flex-col justify-evenly items-center top-6 right-5 bg-white rounded-lg shadow-lg h-44 w-44`, 
              { 'flex' : menu, 'hidden' : !menu }
            )}>
              <h1>Hello @User!</h1>
              <ul className="flex flex-col divide-y">
                <li>Contact Us</li>
                <li>Log out</li>
              </ul>
            </div>
          </div>
      </div>
   </nav>
  )
}