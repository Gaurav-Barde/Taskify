import { IoAddCircleOutline } from "react-icons/io5";

interface Props {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleAddTask: (e: React.FormEvent) => void;
}

const TaskInputField = ({ task, setTask, handleAddTask }: Props) => {
  return (
    <form onSubmit={handleAddTask} className="grid grid-cols-4 w-1/2">
      <input
        type="text"
        placeholder="Add Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="col-span-3 text-white bg-transparent p-3 border border-gray-400"
      />
      <button
        onClick={handleAddTask}
        className="flex justify-center bg-gray-600 border border-gray-500"
      >
        <IoAddCircleOutline className="text-purple-300 text-5xl" />
      </button>
    </form>
  );
};

export default TaskInputField;
