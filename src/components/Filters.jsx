import React from "react";

export default function Filters({ status, setStatus, limit, setLimit, fromDate, setFromDate, toDate, setToDate }) {
  return (
    <div className="flex flex-wrap gap-4 items-end bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      {/* Chọn trạng thái */}
      <div>
        <label className="block text-sm text-slate-700 mb-1">Trạng thái</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Tất cả</option>
          <option value="open">Chưa xong</option>
          <option value="done">Đã xong</option>
        </select>
      </div>

      {/* Chọn số item / trang */}
      <div>
        <label className="block text-sm text-slate-700 mb-1">Mỗi trang</label>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="px-3 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-600"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Filter theo ngày */}
      <div>
        <label className="block text-sm text-slate-700 mb-1">Từ ngày</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-300 bg-white"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-700 mb-1">Đến ngày</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-300 bg-white"
        />
      </div>
    </div>
  );
}