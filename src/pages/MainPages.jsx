import { useContext, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddTask from "../components/AddTask";
import { PencilLine, Trash } from "lucide-react";
import { TaskContext } from "../context/TaskContext";

export default function MainPages() {
  const { data, setData } = useContext(TaskContext);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef();

  const toggleTask = (id) => {
    setData((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id) => {
    setData((prev) => prev.filter((t) => t.id !== id));
  };

  const renameTask = (id, newTitle) => {
    setData((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    inputRef.current.setAttribute("disabled", "");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-pink-50 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <Navbar />
        <div className="px-8 py-6 min-h-[400px]">
          <AddTask showInput={showInput} />

          <ul className="space-y-4">
            {data.map((task) => (
              <li key={task.id} className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 rounded border-2 border-gray-300 text-indigo-400 focus:ring-2 focus:ring-indigo-200 cursor-pointer"
                />

                <form onSubmit={handleSubmit} className="flex-1">
                  <input
                    type="text"
                    ref={inputRef}
                    disabled
                    defaultValue={task.title}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const newTitle = e.target.value.trim();
                        if (newTitle) renameTask(task.id, newTitle);
                      }
                    }}
                    className={`bg-transparent outline-none border-b border-transparent focus:border-indigo-300 text-indigo-400 font-medium ${
                      task.done ? "line-through opacity-50" : ""
                    }`}
                  />
                </form>

                <button
                  onClick={() => inputRef.current.removeAttribute("disabled")}
                >
                  <PencilLine className="text-indigo-400" />
                </button>
                <button onClick={() => deleteTask(task.id)}>
                  <Trash className="text-indigo-400 " />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <Footer
          tasksLength={data.length}
          onShowInput={() => setShowInput(true)}
        />
      </div>
    </div>
  );
}
