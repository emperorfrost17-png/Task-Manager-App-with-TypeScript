import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Completion } from "../components/Completion";
import { Sorting } from "../components/Sorting";

import { TaskList } from "./TaskList";
import type { Task } from "../App";
import type { ChangeEvent } from "react";
import dayjs from "dayjs";
import { useState } from "react";
interface CompletedTasksProps {
  tasks: Task[];
  onOpenTaskModal: () => void;
  onOpenEditTaskModal: (task: Task) => void;
  handleDeleteTask: (taskId: string) => void;
  handleCompletedTasks: (taskId: string) => void;
  handleClearCompletedTasks: () => void;
  openMenuId: string | null;
  setOpenMenuId: (taskId: string | null) => void;
  sortBy: "dateCreated" | "priority" | "dueDate" | "title";
  handleSortChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  searchQuery: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  filteredTasks: Task[];
  deleteConfirmationTaskId: string | null;
  setDeleteConfirmationTaskId: (taskId: string | null) => void;
}
export function CompletedTasks({
  tasks,
  onOpenTaskModal,
  onOpenEditTaskModal,
  handleDeleteTask,
  handleCompletedTasks,
  handleClearCompletedTasks,
  openMenuId,
  setOpenMenuId,
  sortBy,
  handleSortChange,
  searchQuery,
  handleSearchChange,
  filteredTasks,
  deleteConfirmationTaskId,
  setDeleteConfirmationTaskId,
}: CompletedTasksProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <title>Completed Tasks</title>

      <div className="app-shell">
        <Sidebar
          filteredTasks={filteredTasks}
          onOpenTaskModal={onOpenTaskModal}
          isSidebarOpen={isSidebarOpen}
          onCloseSidebar={closeSidebar}
        />
        <main className="main-content">
          <Header
            onOpenTaskModal={onOpenTaskModal}
            currentPage="Completed tasks"
            onToggleSidebar={toggleSidebar}
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
          />
          <div className="workspace-area">
            <section className="body-main">
              <p className="date-label">{dayjs().format("dddd, MMMM D")}</p>
              <h1>
                A little lighter
                <br />
                <span>today.</span>
              </h1>
              <p className="intro-copy">
                Keep the important things close. Everything else can wait its
                turn.
              </p>

              <div className="task-section-heading">
                <div>
                  <h2>Completed tasks</h2>
                  <p>
                    {filteredTasks.filter((task) => task.completed).length}{" "}
                    things in view
                  </p>
                </div>
                <div className="task-heading-actions">
                  <button
                    className="clear-completed-button"
                    type="button"
                    onClick={handleClearCompletedTasks}
                  >
                    <span aria-hidden="true">
                      <i className="fa-solid fa-trash-can" aria-hidden="true" />
                    </span>{" "}
                    Clear completed tasks
                  </button>
                </div>
              </div>
              <Sorting handleSortChange={handleSortChange} sortBy={sortBy} />
              <div className="task-list">
                <TaskList
                  tasks={filteredTasks.filter((task) => task.completed)}
                  handleCompletedTasks={handleCompletedTasks}
                  openMenuId={openMenuId}
                  setOpenMenuId={setOpenMenuId}
                  onOpenEditTaskModal={onOpenEditTaskModal}
                  handleDeleteTask={handleDeleteTask}
                  deleteConfirmationTaskId={deleteConfirmationTaskId}
                  setDeleteConfirmationTaskId={setDeleteConfirmationTaskId}
                />
              </div>
            </section>

            <Completion tasks={tasks} />
          </div>
        </main>
      </div>
    </>
  );
}
