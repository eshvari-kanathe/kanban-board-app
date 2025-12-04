import React from "react";

const AddTaskModal = ({ isOpen, onClose, onSubmit, task, setTask, title }) => {
  if (!isOpen) return null;
  console.log(task,"All TAsk")

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4"
      >
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>

        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Task title"
          required
        />

        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Description"
          rows={3}
        />

        <select
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="testing">Ready for Testing</option>
          <option value="completed">Completed</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-lg text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskModal;
