import React from "react";
import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
const Todo = () => {
    return (
        <div className="bg-white w-[650px] py-4 px-6 my-6 border border-md border-gray-300 rounded-md shadow-md">
            <h1 className="text-xl font-bold">Lorem ipsum dolor sit amet</h1>
            <hr className="my-2" />
            <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="flex justify-end gap-x-2 items-center ">
                <AiOutlineEdit size={20} className="cursor-pointer" />
                <FaTrashAlt size={20} className="cursor-pointer" />
                <AiOutlineCheckCircle size={20} className="cursor-pointer" />
            </div>
        </div>
    );
};

export default Todo;
