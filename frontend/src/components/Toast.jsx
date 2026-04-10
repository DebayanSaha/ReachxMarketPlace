import { IconCheck, IconX } from "./Icons";

const Toast = ({ toasts }) => (
  <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
    {toasts.map((t) => (
      <div
        key={t.id}
        className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium shadow-lg pointer-events-auto transition-all duration-300 ${
          t.type === "success"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}
      >
        <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${t.type === "success" ? "bg-emerald-100" : "bg-red-100"}`}>
          {t.type === "success" ? <IconCheck /> : <IconX />}
        </span>
        {t.message}
      </div>
    ))}
  </div>
);

export default Toast;