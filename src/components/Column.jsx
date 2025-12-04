import React from "react";
import { IoAdd } from "react-icons/io5";
import TaskCard from "./TaskCart";

const Column = ({ column, tasks, onDropTask, openAddModal, startEditing, deleteTask }) => {
  return (
    <div
      className="bg-white rounded-xl shadow border border-slate-200 flex flex-col"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDropTask(e, column.id)}
    >
      <div className="px-4 py-3 flex items-center justify-between gap-2 bg-slate-50">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-700">{column.title}</h2>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>

        <button
          type="button"
          onClick={() => openAddModal(column.id)}
          className="flex items-center justify-center w-7 h-7 rounded-full text-black hover:text-slate-900 leading-none hover:text-xl active:scale-95 transition-all"
        >
          <IoAdd />
        </button>
      </div>

      <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[60vh] bg-slate-50">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => startEditing(task)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}

        {tasks.length === 0 && (
          <p className="text-xs text-slate-400 text-center py-4">
            No tasks here yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Column;
