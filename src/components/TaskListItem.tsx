import React, { useEffect, useRef, useState } from "react";
import { Task } from "../model";
import { MdModeEdit, MdDelete, MdCheckCircleOutline } from "react-icons/md";

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
    <li className="grid grid-cols-6 px-4 py-6  border-b border-gray-700 last:border-none hover:bg-slate-900 transition-colors">
      {isEdit ? (
        <form
          onSubmit={(e) => handleEditTask(e, task.id)}
          className="col-span-4"
        >
          <input
            ref={editRef}
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            className="text-white bg-transparent p-3 border border-gray-400"
          />
        </form>
      ) : (
        <div className="col-span-4 flex items-center">
          <button onClick={() => markCompleted(task.id)}>
            <MdCheckCircleOutline
              className={`text-2xl font-bold ${
                task.isComplete && "text-green-500"
              }`}
            />
          </button>
          <h3
            className={`ml-4 text-lg ${
              task.isComplete && "line-through text-gray-400"
            }`}
          >
            {task.task}
          </h3>
        </div>
      )}
      <div className="col-span-2 place-self-end flex items-center">
        <button onClick={() => setIsEdit(true)} className="mr-4">
          <MdModeEdit className="text-2xl font-bold" />
        </button>
        <button onClick={() => handleDeleteTask(task.id)}>
          <MdDelete className="text-2xl font-bold" />
        </button>
      </div>
    </li>
  );
};

export default TaskListItem;
