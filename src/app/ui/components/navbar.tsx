'use client';

import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import {poppins} from "@/app/ui/fonts";
import { Menu, MoveRight} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navList: { name: string; link: string, id?: string }[] = [
  {
    name: "Impacts",
    link: "/",
    id: '#impacts'
  },
  {
    name: "About",
    link: "/",
    id: "#about"
  },
  {
    name: "How It Works",
    link: "/",
    id: "#how-it-works"
  },
  {
    name: "Importance",
    link: "/",
    id: "#importance"
  },
  {
    name: "FAQs",
    link: "/",
    id: "#faqs"
  },
  {
    name: 'Articles',
    link: '/articles',
    id: ""
  }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname();

  const handleClick = (id?: string) => {
      setTimeout(() => {
          const element = document.querySelector(id || "");
          if (element) {
              const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
              const y = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
              window.scrollTo({ top: y, behavior: "smooth" });
          }
      }, 100);
  };

  return (
    <>
      <nav id="nav" className="bg-white flex box- justify-center fixed top-0 w-full z-50 h-[60px] shadow-[0_4px_4px_rgba(0_,0_,0_,15%)]">
        <div className="border-blue-500 container ~px-6/20 mx-auto flex md:justify-between items-center">
          <div className="flex shrink-0 gap-4 items-center justify-center mr-auto md:mx-0 h-full">
            <Link href={'/#home'} scroll={false}>
              <Image src="/icons/logo.png" width={140} height={50} alt="logo" />
            </Link>
          </div>

          <ul className={'hidden md:flex h-full items-center'}>
            {navList.map((item) =>
                  item.link === "/" && item.id ? (
                      pathname === "/" ? (
                          <button 
                            key={item.name} 
                            onClick={() => handleClick(item.id)}
                            className={`${poppins.className} h-full text-[rgba(70_,104_,178_,80%)] hover:font-semibold hover:text-[rgba(70_,104_,178_,100%)] tracking-wider`}
                          >
                            <span className="relative h-full flex items-center ~px-2/4 w-max
                                before:absolute before:w-1 before:h-1 before:bg-blue-main before:bottom-0 before:left-0 before:opacity-0 before:rounded-full
                                before:hover:w-full before:hover:opacity-100 before:transition-all before:duration-300">
                              {item.name}
                            </span>
                          </button>
                      ) : (
                          <Link 
                            key={item.name} 
                            href={item.link}
                            className={`${poppins.className} h-full text-[rgba(70_,104_,178_,80%)] hover:font-semibold hover:text-[rgba(70_,104_,178_,100%)] tracking-wider`}
                          >
                              <button 
                                onClick={() => handleClick(item.id)} 
                                className="relative h-full flex items-center ~px-2/4 w-max
                                  before:absolute before:w-1 before:h-1 before:bg-blue-main before:bottom-0 before:left-0 before:opacity-0 before:rounded-full
                                  before:hover:w-full before:hover:opacity-100 before:transition-all before:duration-300"
                              >
                                {item.name}
                              </button>
                          </Link>
                      )
                  ) : (
                      <Link 
                        key={item.name} 
                        href={item.link} 
                        className={`${poppins.className} h-full text-[rgba(70_,104_,178_,80%)] hover:font-semibold hover:text-[rgba(70_,104_,178_,100%)] tracking-wider`}>
                          <span className="relative h-full flex items-center ~px-2/4 w-max
                              before:absolute before:w-1 before:h-1 before:bg-blue-main before:bottom-0 before:left-0 before:opacity-0 before:rounded-full
                              before:hover:w-full before:hover:opacity-100 before:transition-all before:duration-300">
                            {item.name}
                          </span>
                      </Link>
                  )
            )}
            {/* {navList.map((item, index) => (
              <button key={index}
                    onClick={() => handleNavigation(item)}
                    className={`${poppins.className} h-full text-[rgba(70_,104_,178_,80%)] hover:font-semibold hover:text-[rgba(70_,104_,178_,100%)] tracking-wider`}>
                <li className="relative h-full flex items-center ~px-2/4 w-max
                    before:absolute before:w-1 before:h-1 before:bg-blue-main before:bottom-0 before:left-0 before:opacity-0 before:rounded-full
                    before:hover:w-full before:hover:opacity-100 before:transition-all before:duration-300">
                  {item.name}
                </li>
              </button>
            ))} */}
          </ul>

          <button className="block md:hidden ml-4 order-2" onClick={() => setIsOpen(!isOpen)}>
            <Menu />
          </button>

          <Button className={'shrink-0 hidden sm:block'} border={true} active={true} variant={'gradient'}><Link href={'/auth/login'}>Login</Link></Button>
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
          {navList.map((item) =>
            item.link === "/" && item.id ? (
                pathname === "/" ? (
                    <button 
                      key={item.name} 
                      onClick={() => {handleClick(item.id); setIsOpen(!isOpen)}}
                    >
                      {item.name}
                    </button>
                ) : (
                    <Link 
                      key={item.name} 
                      href={item.link}
                    >
                        <button 
                          onClick={() => {handleClick(item.id); setIsOpen(!isOpen)}}
                        >
                          {item.name}
                        </button>
                    </Link>
                )
            ) : (
                <Link 
                  key={item.name} 
                  href={item.link}
                >
                    {item.name}
                </Link>
            )
            )}
            {/* {navList.map((item, idx) => (
              <li key={idx}>
                <Link href={item.link} onClick={() => setIsOpen(!isOpen)}>{item.name}</Link>
              </li>
            ))} */}
            <li>
              <Link href={'/auth/login'}>Login</Link>
            </li>
          </ul>
        </div>
      </nav>
            

    </>
  )
}
