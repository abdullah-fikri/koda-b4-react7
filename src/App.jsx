import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPages from "./pages/MainPages";
import { TaskContext } from "./context/TaskContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPages />,
  },
]);

const App = () => {
  const [dataTask, setDataTask] = useState([]);

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("tasks"));
    if (temp) setDataTask(temp);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(dataTask));
  }, [dataTask]);

  const contextValue = {
    data: dataTask,
    setData: setDataTask,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      <RouterProvider router={router} />
    </TaskContext.Provider>
  );
};

export default App;
