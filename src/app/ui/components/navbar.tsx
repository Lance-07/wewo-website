import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import {poppins} from "@/app/ui/fonts";

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

  return (
    <nav className="bg-white flex box- justify-center fixed top-0 w-full z-50 h-[60px] shadow-[0_4px_4px_rgba(0_,0_,0_,15%)]">
      <div className="container px-4 mx-auto flex justify-between items-center">
        <div className="flex gap-4 items-center justify-center h-full">
          <Image src="/icons/logo.png" width={140} height={50} alt="logo" />
        </div>
          <ul className={'flex gap-4 h-full items-center'}>
            {navList.map((navItem, index) => (
              <Link key={index}
                    href={navItem.link}
                    className={`${poppins.className} h-full text-[rgba(70_,104_,178_,80%)] group-hover:text-[rgba(70_,104_,178_,100%)] tracking-wider`}>
                <li className="relative h-full flex items-center px-4 w-max group
                    before:absolute before:w-1 before:h-1 before:bg-blue-main before:bottom-0 before:left-0 before:opacity-0 before:rounded-full
                    before:hover:w-full before:hover:opacity-100 before:transition-all before:duration-300">
                  {navItem.name}
                </li>
              </Link>
            ))}
          </ul>
          <Button className={'px-7'} border={true} variant={'gradient'}>Connect With Us</Button>
      </div>
    </nav>
  )
}