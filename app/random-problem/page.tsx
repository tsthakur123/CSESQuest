"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

type Problem = {
  cses_id: number;
  title: string;
  link: string;
  status: "done" | "pending" | "not_attempted";
};

export default function RandomProblemPage() {
  const [problem, setProblem] = useState<Problem|null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

   const [username, setUsername] = useState<string | null>(null);
  // const [userId, setUserId] = useState<number | null>(null);

    

  const fetchProblem = async () => {
    setLoading(true);
    const res = await fetch("/api/random");
    const data = await res.json();
    setProblem({ ...data, status: "not_attempted" });
    setLoading(false);
  };

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/user");
      const data = await res.json();
      console.log("userdata",data);
      if (data.loggedIn && data.email) {
        const username = data.email.trim().split("@")[0];
        // setUserId(data.userId)
        setUsername(username);
      }
    }
    fetchUser();
    fetchProblem();
  }, []);

  const updateStatus = async (status: Problem["status"]) => {
    if (!problem) return;
    setUpdating(true);
    await fetch("/api/progress/update", {
      method: "POST",
      body: JSON.stringify({ problemId: problem.cses_id, status }),
      headers: { "Content-Type": "application/json" },
    });
    await fetchProblem();
    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#FDFCFB] to-[#E2D1C3]">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="h-16 w-16 rounded-full border-4 border-t-[#FE744D] border-gray-600"
        />
      </div>
    );
  }
   if (!problem) return null;

  return (
    <>
    <Navbar username={username || undefined} />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#FDFCFB] to-[#E2D1C3] p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-10 text-center border border-[#E2D1C3]/50"
        >
          <h2 className="text-4xl font-bold text-[#3A506B] tracking-tight">
            {problem.title}
          </h2>

          <a
            href={problem.link}
            target="_blank"
            className="block mt-4 text-[#5BC0BE] hover:text-[#FF6B6B] transition text-lg font-medium"
          >
            Solve on CSES →
          </a>

          <div className="mt-10 flex gap-4 justify-center flex-wrap">
            <motion.button
              onClick={() => updateStatus("done")}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              disabled={updating}
              className="px-6 py-3 rounded-2xl font-medium text-white bg-[#FF6B6B] shadow-md hover:shadow-lg hover:bg-[#e85a5a] transition disabled:opacity-50"
            >
              ✅ Done
            </motion.button>

            <motion.button
              onClick={() => updateStatus("pending")}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              disabled={updating}
              className="px-6 py-3 rounded-2xl font-medium text-white bg-[#5BC0BE] shadow-md hover:shadow-lg hover:bg-[#4daaaa] transition disabled:opacity-50"
            >
              ⏳ Pending
            </motion.button>

            <motion.button
              onClick={() => updateStatus("not_attempted")}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              disabled={updating}
              className="px-6 py-3 rounded-2xl font-medium text-white bg-[#3A506B] shadow-md hover:shadow-lg hover:bg-[#2c3c52] transition disabled:opacity-50"
            >
              ❌ Skip
            </motion.button>
          </div>

          {/* Soft floating accents */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#5BC0BE] opacity-30 blur-3xl rounded-full animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#FF6B6B] opacity-30 blur-3xl rounded-full animate-pulse" />
        </motion.div>
      </div>
    </>
  );
}
