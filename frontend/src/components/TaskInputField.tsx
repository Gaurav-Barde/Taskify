import { IoAddCircleOutline } from "react-icons/io5";

interface Props {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleAddTask: (e: React.FormEvent) => void;
}

const TaskInputField = ({ task, setTask, handleAddTask }: Props) => {
  return (
    <form onSubmit={handleAddTask} className="relative w-3/4">
      <input
        type="text"
        placeholder="Add Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full text-white bg-transparent p-3 outline-none border-2 border-gray-400 focus:border-gray-50 rounded-md"
      />
      <button
        onClick={handleAddTask}
        className="absolute right-1 top-1/2 -translate-y-1/2"
      >
        <IoAddCircleOutline className="text-gray-300 text-4xl hover:text-gray-50" />
      </button>
    </form>
  );
};

export default TaskInputField;
