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
      <div className="terminal-header mb-4">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <span className="text-[#8b949e] text-sm ml-2" style={{ fontFamily: 'Oxanium, sans-serif' }}>
          Problem Database
        </span>
      </div>
      
      <div className="card">
        <table className="table-clean">
          <thead>
            <tr>
              <th style={{ fontFamily: 'Oxanium, sans-serif' }}>ID</th>
              <th style={{ fontFamily: 'Oxanium, sans-serif' }}>Title</th>
              <th style={{ fontFamily: 'Oxanium, sans-serif' }}>Status</th>
              <th style={{ fontFamily: 'Oxanium, sans-serif' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((p, idx) => (
              <tr key={p.cses_id}>
                <td className="font-medium text-[#f0f6fc] mono">{p.cses_id}</td>
                <td>
                  <a
                    href={p.link}
                    target="_blank"
                    className="text-[#58a6ff] hover:text-[#4c9eff] font-medium transition-colors"
                    style={{ fontFamily: 'Oxanium, sans-serif' }}
                  >
                    {p.title}
                  </a>
                </td>
                <td>
                  <span
                    className={`${
                      p.status === "done"
                        ? "status-done"
                        : p.status === "pending"
                        ? "status-pending"
                        : "status-not-attempted"
                    }`}
                    style={{ fontFamily: 'Oxanium, sans-serif' }}
                  >
                    {p.status.replace("_", " ")}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    className="btn-primary text-sm"
                    onClick={() => onUpdate(p.cses_id, "done")}
                    style={{ fontFamily: 'Oxanium, sans-serif' }}
                  >
                    Done
                  </button>
                  <button
                    className="btn-secondary text-sm text-[#f78166] border-[#f78166] hover:bg-[#f78166] hover:text-[#f0f6fc]"
                    onClick={() => onUpdate(p.cses_id, "pending")}
                    style={{ fontFamily: 'Oxanium, sans-serif' }}
                  >
                    Pending
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="text-[#6e7681] text-xs text-center mt-4" style={{ fontFamily: 'Oxanium, sans-serif' }}>
        Total Problems: {problems.length} • Ready for execution
      </div>
    </div>
  );
}
