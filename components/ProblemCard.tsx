"use client";

import { useState } from "react";

export type ProblemCardProps = {
  title: string;
  link: string;
  status: "pending" | "done" | "not_attempted";
  onUpdate: (status: "pending" | "done" | "not_attempted") => void;
};

export default function ProblemCard({
  title,
  link,
  status,
  onUpdate,
}: ProblemCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="card hover-lift mb-6"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Terminal header */}
      <div className="terminal-header mb-4">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <span className="text-[#8b949e] text-sm ml-2" style={{ fontFamily: 'Oxanium, sans-serif' }}>
          Problem Terminal
        </span>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#f0f6fc]" style={{ fontFamily: 'Oxanium, sans-serif' }}>
          {title}
        </h2>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ fontFamily: 'Oxanium, sans-serif' }}
        >
          View Problem
        </a>
      </div>

      <div className="flex items-center space-x-4 mb-4 flex-wrap">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={status === "done"}
            onChange={() =>
              onUpdate(status === "done" ? "not_attempted" : "done")
            }
            className="w-5 h-5 accent-[#3fb950] rounded border-[#30363d] bg-[#161b22]"
          />
          <span className="font-medium text-[#8b949e]" style={{ fontFamily: 'Oxanium, sans-serif' }}>
            Mark as Done
          </span>
        </label>

        <button
          onClick={() => onUpdate("pending")}
          className="btn-secondary text-[#f78166] border-[#f78166] hover:bg-[#f78166] hover:text-[#f0f6fc]"
          style={{ fontFamily: 'Oxanium, sans-serif' }}
        >
          Pending
        </button>

        <button
          onClick={() => onUpdate("not_attempted")}
          className="btn-secondary"
          style={{ fontFamily: 'Oxanium, sans-serif' }}
        >
          Not Attempted
        </button>
      </div>

      <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3">
        <p className="text-sm text-[#8b949e]" style={{ fontFamily: 'Oxanium, sans-serif' }}>
          Current Status:{" "}
          <span
            className={`font-medium ${
              status === "done"
                ? "status-done"
                : status === "pending"
                ? "status-pending"
                : "status-not-attempted"
            }`}
            style={{ fontFamily: 'Oxanium, sans-serif' }}
          >
            {status.replace("_", " ")}
          </span>
        </p>
      </div>

      {/* Status footer */}
      <div className="mt-4 text-[#6e7681] text-xs text-center" style={{ fontFamily: 'Oxanium, sans-serif' }}>
        Status: {status.toUpperCase()} • Ready for input
      </div>
    </div>
  );
}
