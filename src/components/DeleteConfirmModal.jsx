import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, setConfirmDelete } from "../redux/slices/boardSlice";

const DeleteConfirmModal = () => {
  const dispatch = useDispatch();
  const { confirmDelete } = useSelector((state) => state.board);

  if (!confirmDelete.isOpen) return null;

  const handleConfirm = () => {
    dispatch(deleteTask(confirmDelete.taskId));
    dispatch(setConfirmDelete({ isOpen: false, taskId: null }));
  };

  const handleCancel = () => {
    dispatch(setConfirmDelete({ isOpen: false, taskId: null }));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4">
        <p className="text-sm text-slate-600">Are you sure you want to delete this task?</p>

        <div className="flex justify-end gap-3 pt-2">
          <button onClick={handleCancel} className="px-4 py-2 text-sm border rounded-lg text-slate-600 hover:bg-slate-100">
            Cancel
          </button>
          <button onClick={handleConfirm} className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
