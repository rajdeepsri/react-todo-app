import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Todo from "./components/Todo";

const App = () => {
  const [todo, setTodo] = useState({ text: "", id: "", isDone: false });
  const [isEditing, setIsEditing] = useState(false);
  const [allTodos, setAllTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const addTodo = () => {
    const updatedTodos = [...allTodos, { ...todo, id: uuidv4() }];
    setAllTodos(updatedTodos);
    setTodo({ text: "", id: "", isDone: false });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id) => {
    const updatedTodos = allTodos.filter((todo) => todo.id !== id);
    setAllTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const editTodo = (id) => {
    const requiredTodo = allTodos.find((todo) => todo.id === id);
    setTodo(requiredTodo);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const currentTodo = todo;
    const updatedTodos = allTodos.map((todo) =>
      todo.id === currentTodo.id ? currentTodo : todo
    );
    setAllTodos(updatedTodos);
    setTodo({ text: "", id: "", isDone: false });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setIsEditing(false);
  };

  const deleteAllTodos = () => {
    const que = window.confirm("do you want to delete all todos?");
    if (!que) return;
    localStorage.removeItem("todos");
    setAllTodos([]);
  };

  const handleCompleteTask = (e, id) => {
    const checkedValue = e.target.checked;
    const requiredTodo = allTodos.find((todo) => todo.id === id);
    const updatedTodo = { ...requiredTodo, isDone: checkedValue };
    const updatedAllTodos = allTodos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );
    setAllTodos(updatedAllTodos);
    localStorage.setItem("todos", JSON.stringify(updatedAllTodos));
  };

  return (
    <main className="min-h-[100dvh] bg-neutral-950 flex flex-col py-8 text-white items-center gap-4">
      <h1 className="text-4xl font-semibold text-gray-200 my-4">Todo List</h1>
      <div className="flex gap-4 items-center ">
        <input
          type="text"
          value={todo.text}
          onChange={(e) => setTodo({ ...todo, text: e.target.value })}
          placeholder="Enter your todo..."
          className="bg-neutral-900 py-3 px-4 sm:w-[20rem] focus:bg-neutral-800 transition-all duration-100 border-none outline-none rounded-lg"
        />
        {isEditing ? (
          <button
            className="bg-cyan-600 text-gray-800 font-semibold px-6 sm:px-10 border-none outline-none rounded-lg transition-all duration-300 hover:bg-cyan-500 h-11"
            onClick={saveEdit}
          >
            Save Edit
          </button>
        ) : (
          <button
            className="bg-cyan-600 text-gray-800 font-semibold px-6 sm:px-10 border-none outline-none rounded-lg transition-all duration-300 hover:bg-cyan-500 h-11"
            onClick={addTodo}
          >
            Add
          </button>
        )}
      </div>
      <section className="my-2 flex flex-col gap-2 px-3">
        {allTodos.length > 0 ? (
          allTodos.map((todo) => (
            <Todo
              key={todo.id}
              {...todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              handleCompleteTask={handleCompleteTask}
            />
          ))
        ) : (
          <p>No Todos to show...</p>
        )}
      </section>
      {allTodos.length > 0 && (
        <button
          className="border py-2 px-8 rounded-md bg-transparent hover:bg-neutral-800 transition-all duration-200 text-sm"
          onClick={deleteAllTodos}
        >
          Delete All
        </button>
      )}
    </main>
  );
};
export default App;
