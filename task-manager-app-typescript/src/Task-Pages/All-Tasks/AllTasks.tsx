import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { Completion } from "../../components/Completion";
import { Sorting } from "../../components/Sorting";

export {TaskList} from "../TaskList";
import type { Task } from "../../App";
import "./AllTasks.css";
import dayjs from "dayjs";
import { useState, type ChangeEvent } from "react";
import { TaskList } from "../TaskList";
interface AllTasksProps {
  tasks: Task[];
  onOpenTaskModal: () => void;
  onOpenEditTaskModal: (task: Task) => void;
  handleDeleteTask: (taskId: string) => void;
  handleCompletedTasks: (taskId: string) => void;
  handleClearCompletedTasks: () => void;
  openMenuId: string | null;
  setOpenMenuId: (taskId: string | null) => void;
  sortBy: string;
  handleSortChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  searchQuery: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  filteredTasks: Task[];
  deleteConfirmationTaskId: string | null;
  setDeleteConfirmationTaskId: (taskId: string | null) => void;
}
export function AllTasks({
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
}: AllTasksProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <title>All Tasks</title>

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
            currentPage="All tasks"
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
                  <h2>All tasks</h2>
                  <p>{filteredTasks.length} things in view</p>
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
                  <button
                    className="add-task-link"
                    type="button"
                    onClick={onOpenTaskModal}
                  >
                    <span aria-hidden="true">+</span> Add task
                  </button>
                </div>
              </div>
              <Sorting handleSortChange={handleSortChange} sortBy={sortBy} />
              <div className="task-list">
                {!filteredTasks ||
                  (filteredTasks.length === 0 && (
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
                  ))}
                <TaskList tasks={filteredTasks} handleCompletedTasks={handleCompletedTasks} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} onOpenEditTaskModal={onOpenEditTaskModal} handleDeleteTask={handleDeleteTask} deleteConfirmationTaskId={deleteConfirmationTaskId} setDeleteConfirmationTaskId={setDeleteConfirmationTaskId} />
                
              </div>
            </section>
            <Completion tasks={tasks} />
          </div>
        </main>
      </div>
    </>
  );
}
