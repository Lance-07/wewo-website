import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";


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

export const decodeJWT = (token: string) => {
  const [header, payload, signature] = token.split(".");
  return {
    header: JSON.parse(Buffer.from(header, "base64").toString()),
    payload: JSON.parse(Buffer.from(payload, "base64").toString()),
    signature,
  };
};