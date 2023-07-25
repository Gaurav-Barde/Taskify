import { memo } from "react";
import { Task } from "../model";
import TaskListItem from "./TaskListItem";

interface Props {
  tasks: Task[];
  handleDeleteTask: (id: number) => Promise<void>;
  getTasks: () => void;
}

const TaskList = memo(({ tasks, handleDeleteTask, getTasks }: Props) => {
  return (
    tasks.length && (
      <ul className="w-3/4 text-white my-8 bg-slate-800 border border-slate-600 rounded-md">
        {tasks.map((task) => (
          <TaskListItem
            key={task.id}
            tasks={tasks}
            task={task}
            handleDeleteTask={handleDeleteTask}
            getTasks={getTasks}
          />
        ))}
      </ul>
    )
  );
});

export default TaskList;
