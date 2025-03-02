'use server';
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);


export async function encrypt(payload: JWTPayload | undefined, expiresIn: string =  '1h') {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(key);
    
}

export async function setCookie(token: string){

  (await cookies()).set("wewotoken", token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    maxAge: 3600 * 2,
    path: "/",
});
}

export async function deleteCookie(){

  (await cookies()).set("wewotoken", "", {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    maxAge: 0,
    path: "/",
});

}

export async function decrypt(input: string): Promise<unknown> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('wewotoken')?.value;
  if (!session) return;

  const parsed = await decrypt(session) as  { [key: string] : any}
 ( parsed as { [key: string] : unknown}).expires = new Date(Date.now() + 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'wewotoken',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires
  })
  
  return res;
}