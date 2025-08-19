"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type AuthFormProps = {
  mode: "signup" | "login";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      router.push("/");
    }  catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0d1117]">
      <div className="w-full max-w-md card hover-lift">
        {/* Terminal header */}
        <div className="terminal-header mb-6">
          <div className="terminal-dot red"></div>
          <div className="terminal-dot yellow"></div>
          <div className="terminal-dot green"></div>
          <span className="text-[#8b949e] text-sm ml-2" style={{ fontFamily: 'Oxanium, sans-serif' }}>
            {mode.toUpperCase()} Terminal
          </span>
        </div>

        <h1 className="text-3xl font-bold text-[#f0f6fc] mb-6 capitalize text-center" style={{ fontFamily: 'Oxanium, sans-serif' }}>
          {mode}
        </h1>

        {error && (
          <div className="text-[#f78166] bg-[#f78166]/10 border border-[#f78166]/20 p-3 mb-4 text-center font-medium rounded-lg" style={{ fontFamily: 'Oxanium, sans-serif' }}>
            Error: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-[#8b949e]" style={{ fontFamily: 'Oxanium, sans-serif' }}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-primary w-full"
              placeholder="Enter your email..."
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-[#8b949e]" style={{ fontFamily: 'Oxanium, sans-serif' }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-primary w-full"
              placeholder="Enter your password..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 btn-primary text-lg font-bold hover:scale-105 transition-transform"
            style={{ fontFamily: 'Oxanium, sans-serif' }}
          >
            {mode === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="mt-6 bg-[#0d1117] border border-[#30363d] rounded-lg p-3">
          <p className="text-center text-[#8b949e] text-sm" style={{ fontFamily: 'Oxanium, sans-serif' }}>
            {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              className="text-[#58a6ff] font-semibold cursor-pointer hover:text-[#4c9eff] transition-colors"
              onClick={() => router.push(mode === "signup" ? "/login" : "/signup")}
              style={{ fontFamily: 'Oxanium, sans-serif' }}
            >
              {mode === "signup" ? "Login" : "Sign Up"}
            </span>
          </p>
        </div>

        {/* Status footer */}
        <div className="mt-4 text-[#6e7681] text-xs text-center" style={{ fontFamily: 'Oxanium, sans-serif' }}>
          Status: Ready • Authentication System Online
        </div>
      </div>
    </div>
  );
}
