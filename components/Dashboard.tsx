"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type DashboardProps = {
  userEmail?: string;
};

export default function Dashboard({ userEmail }: DashboardProps) {
  const [stats, setStats] = useState<{ solved: number; total: number } | null>(null);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("/api/user/stats");
      const data = await res.json();
      setStats(data);
    }
    fetchStats();
  }, []);

  if (!stats)
    return (
      <div className="flex justify-center items-center min-h-[120px]">
        <p className="text-gray-400 font-medium text-sm">Loading dashboard...</p>
      </div>
    );

  const percent = Math.round((stats.solved / stats.total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full pt-26 max-w-4xl mx-auto p-4 bg-white/30 backdrop-blur-lg rounded-2xl shadow-md border border-[#E2D1C3]/20 overflow-hidden"
    >
      {/* Floating accents */}
      <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#5BC0BE] opacity-20 blur-2xl rounded-full animate-pulse" />
      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#FF6B6B] opacity-20 blur-2xl rounded-full animate-pulse" />

      {/* Welcome */}
      <h2 className="text-xl sm:text-2xl font-bold text-[#3A506B] mb-4">
        Welcome, {userEmail?.split("@")[0] || "User"}!
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {[
          { label: "Solved", value: stats.solved, bg: "bg-[#5BC0BE]/20", color: "#FF6B6B" },
          { label: "Total", value: stats.total, bg: "bg-[#FF6B6B]/20", color: "#3A506B" },
          { label: "Progress", value: `${percent}%`, bg: "bg-[#3A506B]/20", color: "#5BC0BE" },
        ].map((stat) => (
          <motion.div
            whileHover={{ scale: 1.03 }}
            key={stat.label}
            className={`${stat.bg} backdrop-blur-sm rounded-xl p-3 text-center shadow-sm transition-shadow`}
          >
            <h3 className="text-sm font-medium text-[#3A506B]">{stat.label}</h3>
            <p className="text-lg sm:text-xl font-bold mt-1" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Compact Progress Bar */}
      <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-[#FF6B6B] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
