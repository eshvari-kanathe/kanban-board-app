import React from "react";

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div
      key={task.id}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", task.id);
      }}
      className="bg-white rounded-lg shadow-sm border border-slate-200 px-3 py-3 text-sm flex flex-col gap-1 cursor-move"
    >
      <div className="flex justify-between items-start gap-2">
        <p className="font-medium text-slate-800">{task.title}</p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="text-xs px-2 py-0 h-5 rounded-md bg-slate-200 text-slate-700 hover:bg-slate-300 hover:text-slate-900 transition"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="text-xs px-2 py-0 h-5 rounded-md bg-red-200 text-red-600 hover:bg-red-300 hover:text-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-slate-600">{task.description}</p>
      )}

      <p className="text-[11px] text-slate-400 mt-1">
        {new Date(task.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default TaskCard;
