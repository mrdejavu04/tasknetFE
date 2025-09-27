import React, { useEffect, useState } from "react";
import api from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";
import Stats from "./components/Stats";
import EditTaskModal from "./components/EditTaskModal";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [status, setStatus] = useState("");
  const [limit, setLimit] = useState(10);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [editing, setEditing] = useState(null); // task đang sửa

  const fetchData = async (
    p = page,
    s = status,
    l = limit,
    f = fromDate,
    t = toDate
  ) => {
    setLoading(true);
    try {
      const res = await api.get("/api/tasks", {
        params: {
          page: p,
          limit: l,
          status: s || undefined,
          from: f || undefined,
          to: t || undefined,
        },
      });
      setItems(res.data.items || []);
      setPage(res.data.page || 1);
      setPages(res.data.pages || 1);
      setTotal(res.data.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1, status, limit, fromDate, toDate);
  }, [status, limit, fromDate, toDate]);

  const onPage = (p) => {
    setPage(p);
    fetchData(p, status, limit, fromDate, toDate);
  };

  const onCreate = async (payload) => {
    await api.post("/api/tasks", payload);
    await fetchData(1, status, limit, fromDate, toDate);
  };

  const onToggleDone = async (task) => {
    const next = task.status === "done" ? "open" : "done";
    await api.patch(`/api/tasks/${task._id}`, { status: next });
    await fetchData(page, status, limit, fromDate, toDate);
  };

  const onEdit = (task) => setEditing(task);
  const onSaved = async () => {
    await fetchData(page, status, limit, fromDate, toDate);
  };
  const onDelete = async (task) => {
    const ok = window.confirm(`Xóa nhiệm vụ "${task.title}"?`);
    if (!ok) return;
    await api.delete(`/api/tasks/${task._id}`);
    await fetchData(page, status, limit, fromDate, toDate);
    if (items.length === 1 && page > 1) {
      await fetchData(page - 1, status, limit, fromDate, toDate);
      setPage(page - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header ngay trong App */}
      <header className="flex items-center gap-3 p-4 bg-white shadow-sm border-b border-slate-200">
        <img src="/increase.png" alt="Logo" className="h-10 w-10" />
        <div>
          <h1 className="text-xl font-bold text-slate-900">Momentum</h1>
          <p className="text-sm text-slate-500">
            Organize. Focus. Achieve.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Stats items={items} />

        <div className="flex flex-col gap-4">
          <TaskForm onCreate={onCreate} />
          <Filters
            status={status}
            setStatus={setStatus}
            limit={limit}
            setLimit={setLimit}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
        </div>

        <section className="mt-6">
          {loading ? (
            <div className="text-slate-600">Đang tải…</div>
          ) : items.length === 0 ? (
            <div className="text-slate-600">Không có công việc nào.</div>
          ) : (
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              }}
            >
              {items.map((t) => (
                <TaskCard
                  key={t._id}
                  task={t}
                  onToggleDone={onToggleDone}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}

          <Pagination page={page} pages={pages} onPage={onPage} />
          <div className="text-sm text-slate-500 mt-2">
            Tổng: {total} công việc
          </div>
        </section>
      </main>

      {/* Modal Sửa */}
      <EditTaskModal
        task={editing}
        onClose={() => setEditing(null)}
        onSaved={onSaved}
      />
    </div>
  );
}