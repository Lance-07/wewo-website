'use client';

import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import {poppins} from "@/app/ui/fonts";
import { Menu, MoveRight} from "lucide-react";
import { useEffect, useState } from "react";
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
          console.log(element)
          if (element) {
              const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
              const y = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
              window.scrollTo({ top: y, behavior: "smooth" });
              console.log(navbarHeight, y)
          }
      }, 100);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isOpen && (e.target as HTMLElement).closest("#mobile-menu") === null) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  return (
    <>
      <nav id="nav" className="bg-white flex box- justify-center fixed top-0 w-full z-50 h-[60px] shadow-[0_4px_4px_rgba(0_,0_,0_,15%)]">
        <div className="border-blue-500 container ~px-6/20 mx-auto flex md:justify-between items-center">
          <div className="flex shrink-0 gap-4 items-center justify-center mr-auto md:mx-0 h-full">
            <Link href={'/#home'} >
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
          </ul>

          <button className="block md:hidden ml-4 order-2" onClick={() => setIsOpen(!isOpen)}>
            <Menu />
          </button>

          <Button className={'shrink-0 hidden sm:block'} border={true} active={true} variant={'gradient'}><Link href={'/auth/login'}>Login</Link></Button>
        </div>

        <div
          role="dialog"
          aria-hidden={!isOpen}
          id="mobile-menu"
          className={cn(
            `fixed inset-0 z-50 flex flex-col w-screen h-screen backdrop-blur-lg 
            bg-slate-900/80 text-white transition-transform md:hidden ease-in-out duration-300`,
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Close Button */}
          <button
            aria-label="Close menu"
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <MoveRight size={28} className="text-white" />
          </button>

          {/* Navigation Links */}
          <ul className="flex flex-1 flex-col items-center justify-center gap-6 text-2xl font-semibold">
            {navList.map((item) =>
              item.link === "/" && item.id ? (
                pathname === "/" ? (
                  <button
                    key={item.name}
                    onClick={() => {
                      handleClick(item.id);
                      setIsOpen(false);
                    }}
                    className="relative hover:text-gray-300 transition-colors after:block after:h-0.5 after:bg-gray-300 after:w-0 after:transition-all after:duration-300 after:hover:w-full"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link key={item.name} href={item.link}>
                    <button
                      onClick={() => {
                        handleClick(item.id);
                        setIsOpen(false);
                      }}
                      className="relative hover:text-gray-300 transition-colors after:block after:h-0.5 after:bg-gray-300 after:w-0 after:transition-all after:duration-300 after:hover:w-full"
                    >
                      {item.name}
                    </button>
                  </Link>
                )
              ) : (
                <Link key={item.name} href={item.link} className="relative hover:text-gray-300 transition-colors after:block after:h-0.5 after:bg-gray-300 after:w-0 after:transition-all after:duration-300 after:hover:w-full">
                  {item.name}
                </Link>
              )
            )}

            {/* Login Link */}
            <li>
              <Link href="/auth/login" className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-white/20 transition-colors">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
            

    </>
  )
}
