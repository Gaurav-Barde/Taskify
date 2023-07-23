import { useEffect, useState } from "react";
import TaskInputField from "./components/TaskInputField";
import TaskList from "./components/TaskList";
import { Task } from "./model";
import Loader from "./components/Loader";
import { BASE_URL } from "./utilities/constant";

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    setLoading(true);
    try {
      const data = await fetch(BASE_URL);
      const json = await data.json();
      setTasks(json);
    } catch (error: any) {
      console.log("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      setLoading(true);
      try {
        await fetch(BASE_URL + "create", {
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
        getTasks();
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setTask("");
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-customDark">
      {loading ? (
        <Loader />
      ) : (
        <div className="grid justify-items-center w-1/2 mx-auto py-8 px-4">
          <>
            <h1 className="bg-gradient-to-r from-gradient1-button via-gradient2-button to-gradient3-button bg-clip-text text-transparent text-7xl mb-8 h-20">
              Taskify
            </h1>
            <TaskInputField
              task={task}
              setTask={setTask}
              handleAddTask={handleAddTask}
            />
            <TaskList tasks={tasks} setTasks={setTasks} />)
          </>
        </div>
      )}
    </div>
  );
};

export default App;
