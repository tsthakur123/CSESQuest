"use client";

interface Problem {
  cses_id: number; // will use cses_id instead
  title: string;
  link: string;
  status: "done" | "pending" | "not_attempted";
}

interface ProblemTableProps {
  problems: Problem[];
  onUpdate: (cses_id: number, status: "done" | "pending" | "not_attempted") => void;
}

export default function ProblemTable({ problems, onUpdate }: ProblemTableProps) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p, idx) => (
            <tr
              key={p.cses_id}
              className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-purple-50 transition`}
            >
              <td className="px-4 py-2 font-medium text-gray-700">{p.cses_id}</td>
              <td className="px-4 py-2">
                <a
                  href={p.link}
                  target="_blank"
                  className="text-purple-600 hover:underline font-semibold"
                >
                  {p.title}
                </a>
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    p.status === "done"
                      ? "bg-green-100 text-green-800"
                      : p.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {p.status.replace("_", " ")}
                </span>
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  onClick={() => onUpdate(p.cses_id, "done")}
                >
                  Done
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  onClick={() => onUpdate(p.cses_id, "pending")}
                >
                  Pending
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
