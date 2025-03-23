'use client';

import clsx from "clsx";
import { EllipsisVertical, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" 

import { handleLogout } from "@/app/auth/logout";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import Link from "next/link";
import { getUser } from "@/app/actions";

type User = {
  email: string;
}

export default function adminNav() {

  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [issue, setIssue] = useState('');
  const [message, setMessage] = useState('')
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser() as User;
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  async function sendSupport(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ issue, message, email: user?.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return
      } 

      toast.success(data.message);
      setIsSupportOpen(false);
        
    } catch (error) {
      console.log(error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
      setIssue('');
      setMessage('');
    }
  }

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

              <DropdownMenuItem onClick={() => setIsSupportOpen(true)}>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={'/'}><DropdownMenuItem>Visit Homepage</DropdownMenuItem></Link>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsLogoutOpen(true)}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


        {/* Support Dialog */}
        <Dialog open={isSupportOpen} onOpenChange={setIsSupportOpen}>
          <DialogContent aria-describedby="support-description">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Support</DialogTitle>
            </DialogHeader>
            <form onSubmit={sendSupport}>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="issue">Issue</label>
                <input 
                  id="issue" 
                  type="text" 
                  placeholder="e.g. Techinical issue" 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  name="subject"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  required
                />
                <label className="block text-sm font-medium text-gray-700" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  placeholder="Describe your issue..." 
                  className="w-full p-2 border border-gray-300 rounded-md h-24" 
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <DialogFooter className="mt-6 gap-4 sm:gap-0">
                <Button type="button" className="text-black border border-slate-900 rounded-sm hover:bg-slate-100" onClick={() => setIsSupportOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={loading || (!message || !issue)} className="text-white flex justify-center bg-blue-main rounded-sm transition-transform duration-200 hover:scale-105 hover:bg-blue-700 sm:w-[90px]">
                  {loading && <Loader2 className="w-6 h-6 animate-spin" />}
                  {!loading && 'Send'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Logout Confirmation Dialog */}
        <Dialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
          <DialogContent aria-describedby="logout-description">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Confirm Logout</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to log out?</p>
            <DialogFooter className="gap-4 mt-6 sm:gap-0">
              <Button className="hover:bg-slate-100 text-black border border-slate-800 rounded-sm" onClick={() => setIsLogoutOpen(false)}>Cancel</Button>
              <Button className="bg-red-500 hover:bg-red-600 rounded-sm" onClick={() => handleLogout()}>Log Out</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

          </div>
      </div>
   </nav>
  )
}