import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { Completion } from "../../components/Completion";
import { Sorting } from "../../components/Sorting";
import { TaskCheckbox } from "../../components/TaskCheckbox";
import type { Task } from "../../App";
import "./AllTasks.css";
import dayjs from "dayjs";
import { useState, type ChangeEvent } from "react";
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
                {filteredTasks.map((task) => {
                  return (
                    <article
                      className="task-card"
                      key={task.id}
                      style={{ opacity: task.completed ? "0.7" : "1" }}
                    >
                      <TaskCheckbox
                        completed={task.completed} 
                        title={task.title}
                        onToggle={() => handleCompletedTasks(task.id)}
                      />

                      <div>
                        <h3
                          style={{
                            textDecoration: task.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {task.title}
                        </h3>
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
                            Created At: {dayjs(task.createdAt).format("h:mm A")}
                          </span>
                        </div>
                      </div>
                      <button
                        className="task-more-button"
                        type="button"
                        aria-label={`More options for ${task.title}`}
                        onClick={() => {
                          // Toggle the openMenuId state to show or hide the options menu for the clicked task. If the menu is already open for this task, it will close it; otherwise, it will open it.
                          setOpenMenuId(
                            openMenuId === task.id ? null : task.id,
                          );
                        }}
                      >
                        <span aria-hidden="true">...</span>
                      </button>
                      {/*
                        Conditionally render the task options menu if the openMenuId matches the current task's ID. This menu provides options to edit or delete the task.
                      */}
                      {openMenuId === task.id && (
                        <div className="task-options-menu" >
                          <button
                            type="button"
                            onClick={() => onOpenEditTaskModal(task)}
                          >
                            <span aria-hidden="true">✎</span> Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <i
                              className="fa-solid fa-trash-can"
                              aria-hidden="true"
                            />{" "}
                            Delete
                          </button>
                        </div>
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
