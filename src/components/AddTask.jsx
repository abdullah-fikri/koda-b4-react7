import { useContext, useRef } from "react";
import { TaskContext } from "../context/TaskContext";

export default function AddTask({ showInput }) {
  const { setData } = useContext(TaskContext);
  const taskInputRef = useRef();

  if (!showInput) return null;

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      const title = taskInputRef.current.value.trim();
      if (!title) return;

      const newTask = { id: Date.now(), title, done: false };
      setData((prev) => [...prev, newTask]);
      taskInputRef.current.value = "";
    }
  };

  return (
    <div className="mb-4 px-8">
      <input
        ref={taskInputRef}
        type="text"
        placeholder="Tambahkan tugas baru..."
        onKeyDown={handleKeydown}
        autoFocus
        className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-indigo-400"
      />
    </div>
  );
}
