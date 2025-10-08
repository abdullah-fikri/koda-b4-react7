import { createContext } from "react";

export const TaskContext = createContext({
  data: [],
  setData: function () {},
});
