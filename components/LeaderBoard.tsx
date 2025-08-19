"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type LeaderboardUser = {
  id: number;
  email: string;
  solved_count: number;
};

export default function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setUsers(data);
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="w-1/3 mx-auto mt-5 card hover-lift">
      {/* Terminal header */}
      <div className="terminal-header mb-4">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <span className="text-[#8b949e] text-sm ml-2" style={{ fontFamily: 'Oxanium, sans-serif' }}>
          Leaderboard Terminal
        </span>
      </div>
      
      <h2 className="text-2xl font-bold text-[#f0f6fc] mb-4 text-center" style={{ fontFamily: 'Oxanium, sans-serif' }}>
        🏆 Leaderboard
      </h2>
      
      <ul className="space-y-2">
        {users.map((u, idx) => (
          <motion.li
            key={u.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex justify-between px-4 py-3 rounded-lg border transition-all duration-300 hover:bg-[#161b22] ${
              idx === 0 
                ? 'border-[#fbb040] bg-[#fbb040]/10' 
                : idx === 1 
                ? 'border-[#8b949e] bg-[#8b949e]/10' 
                : idx === 2 
                ? 'border-[#f78166] bg-[#f78166]/10' 
                : 'border-[#30363d] bg-[#0d1117]'
            }`}
          >
            <span className="font-medium text-[#f0f6fc]" style={{ fontFamily: 'Oxanium, sans-serif' }}>
              {idx + 1}. {u.email.split("@")[0]}
            </span>
            <span className={`font-semibold ${
              idx === 0 ? 'text-[#fbb040]' : 
              idx === 1 ? 'text-[#8b949e]' : 
              idx === 2 ? 'text-[#f78166]' : 
              'text-[#58a6ff]'
            }`} style={{ fontFamily: 'Oxanium, sans-serif' }}>
              {u.solved_count}
            </span>
          </motion.li>
        ))}
      </ul>
      
      {/* Status footer */}
      <div className="mt-4 text-[#6e7681] text-xs text-center" style={{ fontFamily: 'Oxanium, sans-serif' }}>
        Top Players: {users.length} • Competition Active
      </div>
    </div>
  );
}
