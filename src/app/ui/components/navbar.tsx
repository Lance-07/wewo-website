'use client';

import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import {poppins} from "@/app/ui/fonts";
import { Menu, MoveRight, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navList: {name: string, link: string}[] = [
  {
    name: 'Impacts',
    link: '#impacts'
  },
  {
    name: 'About',
    link: '#about'
  },
  {
    name: 'How It Works',
    link: '#how-it-works'
  },
  {
    name: 'Importance',
    link: '#importance'
  },
  {
    name: 'FAQs',
    link: '#faqs'
  }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="bg-white flex box- justify-center fixed top-0 w-full z-50 h-[60px] shadow-[0_4px_4px_rgba(0_,0_,0_,15%)]">
        <div className="border-blue-500 container px-4 mx-auto flex md:justify-between items-center">
          <div className="flex shrink-0 gap-4 items-center justify-center mr-auto md:mx-0 h-full">
            <Link href={'/'}>
              <Image src="/icons/logo.png" width={140} height={50} alt="logo" />
            </Link>
          </div>

          <ul className={'hidden md:flex h-full items-center'}>
            {navList.map((navItem, index) => (
              <Link key={index}
                    href={navItem.link}
                    className={`${poppins.className} h-full text-[rgba(70_,104_,178_,80%)] hover:font-semibold hover:text-[rgba(70_,104_,178_,100%)] tracking-wider`}>
                <li className="relative h-full flex items-center ~px-2/4 w-max
                    before:absolute before:w-1 before:h-1 before:bg-blue-main before:bottom-0 before:left-0 before:opacity-0 before:rounded-full
                    before:hover:w-full before:hover:opacity-100 before:transition-all before:duration-300">
                  {navItem.name}
                </li>
              </Link>
            ))}
          </ul>

          <button className="block md:hidden ml-4 order-2" onClick={() => setIsOpen(!isOpen)}>
            <Menu />
          </button>

          <Button className={'shrink-0 hidden sm:block'} border={true} variant={'gradient'}>Connect With Us</Button>
        </div>

        <div role="dialog" className={cn(`p-4 fixed text-white flex flex-col w-dvw h-dvh md:hidden translate-x-full transition-transform bg-slate-800 inset-0 z-50`,
          {
            'translate-x-0' : isOpen,
          }
        )}>
          <button className="p-4 self-end" onClick={() => setIsOpen(!isOpen)}>
            <MoveRight size={32} />
          </button>

          <ul className="text-3xl gap-4 flex-1 flex flex-col justify-center items-center">
            {navList.map((item, idx) => (
              <li key={idx}>
                <Link href={item.link} onClick={() => setIsOpen(!isOpen)}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
            

    </>
  )
}