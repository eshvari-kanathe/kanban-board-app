import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  moveTask,
  setConfirmDelete,
  updateTask,
} from "../redux/slices/boardSlice";
import { logout } from "../redux/slices/authSlice";
import { IoAdd } from "react-icons/io5";
import Column from "../components/Column";
import AddTaskModal from "../components/AddTaskModal";
import SearchSort from "../components/SearchSort";
import { toast } from "react-toastify";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { columns, tasks, searchText, sortOrder } = useSelector(
    (state) => state.board
  );

  // state for add and delete modal
  const [taskModal, setTaskModal] = useState({
    isOpen: false,
    mode: "add",
    task: { id: null, title: "", description: "", status: "todo" },
  });

  // filter and sorting
  const tasksByColumn = useMemo(() => {
    const text = searchText.toLowerCase();
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(text)
    );
    const sorted = [...filtered].sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
    const map = {};
    columns.forEach((col) => (map[col.id] = []));
    sorted.forEach((task) => {
      if (map[task.status]) map[task.status].push(task);
    });
    return map;
  }, [tasks, columns, searchText, sortOrder]);

  const openAddModal = (status = "todo") =>
    setTaskModal({
      isOpen: true,
      mode: "add",
      task: { id: null, title: "", description: "", status },
    });

  const openEditModal = (task) =>
    setTaskModal({ isOpen: true, mode: "edit", task: { ...task } });

  const closeModal = () =>
    setTaskModal({
      isOpen: false,
      mode: "add",
      task: { id: null, title: "", description: "", status: "todo" },
    });

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const { id, title, description, status } = taskModal.task;
    if (!title.trim()) return;
    if (taskModal.mode === "add") {
      dispatch(
        addTask({
          title,
          description,
          status,
          createdAt: new Date().toISOString(),
        })
      );
      toast.success("Task Created");
    } else {
      dispatch(updateTask({ id, title, description, status }));
      toast.success("Task Updated");
    }
    closeModal();
  };

  const handleDeleteClick = (id) => {
    dispatch(setConfirmDelete({ isOpen: true, taskId: id }));
  };

  const handleLogout = () => dispatch(logout());

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white rounded-xl shadow flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 gap-4">
          <div className="flex-1 w-full sm:w-auto">
            <h1 className="text-xl text-black font-extrabold">Kanban Board</h1>
            <p className="text-sm text-slate-500">Task tracker</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-200 text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="bg-white rounded-xl shadow px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xl text-black font-extrabold">Tasks</p>

          {/* RIGHT — Search + Sort + Add */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Search + Sort grouped together */}
            <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
              <div className="flex-1 min-w-[200px]">
                <SearchSort />
              </div>
            </div>

            {/* Add Task Button */}
            <button
              type="button"
              onClick={() => openAddModal("todo")}
              className="flex items-center gap-2 px-4 py-2 text-white bg-slate-900 rounded-lg 
                 hover:bg-slate-700 active:scale-95 transition-all shadow-md 
                 w-full sm:w-auto justify-center"
            >
              <IoAdd className="text-lg" /> Add task
            </button>
          </div>
        </section>

        <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasksByColumn[column.id] || []}
              openAddModal={openAddModal}
              startEditing={openEditModal}
              deleteTask={handleDeleteClick}
              onDropTask={(e, targetColId) => {
                const taskId = e.dataTransfer.getData("text/plain");
                if (taskId)
                  dispatch(moveTask({ taskId, targetStatus: targetColId }));
              }}
            />
          ))}
        </main>
      </div>

      <AddTaskModal
        isOpen={taskModal.isOpen}
        onClose={closeModal}
        onSubmit={handleTaskSubmit}
        task={taskModal.task}
        setTask={(task) => setTaskModal({ ...taskModal, task })}
        title={taskModal.mode === "add" ? "Add Task" : "Edit Task"}
      />
      <DeleteConfirmModal />
    </div>
  );
};

export default Dashboard;
