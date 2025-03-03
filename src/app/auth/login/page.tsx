'use client'
import React, { useEffect } from "react";
import { useState } from 'react'
import { useRouter } from "next/navigation";
import Image from "next/image";
import { mazzard_soft_h } from "@/app/ui/fonts";
import { ArrowLeft, Eye, EyeClosed, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const LoginPage = () => {

  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [viewPass, setViewPass] = useState(false)
  const [forgotPassEmail, setForgotPassEmail] = useState('')
  const [forgotPassLoading, setForgotPassLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleClick = (id?: string) => {
    setTimeout(() => {
        const element = document.querySelector(id || "");
        if (element) {
            const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
            const y = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
            window.scrollTo({ top: y, behavior: "smooth" });
            console.log(navbarHeight, y)
        }
    }, 100);
};

  // console.log(email, password)


//   async function checkAuth() {
//     const res = await fetch("/api/verify", { method: "GET" });
//     if (res.ok) {
//         router.push("/admin");
//         return;
//     }
// }

// checkAuth();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({email, password})
      })
  
      const data = await response.json();
  
      if (response.ok) {
        router.push("/admin")
      } else {
        toast.error(data.message)
      }
    
    } catch (error) {
      console.log('failed to login.')
      toast.error('Failed to login.')
    } finally {
      setLoading(false)
    }
  }

  async function sendResetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setForgotPassLoading(true);

    if (!forgotPassEmail) {
        toast.error("Please enter your email.");
        setForgotPassLoading(false);
        return;
    }

    try {
        const response = await fetch("/api/forgot-password/send-reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ forgotPassEmail }),
        });

        const data = await response.json();

        if (response.ok) {
            toast.success(data.message);
            setForgotPassEmail("");
            setOpen(false);
        } else {
            toast.error(data.message || "Failed to send reset password email.");
        }
    } catch (error) {
        console.error("Error sending reset password:", error);
        toast.error("Oops! Something went wrong.");
    } finally {
        setForgotPassLoading(false);
    }
}



  return (
    <div
      className="w-full min-h-screen overflow-hidden relative flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(228.84deg, #7CBA5A 0.85%, #344D80 79.21%)",
      }}
    >
      <div className="w-full h-full max-w-[818px] md:h-[548px] flex flex-col md:flex-row shadow-lg rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div 
          className="w-full hidden h-full md:w-[397px] py-8 md:h-full md:flex flex-col items-center justify-center text-white p-6 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          style={{
            background: "linear-gradient(228.84deg, #7CBA5A 0.85%, #344D80 79.21%)",
            borderLeft: "5px solid #FAFAFB",
            borderTop: "5px solid #FAFAFB",
            borderBottom: "5px solid #FAFAFB",
          }}
        >
          <Image src={"/icons/icon.png"} alt="Logo" width={79.54} height={80.86} className="mb-4" />
          <h1 style={{
            textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #FFF',
          }} className={`${mazzard_soft_h.className} text-center font-bold text-[32px] md:text-[48px] leading-[1.2] md:leading-[57.6px] tracking-[3%] text-[#486BB3]`}>
            WE<span className="text-[#4A803D]">WO</span>
          </h1>
          <p className="mt-2 text-center w-4/5 text-sm leading-[24px] tracking-[3%] text-white">
            Let&apos;s Turn Waste Into Clean Water
          </p>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full md:w-[421px] py-8 md:h-full flex flex-col justify-center items-center bg-white rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none p-4 md:p-8">
          <div className="w-full max-w-[295px] flex flex-col gap-[36px] items-center">
            <h2 className="text-[#4668B2] text-center text-xl md:text-2xl font-semibold leading-[29px] tracking-normal">
              Login Account
            </h2>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div>
                <label className="block mb-1 text-sm font-semibold text-[#4668B2]" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full p-2 border border-[#4668B2] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-[#4668B2]" htmlFor="password">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={viewPass ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className="w-full p-2 ps-3.5 pe-10 border border-[#4668B2] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors" 
                    onClick={() => setViewPass(!viewPass)}>{!viewPass ? <EyeClosed /> : <Eye />}
                  </button>
                </div>
              </div>
              <div className="flex flex-row justify-between gap-2 md:gap-0 text-xs text-[#4668B2]">
                <Dialog onOpenChange={setOpen} open={open}>
                  <DialogTrigger asChild>
                    <button onClick={() => setOpen(!open)} className="text-blue-main p-0">
                      Forgot Password?
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md py-8">
                    <DialogHeader>
                      <DialogTitle>Forgot your password?</DialogTitle>
                      <DialogDescription>
                        To reset your password, enter your email.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={sendResetPassword} className="flex flex-col gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="forgot-pass-email">Email</label>
                        <input
                          id="forgot-pass-email"
                          name="forgotPassEmail"
                          value={forgotPassEmail}
                          onChange={(e) => setForgotPassEmail(e.target.value)}
                          className="py-2 px-3 border rounded"
                          placeholder="example@gmail.com"
                          required
                        />
                      </div>
                      <DialogFooter className="sm:justify-end flex gap-2">
                        <DialogClose asChild>
                          <Button onClick={() => setOpen(!open)} type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                        <Button disabled={!forgotPassEmail || forgotPassLoading} type="submit" className="text-white inline-flex items-center bg-blue-main rounded hover:bg-blue-800">
                          {forgotPassLoading && <Loader2 className="animate-spin" />}
                          {forgotPassLoading ? '' : 'Continue'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <button onClick={() => handleClick('#cta')}>
                  Need an Account?
                </button>
              </div>
              <Button disabled={loading || (!email || !password)} className="w-full bg-[#4668B2] hover:bg-[#3d5b9c] inline-flex items-center text-white rounded-md py-2 text-base font-bold" type="submit">
                {loading && <Loader2 className="animate-spin" />}
                {loading ? '' : 'Continue'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="absolute top-16 shadow-md hover:bg-stone-200 transition-all bg-white px-4 py-2 rounded-full hover:scale-105">
        <Link href={'/'}>
          <div className="flex items-center gap-2">
            <ArrowLeft size={24} />
            <p className="tracking-wider">Back To Home page</p>
          </div>
        </Link>
      </div>



      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default LoginPage;