interface Props {
  handleEditTask: (e: React.FormEvent<HTMLFormElement>, id: number) => void;
  id: number;
  ref: React.RefObject<HTMLInputElement>;
  editedTask: string;
  setEditedTask: React.Dispatch<React.SetStateAction<string>>;
}

const EditTaskInputField = ({
  handleEditTask,
  id,
  ref,
  editedTask,
  setEditedTask,
}: Props) => {
  return (
    <form onSubmit={(e) => handleEditTask(e, id)} className="col-span-4">
      <input
        ref={ref}
        type="text"
        value={editedTask}
        onChange={(e) => setEditedTask(e.target.value)}
        className="text-white bg-transparent p-2 border border-gray-400 rounded-md outline-none focus:border-gray-100"
      />
    </form>
  );
};

export default EditTaskInputField;
