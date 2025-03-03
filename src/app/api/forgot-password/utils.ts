import { SignJWT } from "jose";
import { supabase } from "../../../../supabase";
import moment from "moment";

export type SupabaseInsertResponse = {
    user_id: string | number;
    reset_token: string;
    expires_at: string;
} | null;

export type SupabaseQueryResponse<T> = {
    data: T | null;
    error: { message: string } | null;
};

export async function generateResetToken(user: string | number): Promise<string> {
    const userString = typeof user === 'string' ? user : user.toString();
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT({ userString })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1hr")
        .sign(secret);

    return token;
}

export async function storeResetToken(userId: string | number, resetToken: string): Promise<SupabaseInsertResponse> {
    try {
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        const storedUserId = parseInt(userId.toString(), 10);

        const { data, error }: SupabaseQueryResponse<SupabaseInsertResponse> = await supabase
            .from('password_resets')
            .upsert([{ user_id: storedUserId, reset_token: resetToken, expires_at: expiresAt }], { onConflict: 'user_id' })
            .select()
            .single();

        if (error) {
            console.error("Supabase Insert Error:", error);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error in storeResetToken:", err);
        return null;
    }
}

export async function verifyResetToken(token: string): Promise<string | number | null> {
    const { data, error }: SupabaseQueryResponse<{ user_id: number; expires_at: string }> = await supabase
        .from("password_resets")
        .select("user_id, expires_at")
        .eq("reset_token", token)
        .maybeSingle();


    console.log('supabase data: ',data)
    console.log('supabase error: ',error)

    if (error || !data) return null;

    const expiresAt = moment.utc(data.expires_at)
    const now = moment.utc(Date.now())

    console.log(expiresAt, now)
    
    if (expiresAt < now) return null;
    
    return data.user_id;
}

export async function deleteResetToken(token: string): Promise<void> {
    await supabase.from("password_resets").delete().eq("reset_token", token);
}