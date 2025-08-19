"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProblemCard from "../components/ProblemCard";
import ProblemTable from "@/components/ProblemTable";
import Leaderboard from "@/components/LeaderBoard";
import Dashboard from "@/components/Dashboard";

type Problem = {
  cses_id: number;
  title: string;
  link: string;
  status: "pending" | "done" | "not_attempted";
};

export default function Home() {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [allProblems, setAllProblems] = useState<Problem[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  // const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/user");
      const data = await res.json();
      console.log("userdata", data);
      if (data.loggedIn && data.email) {
        const username = data.email.trim().split("@")[0];
        // setUserId(data.userId)
        setUsername(username);
      }
    }
    fetchUser();

    async function fetchProblem() {
      // Random problem (excluding done)
      const randomRes = await fetch("/api/random");
      const randomData = await randomRes.json();
      const randomProblem: Problem = {
        ...randomData,
        status: randomData.status || "not_attempted",
      };
      setProblem(randomProblem);

      // Table of all problems with user status
      const tableRes = await fetch("/api/problems");
      const tableData:Problem[] = await tableRes.json();
      console.log("table data",tableData);
      
      setAllProblems(
        tableData.map((p) => ({
          cses_id: p.cses_id,
          title: p.title,
          link: p.link,
          status: p.status, // keep DB status
        }))
      );
    }
    fetchProblem();
  }, []);

  if (!problem)
    return (
      <div className="flex items-center justify-center min-h-screen text-[#8b949e]">
        <div className="text-center">
          <div className="text-2xl mb-4 loading-dots" style={{ fontFamily: 'Oxanium, sans-serif' }}>
            Loading
          </div>
          <div className="text-[#6e7681] text-sm" style={{ fontFamily: 'Oxanium, sans-serif' }}>
            Initializing CSESQuest
          </div>
        </div>
      </div>
    );

  // Unified status update function
  const handleUpdate = async (
    cses_id: number,
    status: "pending" | "done" | "not_attempted"
  ) => {
    // Update locally
    setAllProblems((prev) =>
      prev.map((p) => (p.cses_id === cses_id ? { ...p, status } : p))
    );
    if (problem?.cses_id === cses_id) setProblem({ ...problem, status });

    // Persist to backend
    try {
      await fetch("/api/progress/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId: cses_id, status }),
      });
    } catch (err) {
      console.error("Failed to update problem status", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Navbar username={username || undefined} />
      <Dashboard userEmail={username || undefined} />
      <main className="max-w-4xl mx-auto pt-2">
        <ProblemCard
          title={problem.title}
          link={problem.link}
          status={problem.status}
          onUpdate={(status) => handleUpdate(problem.cses_id, status)}
        />
      </main>
      <div className="w-full flex justify-end">
        <div className="w-4/5 flex">
          <ProblemTable problems={allProblems} onUpdate={handleUpdate} />
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
