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
    <div className="w-full min-h-screen bg-customDark">
      <div className="flex flex-col items-center w-1/2 mx-auto py-8 px-4">
        <h1 className="text-center bg-gradient-to-r from-gradient1-button via-gradient2-button to-gradient3-button bg-clip-text text-transparent text-7xl mb-8 h-20">
          Taskify
        </h1>
        <TaskInputField
          task={task}
          setTask={setTask}
          handleAddTask={handleAddTask}
        />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default App;
