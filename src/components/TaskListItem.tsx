import React, { useEffect, useRef, useState } from "react";
import { Task } from "../model";

interface Props {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskListItem = ({ task, setTasks }: Props) => {
  const [editedTask, setEditedTask] = useState<string>(task.task);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editRef.current?.focus();
  }, [isEdit]);

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks: Task[]) =>
      prevTasks.filter((item: Task) => item.id !== id)
    );
  };

  const handleEditTask = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, task: editedTask } : task
      )
    );
    setIsEdit(false);
  };

  const markCompleted = (id: number) => {
    setTasks((prevTasks: Task[]) =>
      prevTasks.map((task: Task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  return (
    <li>
      {isEdit ? (
        <form onSubmit={(e) => handleEditTask(e, task.id)}>
          <input
            ref={editRef}
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
        </form>
      ) : (
        <h3>{task.task}</h3>
      )}
      <div>
        {isEdit ? (
          <button onClick={(e) => handleEditTask(e, task.id)}>Save</button>
        ) : (
          <button onClick={() => setIsEdit(true)}>Edit</button>
        )}
        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        <button onClick={() => markCompleted(task.id)}>Completed</button>
      </div>
    </li>
  );
};

export default TaskListItem;
