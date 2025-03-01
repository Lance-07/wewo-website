'use client';

import clsx from "clsx";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" 

import { handleLogout } from "@/app/auth/logout";
export default function adminNav() {

  const [menu, setMenu] = useState(false)

  return (
   <nav className="bg-[#4668B2] p-2 md:p-3 lg:p-4 fixed top-0 w-full z-50 border-b-4 border-[#7CBA5A]">
      <div className="flex justify-between items-center relative">
          <div className="flex-1 flex items-center gap-2 justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <Image src="/icons/logo2.png" width={50} height={50} alt="logo" />
            <h1 className="text-white text-3xl font-bold">WEWO</h1>
          </div>
          <div className="relative ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="outline"><EllipsisVertical/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
               <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
           </DropdownMenuGroup>
           <DropdownMenuSeparator />
             <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
             <DropdownMenuItem onSelect={() => handleLogout()}>
             Log out
             <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
           </DropdownMenuContent>
         </DropdownMenu>

          </div>
      </div>
   </nav>
  )
}