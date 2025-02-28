'use server'

import { deleteCookie } from "@/lib/server-utils";
import { redirect } from "next/navigation";

export async function handleLogout() {
  await deleteCookie();
  redirect('/auth/login');
}