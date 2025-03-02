import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { message, email } = await req.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        })

        await transporter.sendMail({
            from: email ? `${email}+alias@gmail.com` : process.env.EMAIL_USER,
            to: 'synergy.wewo.911@gmail.com',
            subject: 'New Message From Website',
            text: `From: ${email}\n\nMessage:\n${message}`,
            replyTo: email
        })

        return NextResponse.json({ message: 'Email sent successfully.'}, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
    }
}