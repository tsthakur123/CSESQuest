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
        <p className="text-[#8b949e] font-medium text-sm" style={{ fontFamily: 'Oxanium, sans-serif' }}>
          Loading dashboard...
        </p>
      </div>
    );

  const percent = Math.round((stats.solved / stats.total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full pt-26 max-w-4xl mx-auto p-4 card hover-lift"
    >
      {/* Terminal header */}
      <div className="terminal-header mb-6">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <span className="text-[#8b949e] text-sm ml-2" style={{ fontFamily: 'Oxanium, sans-serif' }}>
          CSESQuest Dashboard
        </span>
      </div>

      {/* Welcome */}
      <h2 className="text-xl sm:text-2xl font-bold text-[#f0f6fc] mb-6" style={{ fontFamily: 'Oxanium, sans-serif' }}>
        Welcome, {userEmail?.split("@")[0] || "User"}!
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Solved", value: stats.solved, color: "text-[#3fb950]", bg: "bg-[#3fb950]/10", border: "border-[#3fb950]/20" },
          { label: "Total", value: stats.total, color: "text-[#58a6ff]", bg: "bg-[#58a6ff]/10", border: "border-[#58a6ff]/20" },
          { label: "Progress", value: `${percent}%`, color: "text-[#bc8cff]", bg: "bg-[#bc8cff]/10", border: "border-[#bc8cff]/20" },
        ].map((stat) => (
          <motion.div
            whileHover={{ scale: 1.02 }}
            key={stat.label}
            className={`${stat.bg} ${stat.border} border rounded-lg p-4 text-center hover-lift`}
          >
            <h3 className="text-sm font-medium text-[#8b949e] mb-2" style={{ fontFamily: 'Oxanium, sans-serif' }}>
              {stat.label}
            </h3>
            <p className={`text-2xl sm:text-3xl font-bold ${stat.color}`} style={{ fontFamily: 'Oxanium, sans-serif' }}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-[#8b949e] mb-2" style={{ fontFamily: 'Oxanium, sans-serif' }}>
          <span>Progress</span>
          <span>{percent}%</span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Status footer */}
      <div className="text-[#6e7681] text-xs text-center" style={{ fontFamily: 'Oxanium, sans-serif' }}>
        System Status: Online • Problems Loaded: {stats.total} • Last Updated: {new Date().toLocaleTimeString()}
      </div>
    </motion.div>
  );
}
