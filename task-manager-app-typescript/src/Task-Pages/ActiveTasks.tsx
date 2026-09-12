import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Completion } from "../components/Completion";
import { Sorting } from "../components/Sorting";
import {TaskList} from "./TaskList";
import type { Task } from "../App";
import type { ChangeEvent } from "react";
import dayjs from "dayjs";
import { useState } from "react";

interface ActiveTasksProps {
  tasks: Task[];
  onOpenTaskModal: () => void;
  onOpenEditTaskModal: (task: Task) => void;
  handleDeleteTask: (taskId: string) => void;
  handleCompletedTasks: (taskId: string) => void;
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
export function ActiveTasks({
  tasks,
  onOpenTaskModal,
  onOpenEditTaskModal,
  handleDeleteTask,
  handleCompletedTasks,
  openMenuId,
  setOpenMenuId,
  handleSortChange,
  sortBy,
  searchQuery,
  handleSearchChange,
  filteredTasks,
  deleteConfirmationTaskId,
  setDeleteConfirmationTaskId,
}: ActiveTasksProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <title>Active Tasks</title>

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
            currentPage="Active tasks"
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
                  <h2>Active tasks</h2>
                  <p>
                    {filteredTasks.filter((task) => !task.completed).length}{" "}
                    things in view
                  </p>
                </div>
              </div>
              <Sorting handleSortChange={handleSortChange} sortBy={sortBy} />
              <div className="task-list">
                
                {filteredTasks.filter((task) => !task.completed).length ===
                  0 && (
                  <div className="empty-state">
                    <div className="empty-state-icon">
                      <i className="fa-solid fa-inbox" aria-hidden="true" />
                    </div>
                    <h2 className="empty-state-title">Nothing here yet</h2>
                    <p className="empty-state-subtitle">
                      A lighter plan starts with one clear next step.
                    </p>
                    <button
                      className="empty-state-button"
                      type="button"
                      onClick={onOpenTaskModal}
                    >
                      <span aria-hidden="true">+</span> Add a task
                    </button>
                  </div>
                )}
                <TaskList tasks={filteredTasks.filter((task) => !task.completed)} handleCompletedTasks={handleCompletedTasks} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} onOpenEditTaskModal={onOpenEditTaskModal} handleDeleteTask={handleDeleteTask} deleteConfirmationTaskId={deleteConfirmationTaskId} setDeleteConfirmationTaskId={setDeleteConfirmationTaskId}/>
                
              </div>
            </section>

            <Completion tasks={tasks} />
          </div>
        </main>
      </div>
    </>
  );
}
