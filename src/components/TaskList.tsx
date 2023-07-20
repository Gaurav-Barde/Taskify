import { memo } from "react";
import { Task } from "../model";
import TaskListItem from "./TaskListItem";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList = memo(({ tasks, setTasks }: Props) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} setTasks={setTasks} />
      ))}
    </ul>
  );
});

export default TaskList;
