'use client';
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export default function ResetPasswordPage() {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Reset Your Password</h2>
                <p className="text-gray-600 text-center">Enter your new password below.</p>
                <Suspense fallback={<p>Loading...</p>}>
                    <ResetPasswordForm />
                </Suspense>
            </div>

            <Toaster richColors position="top-center" />
        </div>
    );
}


function ResetPasswordForm() {
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [viewPass, setViewPass] = useState({
        newPass: false,
        confPass: false
    })
    
    const [isValidToken, setIsValidToken] = useState(false);
    const searchParams = useSearchParams();
    const token = searchParams.get("token")?.toString();

    useEffect(() => {
        if (!token) {
            router.replace("/404");
            return;
        }

        // Validate token with API
        const verifyToken = async () => {
            try {
                const response = await fetch(`/api/forgot-password/verify?token=${token}`);
                const data = await response.json();

                if (response.ok) {
                    setIsValidToken(true);
                } else {
                    router.replace("/404");
                }
            } catch (error) {
                console.error("Error verifying token:", error);
                router.replace("/404"); 
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token, router]);

    async function updatePassword(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        if (newPass !== confirmPass) {
            toast.error('Password not match.')
            setError(!error)
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/forgot-password/update`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPass, token }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message)
                setTimeout(() => {
                    router.push('/auth/login')
                }, 2000)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log('Failed to update password.')
        } finally {
            setLoading(false)
        }
    }

    if (!isValidToken) return null;

    return (
        <form onSubmit={updatePassword} className="mt-4">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <div className="relative flex items-center">
                    <input
                        type={viewPass.newPass ? 'text' : 'password'}
                        className={clsx(`w-full mt-1 p-2 ps-3.5 pe-10 border rounded-md focus:ring-blue-500`,
                            {'border-red-500': error}
                        )}
                        placeholder="Enter new password"
                        value={newPass}
                        name="newPass"
                        onChange={(e) => setNewPass(e.target.value)}
                        required
                    />
                    <button 
                        type="button"
                        className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors" 
                        onClick={() => setViewPass((prev) => ({...prev, newPass: !viewPass.newPass}))}>{!viewPass.newPass ? <EyeClosed /> : <Eye />}
                    </button>
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative flex items-center">
                    <input
                        type={viewPass.confPass ? 'text' : 'password'}
                        className={clsx(`w-full mt-1 p-2 ps-3.5 pe-10 border rounded-md focus:ring-blue-500`,
                            {'border-red-500': error}
                        )}
                        placeholder="Enter new password"
                        value={confirmPass}
                        name="confirmPass"
                        onChange={(e) => setConfirmPass(e.target.value)}
                        required
                    />
                    <button 
                        type="button"
                        className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors" 
                        onClick={() => setViewPass((prev) => ({...prev, confPass: !viewPass.confPass}))}>{!viewPass.confPass ? <EyeClosed /> : <Eye />}
                    </button>
                </div>
            </div>
            <Button
                type="submit"
                disabled={loading || (!newPass || !confirmPass)}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
                {loading && <Loader2 className="animate-spin" />}
                {loading ? '' : 'Reset Password'}
            </Button>
        </form>
    )
}