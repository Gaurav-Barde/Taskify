import React, { useEffect, useRef, useState } from "react";
import { Task } from "../model";
import {
  MdModeEdit,
  MdDelete,
  MdCheckCircleOutline,
  MdSave,
} from "react-icons/md";
import EditTaskInputField from "./EditTaskInputField";
import { BASE_URL } from "../utilities/constant";

interface Props {
  tasks: Task[];
  task: Task;
  handleDeleteTask: (id: number) => Promise<void>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskListItem = ({ tasks, task, handleDeleteTask, setTasks }: Props) => {
  const [editedTask, setEditedTask] = useState<string>(task.task);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editRef.current?.focus();
  }, [isEdit]);

  const handleEditTask = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    try {
      const data = await fetch(BASE_URL + "updatetask/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: editedTask }),
      });
      const json = await data.json();
      setTasks(
        tasks.map((task) => {
          if (task.id === json.id) {
            return json;
          }
          return task;
        })
      );
    } catch (error: any) {
      console.log("Error while updating: ", error.message);
    }
    setIsEdit(false);
  };

  const handleMarkCompleted = async (id: number) => {
    const task = tasks.find((task) => task.id === id);
    try {
      const data = await fetch(BASE_URL + "updatestatus/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_complete: !task?.is_complete }),
      });
      const json = await data.json();
      setTasks(
        tasks.map((task) => {
          if (task.id === json.id) {
            return json;
          }
          return task;
        })
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <li className="grid grid-cols-6 px-4 py-6  border-b border-gray-700 last:border-none hover:bg-slate-900 transition-colors">
      {isEdit ? (
        <EditTaskInputField
          handleEditTask={handleEditTask}
          id={task.id}
          forwardedRef={editRef}
          editedTask={editedTask}
          setEditedTask={setEditedTask}
        />
      ) : (
        <div className="col-span-4 flex items-center">
          <button onClick={() => handleMarkCompleted(task.id)}>
            <MdCheckCircleOutline
              className={`text-2xl font-bold ${
                task.is_complete && "text-green-500"
              }`}
            />
          </button>
          <h3
            className={`ml-4 text-lg ${
              task.is_complete && "line-through text-gray-400"
            }`}
          >
            {task.task}
          </h3>
        </div>
      )}
      <div
        className={`col-span-2 place-self-end flex items-center ${
          isEdit && "h-10"
        }`}
      >
        {isEdit ? (
          <button onClick={(e) => handleEditTask(e, task.id)}>
            <MdSave className="text-green-400 text-2xl font-bold" />
          </button>
        ) : (
          <button
            onClick={() => {
              !task.is_complete && setIsEdit(true);
            }}
            className="mr-4"
          >
            <MdModeEdit className="text-2xl font-bold" />
          </button>
        )}
        <button onClick={() => handleDeleteTask(task.id)}>
          <MdDelete className="text-2xl font-bold ml-2" />
        </button>
      </div>
    </li>
  );
};

export default TaskListItem;
