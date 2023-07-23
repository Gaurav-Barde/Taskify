import { useEffect, useState } from "react";
import TaskInputField from "./components/TaskInputField";
import TaskList from "./components/TaskList";
import { Task } from "./model";

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const data = await fetch("http://localhost:8080/");
      const json = await data.json();
      setTasks(json);
    } catch (error: any) {
      console.log("Error: ", error.message);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      try {
        const data = await fetch("http://localhost:8080/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Date.now(),
            task: task,
            isComplete: false,
          }),
        });

        const json = await data.json();
        console.log("$$$", json);
      } catch (error: unknown) {
        console.log(error);
      }
      // setTasks([...tasks, { id: Date.now(), task: task, isComplete: false }]);
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
