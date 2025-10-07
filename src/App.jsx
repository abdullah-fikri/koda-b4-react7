import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddTask from "./components/AddTask";
import { PencilLine, Trash } from "lucide-react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const taskInputRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const title = taskInputRef.current.value.trim();
    if (title) {
      const newTask = { id: Date.now(), title, done: false };
      setTasks([...tasks, newTask]);
      taskInputRef.current.value = "";
      setShowInput(false);
    }
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const newTask = tasks.filter((i) => i.id !== id);
    setTasks(newTask);
  };

  const renameTask = (id, newTitle) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    inputRef.current.setAttribute("disabled", "");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-pink-50 p-6">
      {" "}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {" "}
        <Navbar />
        <div className="px-8 py-6 min-h-[400px]">
          <AddTask
            showInput={showInput}
            taskInputRef={taskInputRef}
            handleKeyPress={handleKeyPress}
          />

          <ul className="space-y-4">
            {tasks.map((task) => (
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
                    className={`bg-transparent outline-none border-b border-transparent focus:border-indigo-300 text-indigo-400 font-medium  ${
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
          tasksLength={tasks.length}
          onShowInput={() => setShowInput(true)}
        />
      </div>
    </div>
  );
}
