import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Completion } from "../components/Completion";
import { Sorting } from "../components/Sorting";
import { TaskCheckbox } from "../components/TaskCheckbox";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
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
  sortBy: string;
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
                {filteredTasks
                  .filter((task) => !task.completed)
                  .map((task) => {
                    return (
                      <article className="task-card" key={task.id}>
                        <TaskCheckbox
                          completed={task.completed}
                          title={task.title}
                          onToggle={() => handleCompletedTasks(task.id)}
                        />
                        <div>
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          <div className="task-meta">
                            <span
                              className={`priority-tag priority-tag-${task.priority}`}
                            >
                              {task.priority}
                            </span>
                            <span>{dayjs(task.dueDate).format("MMM D")}</span>
                            <span>
                              {" "}
                              Created At:{" "}
                              {dayjs(task.createdAt).format("h:mm A")}
                            </span>
                          </div>
                        </div>
                        <button
                          className="task-more-button"
                          type="button"
                          aria-label={`More options for ${task.title}`}
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === task.id ? null : task.id,
                            )
                          }
                        >
                          <span aria-hidden="true">...</span>
                        </button>

                        {openMenuId === task.id && (
                          <div className="task-options-menu">
                            <button
                              type="button"
                              onClick={() => onOpenEditTaskModal(task)}
                            >
                              <span aria-hidden="true">✎</span> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmationTaskId(task.id)}
                            >
                              <i
                                className="fa-solid fa-trash-can"
                                aria-hidden="true"
                              />{" "}
                              Delete
                            </button>
                          </div>
                        )}
                        {deleteConfirmationTaskId === task.id && (
                          <DeleteConfirmation
                            taskId={task.id}
                            handleDeleteTask={handleDeleteTask}
                            setDeleteConfirmationTaskId={
                              setDeleteConfirmationTaskId
                            }
                            setOpenMenuId={setOpenMenuId}
                          />
                        )}
                      </article>
                    );
                  })}
              </div>
            </section>

            <Completion tasks={tasks} />
          </div>
        </main>
      </div>
    </>
  );
}
