'use client'
import React from "react";
import { useState } from 'react'
import Image from "next/image";
import { mazzard_soft_h } from "@/app/ui/fonts";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log(email, password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch("/api/login", {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({email, password})
    })

    const data = await response.json();

    if (response.ok) {
      console.log("Login successful:", data);
    } else {
      console.log("Login failed:", data);
    }
  }

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(228.84deg, #7CBA5A 0.85%, #344D80 79.21%)",
      }}
    >
      <div className="w-full max-w-[818px] md:h-[548px] flex flex-col md:flex-row shadow-lg rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div 
          className="w-full md:w-[397px] py-8 md:h-full flex flex-col items-center justify-center text-white p-6 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
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
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2 border border-[#4668B2] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0 text-xs text-[#4668B2]">
                <a href="#" className="hover:underline">
                  Forgot Password?
                </a>
                <a href="#" className="hover:underline">
                  Need an Account?
                </a>
              </div>
              <button className="w-full bg-[#4668B2] text-white rounded-md py-2 text-base font-bold" type="submit">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;