"use client"; // Required for client components in Next.js

import { useState } from "react";

export default function RegisterPage() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setMessage("");

const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
});

const data = await res.json();
if (res.ok) {
    setMessage("User registered successfully!");
    setEmail("");
    setPassword("");
} else {
    setMessage(`Error: ${data.error}`);
}
};

return (
<div className="max-w-md mx-auto p-4 border rounded shadow">
    <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
    <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded"
        required
    />
    <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border rounded"
        required
    />
    <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
    >
        Submit
    </button>
    </form>
    {message && <p className="mt-2 text-center">{message}</p>}
</div>
);
}
