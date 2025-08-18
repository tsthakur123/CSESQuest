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
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-50">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 capitalize text-center">
          {mode}
        </h1>

        {error && (
          <p className="text-red-500 bg-red-100 p-2 rounded mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-xl border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-lg hover:scale-105 transition-transform"
          >
            {mode === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-purple-600 font-semibold cursor-pointer hover:underline"
            onClick={() => router.push(mode === "signup" ? "/login" : "/signup")}
          >
            {mode === "signup" ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
