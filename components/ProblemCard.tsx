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
      className={`bg-white backdrop-blur-md bg-opacity-50 shadow-xl rounded-xl p-6 mb-6 transition-transform transform hover:scale-105`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">{title}</h2>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-semibold hover:text-blue-400 transition-colors"
        >
          View Problem
        </a>
      </div>

      <div className="flex items-center space-x-4 mb-3">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={status === "done"}
            onChange={() =>
              onUpdate(status === "done" ? "not_attempted" : "done")
            }
            className="w-6 h-6 accent-green-500 rounded-lg"
          />
          <span className="font-medium text-gray-700">Mark as Done</span>
        </label>

        <button
          onClick={() => onUpdate("pending")}
          className="px-3 py-1 rounded-md bg-yellow-400 hover:bg-yellow-300 text-white font-semibold transition"
        >
          Pending
        </button>

        <button
          onClick={() => onUpdate("not_attempted")}
          className="px-3 py-1 rounded-md bg-gray-400 hover:bg-gray-300 text-white font-semibold transition"
        >
          Not Attempted
        </button>
      </div>

      <p className="text-sm text-gray-500">
        Current Status:{" "}
        <span
          className={`font-bold ${
            status === "done"
              ? "text-green-600"
              : status === "pending"
              ? "text-yellow-600"
              : "text-gray-600"
          }`}
        >
          {status.toUpperCase()}
        </span>
      </p>
    </div>
  );
}
