export default function Header() {
  return (
    <header className="flex items-center gap-3 p-4 bg-white shadow-sm border-b border-slate-200">
      {/* Logo */}
      <img src="/increase.png" alt="Logo" className="h-10 w-10" />

      {/* Tên app + mô tả */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">TaskNest</h1>
        <p className="text-sm text-slate-500">
          Quản lý công việc hiệu quả & trực quan
        </p>
      </div>
    </header>
  );
}
