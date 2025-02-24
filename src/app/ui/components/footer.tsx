import Image from "next/image";
import { poppins } from "../fonts";
import Link from "next/link";
import { Facebook, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className={'w-full h-[448px] relative'}>
            {/* Overlay Color Gradient */}
            <div
                className="absolute h-full w-full inset-0 bg-[linear-gradient(to_right,_#344D80_0%,_#53BAC6_31%,_#7CBA5A_68%,_#4A803D_100%)]"></div>

            {/* Dark Effect Overlay Gradient */}
            <div
                className="w-full h-full opacity-25 absolute inset-0 pointer-events-none bg-gradient-to-b from-black from-0%"></div>


            <div className={'relative flex flex-col items-center justify-center h-full w-full'}>
                <div className={'w-[275px] h-[80px] mb-10'}>
                    <Image src={'/icons/logo.png'} width={609} height={206} alt="logo" className={'w-full h-auto'}/>
                </div>

                <div className={'text-white flex-col flex items-center text-center gap-4'}>
                    <h1 className={'text-4xl font-bold'}>Collect. Conserve. Recycle.</h1>
                    <h2 className={`w-10/12 md:w-8/12 ${poppins.className}`}>WEWO isn&#39;t just water purification. It&#39;s the
                        breakthrough solution for a sustainable future.
                    </h2>

                    <div className={'flex gap-5'}>
                        <Link href={'https://www.facebook.com/'} target="_blank">
                            <Facebook />
                        </Link>
                        <Link href={'https://mail.google.com/mail/u/'} target="_blank">
                            <Mail />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="relative bg-[#202020] text-white/70 h-11 flex items-center justify-center">
                <p>&copy; 2025 WEWO | Synergy</p>
            </div>
        </footer>
    )
}