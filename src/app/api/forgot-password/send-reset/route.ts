import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import { supabase } from "../../../../../supabase";
import { generateResetToken, storeResetToken, SupabaseInsertResponse, SupabaseQueryResponse } from "../utils";

export async function POST(request: NextRequest) {
    try {
        
        const baseurl: string = process.env.NODE_ENV === "production" ? process.env.APP_URL! : "http://localhost:3000";
        const body = await request.json()
        const { data, error }: SupabaseQueryResponse<{ id: string | number }> = await supabase
            .from('adminUser')
            .select("*")
            .eq('email', body.forgotPassEmail)
            .single()

        if (!data || error) {
            console.log('failed to fetched user data.')
            return NextResponse.json({ message: 'No such email exists.'}, { status: 400 })
        }

        const resetToken = await generateResetToken(data.id);
        const resetLink = `${baseurl}/reset-password?token=${resetToken}`;
        const stored: SupabaseInsertResponse = await storeResetToken(data.id, resetToken);

        if (!stored) {
            console.error("Failed to store reset token");
            return NextResponse.json({ message: "Failed to store reset token" }, { status: 500 });
        }


        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        })

        const emailHtml = /* html */`
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Reset Your Password</title>
                    </head>
                    <body style="background-color: #f3f4f6; padding: 20px; font-family: Arial, sans-serif;">
                        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                            <h2 style="color: #111827; font-size: 24px;">Reset Your Password</h2>
                            <p style="color: #6b7280; font-size: 16px;">Click the button below to reset your password. This link will expire in 1 hour.</p>
                            <a href="${resetLink}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; padding: 12px 20px; font-size: 16px; font-weight: bold; border-radius: 6px; text-decoration: none; margin-top: 20px;">Reset Password</a>
                            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">If you did not request a password reset, please ignore this email.</p>
                        </div>
                    </body>
                </html>
        `

        await transporter.sendMail({
            from: 'synergy.wewo.911@gmail.com',
            to: body.forgotPassEmail,
            subject: 'Reset your password',
            html: emailHtml

        })
        return NextResponse.json({ message: 'Reset password has been sent to your email. Please check your email.'}, { status: 200 })
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ message: "Something went wrong.", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}






