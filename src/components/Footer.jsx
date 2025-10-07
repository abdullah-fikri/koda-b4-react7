import { Plus } from "lucide-react";

export default function Footer({ tasksLength, onShowInput }) {
  return (
    <div className="flex items-center justify-between px-8 py-6 border-t border-gray-100">
      <span className="text-indigo-300 font-medium tracking-wide text-sm">
        {tasksLength} TASKS
      </span>
      <button
        onClick={onShowInput}
        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-600 font-medium transition"
      >
        ADD NEW
        <Plus size={20} />
      </button>
    </div>
  );
}
