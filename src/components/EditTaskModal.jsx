import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function EditTaskModal({ task, onClose, onSaved }) {
  if (!task) return null;

  const [title, setTitle] = useState(task.title || "");
  const [tagsStr, setTagsStr] = useState(Array.isArray(task.tags) ? task.tags.join(", ") : "");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    setTitle(task?.title || "");
    setTagsStr(Array.isArray(task?.tags) ? task.tags.join(", ") : "");
    // chuyển dueAt ISO -> yyyy-mm-dd cho input date
    if (task?.dueAt) {
      try {
        const ymd = new Date(task.dueAt).toISOString().slice(0, 10);
        setDueDate(ymd);
      } catch {
        setDueDate("");
      }
    } else {
      setDueDate("");
    }
  }, [task]);

  const submit = async (e) => {
    e.preventDefault();
    const v = title.trim();
    if (!v) return;

    const tags = tagsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: v,
      tags,
      dueAt: dueDate ? new Date(`${dueDate}T00:00:00`).toISOString() : null,
    };

    await api.patch(`/api/tasks/${task._id}`, payload);
    onSaved?.();   // cho App gọi fetchData lại
    onClose?.();   // đóng modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      {/* modal */}
      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-xl p-5"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Sửa nhiệm vụ</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-700 mb-1">Tên nhiệm vụ</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Nhập tên mới…"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">Ngày hạn</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">Hashtags (phẩy ,)</label>
            <input
              type="text"
              value={tagsStr}
              onChange={(e) => setTagsStr(e.target.value)}
              placeholder="study, toeic, home"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Lưu
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-3">
          * Không thay đổi ngày tạo. Chỉ sửa tên, ngày hạn và hashtags.
        </p>
      </form>
    </div>
  );
}
