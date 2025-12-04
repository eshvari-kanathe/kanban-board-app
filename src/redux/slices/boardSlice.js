import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialColumns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "testing", title: "Ready for Testing" },
  { id: "completed", title: "Completed" },
];

const initialTasks = [
  {
    id: "1",
    title: "Create wireframes",
    description: "Rough layout for main dashboard",
    status: "todo",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Set up Redux store",
    description: "Configure auth and board slices",
    status: "in-progress",
    createdAt: new Date().toISOString(),
  },
];

const boardSlice = createSlice({
  name: "board",
  initialState: {
    columns: initialColumns,
    tasks: initialTasks,
    searchText: "",
    sortOrder: "newest",
    confirmDelete: { isOpen: false, taskId: null },
  },
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
      },
      prepare: ({ title, description, status }) => ({
        payload: {
          id: nanoid(),
          title,
          description,
          status,
          createdAt: new Date().toISOString(),
        },
      }),
    },
    updateTask: (state, action) => {
      const { id, title, description, status } = action.payload;
      const existing = state.tasks.find((t) => t.id === id);
      if (existing) {
        existing.title = title;
        existing.description = description;
        existing.status = status;
      }
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((t) => t.id !== id);
    },
    moveTask: (state, action) => {
      const { taskId, targetStatus } = action.payload;
      const existing = state.tasks.find((t) => t.id === taskId);
      if (existing) {
        existing.status = targetStatus;
      }
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
      setConfirmDelete: (state, action) => {
    state.confirmDelete = action.payload;
  },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  setSearchText,
  setSortOrder,
  setConfirmDelete,
} = boardSlice.actions;

export default boardSlice.reducer;


