import Image from "next/image";
import Link from "next/link";
import Button from "./button";

const navList: {name: string, link: string}[] = [
  {
    name: 'Impacts',
    link: '#'
  },
  {
    name: 'About',
    link: '#'
  },
  {
    name: 'Home',
    link: '#'
  },
]

export default function Navbar() {
  return (
    <nav className="bg-white flex items-center justify-center fixed top-0 w-full z-50 h-[60px]">
      <div className="container px-4 mx-auto flex justify-between items-center">
        <div className="flex gap-4 items-center justify-center">
          <Image src="/icons/logo.png" width={140} height={50} alt="logo" />
        </div>
          <ul>
            {navList.map((navItem, index) => (
              <li key={index} className="inline-block mx-4">
                <Link href={navItem.link} className="text-[#4668B2]">{navItem.name}</Link> 
              </li>
            ))}
          </ul>
          <Button>Connect With Us</Button>
      </div>
    </nav>
  )
}