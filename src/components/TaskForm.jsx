import React, { useState } from "react";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tagsStr, setTagsStr] = useState("");      // ví dụ: study, home
  const [dueDate, setDueDate] = useState("");      // yyyy-mm-dd

  const submit = (e) => {
    e.preventDefault();
    const v = title.trim();
    if (!v) return;

    const tags = tagsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const dueAt = dueDate ? new Date(`${dueDate}T00:00:00`).toISOString() : undefined;

    onCreate({ title: v, priority, tags, dueAt });

    setTitle("");
    setPriority("medium");
    setTagsStr("");
    setDueDate("");
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-3 md:grid md:grid-cols-12 md:items-end bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
    >
      {/* Title */}
      <div className="md:col-span-5">
        <label className="block text-sm text-slate-700 mb-1">Việc cần làm</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ví dụ: Học code"
          className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 min-w-0"
        />
      </div>

      {/* Priority */}
      <div className="md:col-span-2">
        <label className="block text-sm text-slate-700 mb-1">Ưu tiên</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="low">Thấp</option>
          <option value="medium">Trung bình</option>
          <option value="high">Cao</option>
        </select>
      </div>

      {/* Tags */}
      <div className="md:col-span-3">
        <label className="block text-sm text-slate-700 mb-1">Hashtags (phân tách dấu phẩy)</label>
        <input
          type="text"
          value={tagsStr}
          onChange={(e) => setTagsStr(e.target.value)}
          placeholder="study, toeic, home"
          className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Due date */}
      <div className="md:col-span-2">
        <label className="block text-sm text-slate-700 mb-1">Ngày hạn</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}   // ✅ chặn ngày quá khứ
          className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

      </div>

      {/* Submit */}
      <div className="md:col-span-12 md:justify-self-end">
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm"
        >
          Thêm
        </button>
      </div>
    </form>
  );
}
