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
      <div className="flex justify-center items-center min-h-screen bg-[#0d1117]">
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-16 w-16 border-4 border-t-[#58a6ff] border-[#30363d] rounded-full mb-4"
          />
          <div className="text-[#8b949e] text-2xl mb-2 loading-dots" style={{ fontFamily: 'Oxanium, sans-serif' }}>
            Loading
          </div>
          <div className="text-[#6e7681] text-sm" style={{ fontFamily: 'Oxanium, sans-serif' }}>
            Fetching Random Problem
          </div>
        </div>
      </div>
    );
  }
   if (!problem) return null;

  return (
    <>
    <Navbar username={username || undefined} />
      <div className="flex justify-center items-center min-h-screen bg-[#0d1117] p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-2xl card hover-lift text-center"
        >
          {/* Terminal header */}
          <div className="terminal-header mb-6">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
            <span className="text-[#8b949e] text-sm ml-2" style={{ fontFamily: 'Oxanium, sans-serif' }}>
              Random Problem Terminal
            </span>
          </div>

          <h2 className="text-4xl font-bold text-[#f0f6fc] tracking-tight mb-6" style={{ fontFamily: 'Oxanium, sans-serif' }}>
            {problem.title}
          </h2>

          <a
            href={problem.link}
            target="_blank"
            className="block mb-8 text-[#58a6ff] hover:text-[#4c9eff] transition-colors text-lg font-medium btn-primary inline-block"
            style={{ fontFamily: 'Oxanium, sans-serif' }}
          >
            Solve on CSES →
          </a>

          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button
              onClick={() => updateStatus("done")}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              disabled={updating}
              className="btn-primary disabled:opacity-50"
              style={{ fontFamily: 'Oxanium, sans-serif' }}
            >
              ✅ Done
            </motion.button>

            <motion.button
              onClick={() => updateStatus("pending")}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              disabled={updating}
              className="btn-secondary text-[#f78166] border-[#f78166] hover:bg-[#f78166] hover:text-[#f0f6fc] disabled:opacity-50"
              style={{ fontFamily: 'Oxanium, sans-serif' }}
            >
              ⏳ Pending
            </motion.button>

            <motion.button
              onClick={() => updateStatus("not_attempted")}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              disabled={updating}
              className="btn-secondary disabled:opacity-50"
              style={{ fontFamily: 'Oxanium, sans-serif' }}
            >
              ❌ Skip
            </motion.button>
          </div>

          {/* Status footer */}
          <div className="mt-6 text-[#6e7681] text-xs text-center" style={{ fontFamily: 'Oxanium, sans-serif' }}>
            Problem ID: {problem.cses_id} • Status: Ready • Awaiting Input
          </div>
        </motion.div>
      </div>
    </>
  );
}
