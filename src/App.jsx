import { useEffect, useState } from "react";
import "./App.css";
import {
    AiOutlineCheckCircle,
    AiOutlineEdit,
    AiFillPlusCircle,
} from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
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
        title: "",
        details: "",
    });
    const [updatedTodo, setUpdatedTodo] = useState({});

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

    const checkUncheckTodo = async (id, doneValue) => {
        try {
            await api.put(`/todos/${id}`, { done: doneValue });
            getTodos();
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
                    Made with <strong>ReactJS </strong> +{" "}
                    <strong>Laravel</strong> by <i>Kurt</i>
                </p>
            </div>

            <div className="flex justify-center">
                <div className="flex-col justify-center mt-8 gap-y-2">
                    <div className="bg-gray-700 text-slate-200 py-4 px-4 mb-12 border border-md border-gray-300 rounded-md shadow-md">
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

                        {/* {JSON.stringify(newTodo)} */}
                        <button
                            onClick={() => addTodo()}
                            className="w-full mt-4 cursor-pointer"
                        >
                            <AiFillPlusCircle className="mx-auto" size={40} />
                        </button>
                    </div>
                    {/* EDIT TODO */}
                    <div className="bg-gray-700 text-slate-200 py-4 px-4 mb-12 border border-md border-gray-300 rounded-md shadow-md">
                        <input
                            required
                            value={selectedTodo.title}
                            onChange={(e) =>
                                setUpdatedTodo({
                                    ...updatedTodo,
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
                            value={selectedTodo.details}
                            onChange={(e) =>
                                setUpdatedTodo({
                                    ...updatedTodo,
                                    details: e.target.value,
                                })
                            }
                            className="shadow my-1 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="details"
                            type="text"
                            placeholder="Details"
                        ></textarea>

                        {/* {JSON.stringify(selectedTodo)} */}
                        <div className="flex justify-center mt-2">
                            <div className="flex gap-x-4">
                                <button className="mx-auto border rounded px-2 py-1 hover:text-gray-700 hover:bg-slate-300">
                                    <div className="flex items-center gap-x-1">
                                        <MdCancel
                                            size={20}
                                            className="cursor-pointer"
                                        />
                                        <p className="text-sm">Cancel</p>
                                    </div>
                                </button>

                                <button className="mx-auto border rounded px-2 py-1 hover:text-gray-700 hover:bg-slate-300">
                                    <div className="flex items-center gap-x-1">
                                        <BiSave
                                            size={20}
                                            className="cursor-pointer"
                                        />
                                        <p className="text-sm">Save</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* END OF EDIT TODO */}
                    <div className="text-slate-200">
                        <h1 className="text-red-500 font-bold text-lg">
                            Pending
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
                                            onClick={() =>
                                                setSelectedTodo({
                                                    ...selectedTodo,
                                                    title: todo.title,
                                                    details: todo.details,
                                                    done: todo.done,
                                                })
                                            }
                                            className="border rounded px-2 py-1 hover:text-gray-700 hover:bg-slate-300"
                                        >
                                            <div className="flex items-center gap-x-1">
                                                <AiOutlineEdit
                                                    size={20}
                                                    className="cursor-pointer"
                                                />
                                                <p className="text-sm">Edit</p>
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
                                                <p className="text-sm">
                                                    Delete
                                                </p>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() =>
                                                checkUncheckTodo(
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
                                                    size={20}
                                                    className="cursor-pointer"
                                                />
                                                <p className="text-sm">Done</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                {/* END OF TODO CARD */}
                            </>
                        ))}
                    </div>
                    <div className="text-slate-200 mt-4">
                        <h1 className="text-green-500 font-bold text-lg">
                            Completed
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
                                        <button className="border rounded px-2 py-1 hover:text-gray-700 hover:bg-slate-300">
                                            <div className="flex items-center gap-x-1">
                                                <AiOutlineEdit
                                                    size={20}
                                                    className="cursor-pointer"
                                                />
                                                <p className="text-sm">Edit</p>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => deleteTodo(todo.id)}
                                            className="border rounded px-2 py-1 hover:text-gray-700 hover:bg-slate-300"
                                        >
                                            <div className="flex items-center gap-x-1">
                                                <FaTrashAlt
                                                    size={15}
                                                    className="cursor-pointer"
                                                />
                                                <p className="text-sm">
                                                    Delete
                                                </p>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() =>
                                                checkUncheckTodo(
                                                    todo.id,
                                                    todo.done === 0
                                                        ? true
                                                        : false
                                                )
                                            }
                                            className="border rounded px-2 py-1 hover:text-gray-700 hover:bg-slate-300"
                                        >
                                            <div className="flex items-center gap-x-1">
                                                <AiOutlineCheckCircle
                                                    size={20}
                                                    className="cursor-pointer"
                                                />
                                                <p className="text-sm">Undo</p>
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
