import React from "react";

export default function Pagination({ page, pages, onPage }) {
  if (pages <= 1) return null; // không hiện nếu chỉ có 1 trang

  const prev = () => onPage(Math.max(1, page - 1));
  const next = () => onPage(Math.min(pages, page + 1));

  // Tạo dải số trang hiển thị (trước, hiện tại, sau)
  const windowSize = 1;
  const nums = [];
  for (let i = Math.max(1, page - windowSize); i <= Math.min(pages, page + windowSize); i++) {
    nums.push(i);
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
      {/* Nút trước */}
      <button
        onClick={prev}
        className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-50"
        disabled={page === 1}
      >
        ← Trước
      </button>

      {/* Nếu xa trang 1 thì thêm nút + dấu … */}
      {page - windowSize > 1 && (
        <>
          <PageBtn n={1} active={page === 1} onClick={() => onPage(1)} />
          <span className="px-1 text-slate-500">…</span>
        </>
      )}

      {/* Các trang xung quanh */}
      {nums.map((n) => (
        <PageBtn key={n} n={n} active={n === page} onClick={() => onPage(n)} />
      ))}

      {/* Nếu xa trang cuối thì thêm dấu … + nút cuối */}
      {page + windowSize < pages && (
        <>
          <span className="px-1 text-slate-500">…</span>
          <PageBtn n={pages} active={page === pages} onClick={() => onPage(pages)} />
        </>
      )}

      {/* Nút sau */}
      <button
        onClick={next}
        className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-50"
        disabled={page === pages}
      >
        Sau →
      </button>
    </div>
  );
}

function PageBtn({ n, active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={
        "min-w-9 px-3 py-1 rounded-lg border text-sm " +
        (active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100")
      }
    >
      {n}
    </button>
  );
}
