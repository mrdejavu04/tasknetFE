import React from "react";

export default function TaskCard({ task, onToggleDone, onEdit, onDelete }) {
  const isDone = task.status === "done";
  const due = task.dueAt ? new Date(task.dueAt) : null;
  const now = new Date();
  const isOverdue = due && task.status === "open" && due < now;

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-slate-200 bg-white shadow-sm min-w-0">
      <div className="flex items-start gap-3 min-w-0">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => onToggleDone(task)}
          className="h-5 w-5 accent-blue-600 mt-1"
          aria-label="Đánh dấu hoàn thành"
        />
        <div className="min-w-0">
          <h3
            className={`text-base font-semibold break-words ${
              isDone ? "line-through text-slate-500" : "text-slate-900"
            }`}
          >
            {task.title}
          </h3>
          {task.note && (
            <p className="text-sm text-slate-600 mt-1 break-words">{task.note}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge
          color={
            task.priority === "high" ? "red" : task.priority === "low" ? "slate" : "blue"
          }
        >
          Ưu tiên: {task.priority}
        </Badge>
        <Badge color={isDone ? "green" : "amber"}>Trạng thái: {task.status}</Badge>

        {due && (
          <Badge color={isOverdue ? "red" : "slate"}>
            Hạn: {due.toLocaleDateString("vi-VN")}
          </Badge>
        )}

        {Array.isArray(task.tags) && task.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            {task.tags.map((t, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs rounded-full border border-slate-200 bg-slate-50 text-slate-700 truncate"
                title={t}
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-500">
          Tạo: {new Date(task.createdAt).toLocaleString("vi-VN")}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700"
          >
            Sửa
          </button>
          <button
            onClick={() => onDelete(task)}
            className="px-3 py-1 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, color = "blue" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    red: "bg-red-50 text-red-700 border-red-200",
    slate: "bg-slate-50 text-slate-700 border-slate-200",
  };
  return (
    <span
      className={`px-2 py-0.5 text-xs rounded-full border ${
        colors[color] || colors.blue
      }`}
    >
      {children}
    </span>
  );
}
