const Todo = ({
  text,
  id,
  deleteTodo,
  editTodo,
  isDone,
  handleCompleteTask,
}) => {
  return (
    <div className="flex items-center bg-neutral-900 py-2 px-2 sm:px-3 rounded-lg gap-3">
      <div className="flex items-center gap-2 w-full">
        <input
          type="checkbox"
          checked={isDone}
          onChange={(e) => handleCompleteTask(e, id)}
        />
        <p
          className={`w-full sm:w-72 capitalize text-gray-200 text-sm sm:text-md ${
            isDone && "line-through text-neutral-400"
          }`}
        >
          {text}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="bg-blue-600 hover:bg-blue-800 py-1 px-2 sm:px-4 rounded-sm text-sm transition-all duration-200 text-gray-300 font-medium"
          onClick={() => editTodo(id)}
        >
          Edit
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-sm py-1 px-2 sm:px-4 rounded-sm transition-all duration-200 text-gray-300 font-medium"
          onClick={() => deleteTodo(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default Todo;
