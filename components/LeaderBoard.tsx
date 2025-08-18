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
    <div className="w-1/3 mx-auto mt-5 bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-[#E2D1C3]/50">
      <h2 className="text-2xl font-bold text-[#3A506B] mb-4">🏆 Leaderboard</h2>
      <ul>
        {users.map((u, idx) => (
          <motion.li
            key={u.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex justify-between px-4 py-2 rounded-xl mb-2 bg-[#FDFCFB]/60 hover:bg-[#E2D1C3]/40 transition"
          >
            <span className="font-medium text-black">{idx + 1}. {u.email.split("@")[0]}</span>
            <span className="font-semibold text-[#FF6B6B]">{u.solved_count}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
