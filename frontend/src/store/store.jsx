import { create } from "zustand";

let id = 0;
function randomId() {
  return id++;
}

export const useTaskStore = create((set) => ({
  // Current Task
  inputTask: "",
  userTasks: [],
  trackUserInput: (newTask) => set({ inputTask: newTask }),

  addUserTask: (taskName) =>
    set((state) => ({
      userTasks: [...state.userTasks, { taskName, id: randomId() }],
    })),

  deleteUserTask: (taskName) =>
    set((state) => ({
      userTasks: state.userTasks.filter((task) => task.id !== taskName),
    })),

  // Past Task section
  pastUserTask: [],
  addPastTrack: (taskName) =>
    set((state) => ({
      pastUserTask: [...state.pastUserTask, { taskName, id: randomId() }],
    })),

  deletePastTask: (taskId) =>
    set((state) => ({
      pastUserTask: state.pastUserTask.filter((task) => task.id !== taskId),
    })),

  // Edit Task section
  editedTaskName: "",
  trackEditTask: (taskName) => set({ editedTaskName: taskName }),

  editedTaskId: "",
  trackEditId: (taskId) => set({ editedTaskId: taskId }),

  updateTask: (taskId) =>
    set((state) => ({
      userTasks: state.userTasks.map(({ id, taskName }) => {
        if (id === taskId) {
          return { id, taskName: state.editedTaskName };
        } else {
          return { id, taskName: taskName };
        }
      }),
    })),
}));
