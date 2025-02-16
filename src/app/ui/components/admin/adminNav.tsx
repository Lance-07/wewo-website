import Image from "next/image";
import React from "react";

export default function adminNav() {

  return (
   <nav className="bg-[#4668B2] p-2 md:p-4 lg:p-6 fixed top-0 w-full z-50 border-b-4 border-[#7CBA5A]">
      <div className="flex justify-between items-center relative">
          <div className="flex-1 flex justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <Image src="/icon2.png" width={140} height={50} alt="logo" />
          </div>
          <button id="menu-btn" className="text-white focus:outline-none ml-auto">
              <i className="bi bi-three-dots-vertical"></i>
          </button>
      </div>
   </nav>
  )
}