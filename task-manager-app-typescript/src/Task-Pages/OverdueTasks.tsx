import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Completion } from "../components/Completion";
import { Sorting } from "../components/Sorting";
import { TaskCheckbox } from "../components/TaskCheckbox";
import { TaskList } from "./TaskList";
import dayjs from "dayjs";
import { useState } from "react";
import type { Task } from "../App";
import type { ChangeEvent } from "react";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
interface OverdueTasksProps {
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
export function OverdueTasks({
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
}: OverdueTasksProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
 const tasksWithTimeDiff = filteredTasks
  .filter(task => dayjs(task.dueDate).isBefore(dayjs(), "day") && !task.completed)
  .map(task => ({
    ...task,
    daysOverdue: Math.floor((dayjs().valueOf() - dayjs(task.dueDate).valueOf()) / (1000 * 60 * 60 * 24))
  }));



  return (
    <>
      <title>Overdue Tasks</title>

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
            currentPage="Overdue tasks"
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
                  <h2>Overdue tasks</h2>
                  <p>
                    {
                      filteredTasks.filter(
                        (task) =>
                          dayjs(task.dueDate).isBefore(dayjs(), "day") &&
                          !task.completed,
                      ).length
                    }{" "}
                    things in view
                  </p>
                </div>
              </div>
              <Sorting handleSortChange={handleSortChange} sortBy={sortBy} />
              <div className="task-list">
                {/*
                    Filter the tasks to only show those with a status of "active"
                  */}
                {filteredTasks
                  // Filter the tasks to only show those that are overdue and not completed
                  //I added 'day' after dayjs() to ensure that the comparison is done at the day level, ignoring the time aspect.
                  .filter(
                    (task) =>
                      dayjs(task.dueDate).isBefore(dayjs(), "day") &&
                      !task.completed,
                  )
                  .map((task) => {
                    const TimeDifferenceMs =
                      dayjs().valueOf() - dayjs(task.dueDate).valueOf();
                    const TimeDifferenceDays = Math.floor(
                      TimeDifferenceMs / (1000 * 60 * 60 * 24),
                    );
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
                            <span>
                              {TimeDifferenceDays === 1
                                ? "1 day ago"
                                : `${TimeDifferenceDays} days ago`}
                            </span>
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
