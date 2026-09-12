import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import type { ChangeEvent } from "react";
import { AllTasks } from "./Task-Pages/All-Tasks/AllTasks";
import { ActiveTasks } from "./Task-Pages/ActiveTasks";
import { CompletedTasks } from "./Task-Pages/CompletedTasks";
import { OverdueTasks } from "./Task-Pages/OverdueTasks";
import { AddTask } from "./components/AddTask";
import { EditTask } from "./components/EditTask";

import "./App.css";

export interface Task {
  readonly id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
  completed: boolean;
  createdAt: string;
}
function App() {
  const storedTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState<Task[]>(
    storedTasks ? JSON.parse(storedTasks) : [],
  );
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"dateCreated" | "priority" | "dueDate" | "title">("dateCreated"); // Default sorting by "dateCreated"
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [deleteConfirmationTaskId, setDeleteConfirmationTaskId] = useState<
    string | null
  >(null); // State for the task ID to be deleted
  const onOpenEditTaskModal = (task: Task) => {
    setEditingTask(task); // Set the task to be edited in state
    setIsEditTaskModalOpen(true);
    setOpenMenuId(null); // Close the options menu when opening the edit modal
  };
  const onCloseEditTaskModal = () => {
    setIsEditTaskModalOpen(false);
  };
  const onOpenTaskModal = () => {
    setIsTaskModalOpen(true);
  };
  const onCloseTaskModal = () => {
    setIsTaskModalOpen(false);
  };
  // Function to handle the deletion of a task by its ID. It updates the tasks state by filtering out the task with the specified ID.

  //explanation: This function takes a task ID as an argument and updates the tasks state by creating a new array that excludes the task with the matching ID. It uses the filter method to iterate through the current tasks and return only those whose IDs do not match the provided taskIdToDelete. This effectively removes the specified task from the list of tasks.
  const handleDeleteTask = (taskIdToDelete: string) => {
    setTasks((currentTasks: Task[]) =>
      currentTasks.filter((task) => task.id !== taskIdToDelete),
    );
  };
  const handleCompletedTasks = (completedTasksId: string) => {
    setTasks((currentTasks: Task[]) =>
      currentTasks.map((task) =>
        // This function takes a task ID as an argument and updates the tasks state by toggling the completed status of the task with the matching ID. It uses the map method to iterate through the current tasks and return a new array where the task with the specified ID has its completed property inverted (true becomes false, and false becomes true). All other tasks remain unchanged.
        task.id === completedTasksId
          ? { ...task, completed: !task.completed }
          : task,
      ),
    );
  };
  const handleClearCompletedTasks = () => {
    setTasks((currentTasks: Task[]) =>
      currentTasks.filter((task) => !task.completed),
    );
  };
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextSortBy = event.target.value as "dateCreated" | "priority" | "dueDate" | "title";
    setSortBy(nextSortBy);
  };
  const sortedTasks = [...tasks].sort((a, b) => {
    // First, sort by completion status: incomplete tasks come first
    if (a.completed !== b.completed) {
      // If a is completed and b is not, a should come after b (return 1)
      // If a is not completed and b is, a should come before b (return -1)
      return a.completed ? 1 : -1;
    }
    if (sortBy === "dateCreated") {
      return dayjs(a.createdAt).diff(dayjs(b.createdAt));
    }
    if (sortBy === "priority") {
      const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
      // keyof typeof priorityOrder extracts the keys ("HIGH" | "MEDIUM" | "LOW")
      // as keyof typeof priorityOrder tells TypeScript the value is definitely one of these keys
      // ?? 0 provides a fallback to prevent undefined from breaking arithmetic
      return (
        (priorityOrder[a.priority as keyof typeof priorityOrder] ?? 0) -
        (priorityOrder[b.priority as keyof typeof priorityOrder] ?? 0)
      );
    }
    if (sortBy === "dueDate") {
      return dayjs(a.dueDate).diff(dayjs(b.dueDate));
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const filteredTasks = sortedTasks.filter((task) =>
    // Filter the tasks based on the search query. It checks if the task title includes the search query (case-insensitive) and returns only those tasks that match the criteria.
    task.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = localStorage.getItem("tasks");
    // If tasks exist in local storage, update the state with them
    if (storedTasks) {
      // Parse the stored tasks and set them to the state
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever the tasks state changes
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <>
      {/*
      this is the main App component that manages the state of tasks and routes to different task pages. It uses React Router for navigation and local storage to persist tasks across sessions. The AddTask component is conditionally rendered based on the isTaskModalOpen state, allowing users to add new tasks. The useEffect hooks handle loading and saving tasks to local storage.
    */}
      {isTaskModalOpen && (
        <AddTask onClose={onCloseTaskModal} tasks={tasks} setTasks={setTasks} />
      )}
      {isEditTaskModalOpen && (
        <EditTask
          onClose={onCloseEditTaskModal}
          setTasks={setTasks}
          task={editingTask} // Pass the task to be edited as a prop to the EditTask component
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <AllTasks
              tasks={tasks}
              onOpenTaskModal={onOpenTaskModal}
              onOpenEditTaskModal={onOpenEditTaskModal}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              handleDeleteTask={handleDeleteTask}
              handleCompletedTasks={handleCompletedTasks}
              handleClearCompletedTasks={handleClearCompletedTasks}
              handleSortChange={handleSortChange}
              sortBy={sortBy}
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              filteredTasks={filteredTasks}
              deleteConfirmationTaskId={deleteConfirmationTaskId}
              setDeleteConfirmationTaskId={setDeleteConfirmationTaskId}
            />
          }
        />
        <Route
          path="/active"
          element={
            <ActiveTasks
              tasks={tasks}
              onOpenTaskModal={onOpenTaskModal}
              onOpenEditTaskModal={onOpenEditTaskModal}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              handleDeleteTask={handleDeleteTask}
              handleCompletedTasks={handleCompletedTasks}
              handleSortChange={handleSortChange}
              sortBy={sortBy}
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              filteredTasks={filteredTasks}
              deleteConfirmationTaskId={deleteConfirmationTaskId}
              setDeleteConfirmationTaskId={setDeleteConfirmationTaskId}
            />
          }
        />
        <Route
          path="/completed"
          element={
            <CompletedTasks
              tasks={tasks}
              onOpenTaskModal={onOpenTaskModal}
              onOpenEditTaskModal={onOpenEditTaskModal}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              handleDeleteTask={handleDeleteTask}
              handleCompletedTasks={handleCompletedTasks}
              handleClearCompletedTasks={handleClearCompletedTasks}
              handleSortChange={handleSortChange}
              sortBy={sortBy}
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              filteredTasks={filteredTasks}
              deleteConfirmationTaskId={deleteConfirmationTaskId}
              setDeleteConfirmationTaskId={setDeleteConfirmationTaskId}
            />
          }
        />
        <Route
          path="/overdue"
          element={
            <OverdueTasks
              tasks={tasks}
              onOpenTaskModal={onOpenTaskModal}
              onOpenEditTaskModal={onOpenEditTaskModal}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              handleDeleteTask={handleDeleteTask}
              handleCompletedTasks={handleCompletedTasks}
              handleSortChange={handleSortChange}
              sortBy={sortBy}
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              filteredTasks={filteredTasks}
              deleteConfirmationTaskId={deleteConfirmationTaskId}
              setDeleteConfirmationTaskId={setDeleteConfirmationTaskId}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
