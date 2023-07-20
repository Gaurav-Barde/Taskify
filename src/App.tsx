import { useState } from "react";
import TaskInputField from "./components/TaskInputField";
import TaskList from "./components/TaskList";
import { Task } from "./model";

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      setTasks([...tasks, { id: Date.now(), task: task, isComplete: false }]);
    }
    setTask("");
  };

  return (
    <div className="flex flex-col flex-1 h-full items-center py-8 px-4 bg-customDark">
      <h1 className="text-white text-7xl mb-8">Taskify</h1>
      <TaskInputField
        task={task}
        setTask={setTask}
        handleAddTask={handleAddTask}
      />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;
