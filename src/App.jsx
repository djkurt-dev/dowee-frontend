import { useEffect, useState } from "react";
import "./App.css";
import {
    AiOutlineCheckCircle,
    AiOutlineEdit,
    AiFillPlusCircle,
    AiOutlineUndo,
} from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { IoArrowUndoOutline } from "react-icons/io5";
import { api } from "./api/todos";
// import Todo from "./components/Todo";

function App() {
    const [todos, setTodos] = useState([]);
    const [pending, setPending] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [newTodo, setNewTodo] = useState({
        title: "",
        details: "",
        done: false,
    });
    const [selectedTodo, setSelectedTodo] = useState({
        id: "",
        title: "",
        details: "",
    });
    const [updatedTodo, setUpdatedTodo] = useState({
        id: "",
    });
    const [editMode, setEditMode] = useState(false);

    const addTodo = async () => {
        try {
            await api.post("/todos", newTodo);
            getTodos();
            setNewTodo({ title: "", details: "", done: false });
        } catch (error) {
            console.log(error);
        }
    };

    const getTodos = async () => {
        try {
            await api.get("/todos").then((res) => {
                console.log(res.data.data);
                setTodos(res.data.data);
                setPending(res.data.data.filter((todo) => todo.done === 0));
                setCompleted(res.data.data.filter((todo) => todo.done === 1));
            });
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await api.delete(`/todos/${id}`);
            getTodos();
        } catch (error) {
            console.log(error);
        }
    };

    const updateTodoStatus = async (id, doneValue) => {
        try {
            await api.put(`/todos/${id}`, { done: doneValue });
            getTodos();
        } catch (error) {
            console.log(error);
        }
    };

    const editTodo = async (id) => {
        try {
            await api.put(`/todos/${id}`, updatedTodo).then(() => {
                setSelectedTodo({ id: "", title: "", details: "" });
                setUpdatedTodo({});
                getTodos();
                setEditMode(false);
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div className="h-full px-4 md:px-48 lg:px-[500px] w-full pt-8 text-gray-800 bg-gray-800 py-8">
            <div className="flex-col justify-center max-w-1/2 py-2 mx-auto">
                <h1
                    id="app-name"
                    className="text-center text-4xl font-bold text-white"
                >
                    dowee
                </h1>
                <p className="text-center text-white">
                    by{" "}
                    <strong>
                        <i>Kurt</i>
                    </strong>
                </p>
            </div>

            <div className="flex justify-center">
                <div className="flex-col justify-center mt-8 gap-y-2">
                    {!editMode ? (
                        <div className="bg-gray-700 text-slate-200 py-4 px-4 mb-12 border border-md border-gray-300 rounded-md shadow-md">
                            <p className="text-lg my-2 text-center">Add Todo</p>
                            <input
                                required
                                value={newTodo.title}
                                onChange={(e) =>
                                    setNewTodo({
                                        ...newTodo,
                                        title: e.target.value,
                                    })
                                }
                                className="shadow my-1 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="title"
                                type="text"
                                placeholder="Title"
                            />
                            <textarea
                                required
                                value={newTodo.details}
                                onChange={(e) =>
                                    setNewTodo({
                                        ...newTodo,
                                        details: e.target.value,
                                    })
                                }
                                className="shadow my-1 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="details"
                                type="text"
                                placeholder="Details"
                            ></textarea>
                            <button
                                onClick={() => addTodo()}
                                className="w-full mt-4 cursor-pointer"
                            >
                                <AiFillPlusCircle
                                    className="mx-auto"
                                    size={40}
                                />
                            </button>
                        </div>
                    ) : (
                        <div className="bg-gray-700 text-slate-200 py-4 px-4 mb-12 border border-md border-gray-300 rounded-md shadow-md">
                            <p className="text-lg my-2 text-center">
                                Edit Todo
                            </p>
                            <input
                                required
                                value={selectedTodo.title}
                                onChange={(e) => {
                                    setSelectedTodo({
                                        ...selectedTodo,
                                        title: e.target.value,
                                    });
                                    setUpdatedTodo({
                                        ...updatedTodo,
                                        title: e.target.value,
                                    });
                                }}
                                className="shadow my-1 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="title"
                                type="text"
                                placeholder="Title"
                            />
                            <textarea
                                required
                                value={selectedTodo.details}
                                onChange={(e) => {
                                    setSelectedTodo({
                                        ...selectedTodo,
                                        details: e.target.value,
                                    });
                                    setUpdatedTodo({
                                        ...updatedTodo,
                                        details: e.target.value,
                                    });
                                }}
                                className="shadow my-1 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="details"
                                type="text"
                                placeholder="Details"
                            ></textarea>
                            <div className="flex justify-center mt-2">
                                <div className="flex gap-x-4">
                                    <button
                                        onClick={() => {
                                            setEditMode(false);
                                            setSelectedTodo({
                                                ...selectedTodo,
                                                title: "",
                                                details: "",
                                                done: "",
                                            });
                                            setUpdatedTodo({});
                                        }}
                                        className="text-red-400 mx-auto border border-red-400 rounded px-2 py-1 hover:text-gray-700 hover:bg-red-400"
                                    >
                                        <div className="flex items-center gap-x-1">
                                            <MdCancel
                                                size={15}
                                                className="cursor-pointer"
                                            />
                                            <p className="text-xs">Cancel</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => {
                                            editTodo(selectedTodo.id);
                                        }}
                                        className="text-green-500 mx-auto border border-green-500 rounded px-2 py-1 hover:text-gray-700 hover:bg-green-500"
                                    >
                                        <div className="flex items-center gap-x-1">
                                            <BiSave
                                                size={15}
                                                className="cursor-pointer"
                                            />
                                            <p className="text-xs">Save</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="text-slate-200">
                        <h1 className="text-red-400 font-medium text-lg">
                            {pending.length} | Pending
                        </h1>
                        <hr />
                        {pending.map((todo) => (
                            <>
                                {/* TODO CARD */}
                                <div
                                    key={todo.id}
                                    className="bg-gray-700 py-2 px-4 my-2 border border-md border-gray-500 rounded-md shadow-md"
                                >
                                    <div
                                        className={`${
                                            todo.done === 0
                                                ? "bg-red-400"
                                                : "bg-green-500"
                                        } text-white rounded px-2 w-[80px] h-[10px] ml-auto`}
                                    ></div>
                                    <h1 className="text-lg font-medium">
                                        {todo.title}
                                    </h1>

                                    <hr className="my-1" />
                                    <p className="text-sm">{todo.details}</p>
                                    <div className="flex justify-end gap-x-2 mt-2 items-center ">
                                        <button
                                            onClick={() => {
                                                setSelectedTodo({
                                                    ...selectedTodo,
                                                    id: todo.id,
                                                    title: todo.title,
                                                    details: todo.details,
                                                    done: todo.done,
                                                });
                                                setEditMode(true);
                                            }}
                                            className="border rounded px-2 py-1 hover:text-gray-700 hover:bg-slate-300"
                                        >
                                            <div className="flex items-center gap-x-1">
                                                <AiOutlineEdit
                                                    size={15}
                                                    className="cursor-pointer"
                                                />
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => deleteTodo(todo.id)}
                                            className="text-red-400 border border-red-400 rounded px-2 py-1 hover:text-gray-700 hover:bg-red-400"
                                        >
                                            <div className="flex items-center gap-x-1">
                                                <FaTrashAlt
                                                    size={15}
                                                    className="cursor-pointer"
                                                />
                                            </div>
                                        </button>

                                        <button
                                            onClick={() =>
                                                updateTodoStatus(
                                                    todo.id,
                                                    todo.done === 0
                                                        ? true
                                                        : false
                                                )
                                            }
                                            className="text-green-500 border border-green-500 rounded px-2 py-1 hover:text-gray-700 hover:bg-green-500"
                                        >
                                            <div className="flex items-center gap-x-1">
                                                <AiOutlineCheckCircle
                                                    size={15}
                                                    className="cursor-pointer"
                                                />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                {/* END OF TODO CARD */}
                            </>
                        ))}
                    </div>
                    <div className="text-slate-200 mt-4">
                        <h1 className="text-green-500 font-medium text-lg">
                            {completed.length} | Completed
                        </h1>
                        <hr />
                        {completed.map((todo) => (
                            <>
                                {/* TODO CARD */}
                                <div
                                    key={todo.id}
                                    className="bg-gray-700 py-2 px-4 my-2 border border-md border-gray-300 rounded-md shadow-md"
                                >
                                    <div
                                        className={`${
                                            todo.done === 0
                                                ? "bg-red-500"
                                                : "bg-green-500"
                                        } text-white rounded px-2 w-[80px] h-[10px] ml-auto`}
                                    ></div>
                                    <h1 className="text-lg font-medium">
                                        {todo.title}
                                    </h1>

                                    <hr className="my-1" />
                                    <p className="text-sm">{todo.details}</p>
                                    <div className="flex justify-end gap-x-2 mt-2 items-center ">
                                        <button
                                            onClick={() => {
                                                setSelectedTodo({
                                                    ...selectedTodo,
                                                    id: todo.id,
                                                    title: todo.title,
                                                    details: todo.details,
                                                    done: todo.done,
                                                });
                                                setEditMode(true);
                                            }}
                                            className="border rounded px-2 py-1 hover:text-gray-700 hover:bg-slate-300"
                                        >
                                            <div className="flex items-center gap-x-1">
                                                <AiOutlineEdit
                                                    size={15}
                                                    className="cursor-pointer"
                                                />
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => deleteTodo(todo.id)}
                                            className="text-red-400 border border-red-400 rounded px-2 py-1 hover:text-gray-700 hover:bg-red-400"
                                        >
                                            <div className="flex items-center gap-x-1">
                                                <FaTrashAlt
                                                    size={15}
                                                    className="cursor-pointer"
                                                />
                                            </div>
                                        </button>

                                        <button
                                            onClick={() =>
                                                updateTodoStatus(
                                                    todo.id,
                                                    todo.done === 0
                                                        ? true
                                                        : false
                                                )
                                            }
                                            className="text-green-500 border border-green-500 rounded px-2 py-1 hover:text-gray-700 hover:bg-green-500"
                                        >
                                            <div className="flex items-center gap-x-1">
                                                <AiOutlineUndo
                                                    size={15}
                                                    className="cursor-pointer"
                                                />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                {/* END OF TODO CARD */}
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
