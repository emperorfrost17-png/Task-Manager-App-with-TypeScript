import type { Task } from "../App";
import { TaskCheckbox } from "../components/TaskCheckbox";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
import dayjs from "dayjs";

interface TaskWithOptionalOverdueDays extends Task {
  daysOverdue?: number;
}
interface TaskListProps {
  tasks: TaskWithOptionalOverdueDays[];
  handleCompletedTasks: (id: string) => void;
  onOpenEditTaskModal: (task: Task) => void;
  handleDeleteTask: (taskId: string) => void;
  deleteConfirmationTaskId: string | null;
  setDeleteConfirmationTaskId: (taskId: string | null) => void;
  openMenuId: string | null;
  setOpenMenuId: (taskId: string | null) => void;
}

export function TaskList({
  tasks,
  handleCompletedTasks,
  onOpenEditTaskModal,
  handleDeleteTask,
  deleteConfirmationTaskId,
  setDeleteConfirmationTaskId,
  openMenuId,
  setOpenMenuId,
}: TaskListProps) {
  return (
    <>
      {tasks.map((task) => {
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
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </h3>
              <p>{task.description}</p>
              <div className="task-meta">
                <span className={`priority-tag priority-tag-${task.priority}`}>
                  {task.priority}
                </span>
                <span
                  className={
                    task.daysOverdue !== undefined ? "overdue-date" : undefined
                  }
                >
                  {task.daysOverdue !== undefined
                    ? task.daysOverdue === 1
                      ? "1 day ago"
                      : `${task.daysOverdue} days ago`
                    : dayjs(task.dueDate).format("MMM D")}
                </span>
                <span>
                  {" "}
                  Created At: {dayjs(task.createdAt).format("dddd, MMMM D, YYYY")}
                </span>
              </div>
            </div>
            <button
              className="task-more-button"
              type="button"
              aria-label={`More options for ${task.title}`}
              onClick={() => {
                setOpenMenuId(openMenuId === task.id ? null : task.id);
              }}
            >
              <span aria-hidden="true">...</span>
            </button>
            {openMenuId === task.id && (
              <div className="task-options-menu">
                <button type="button" onClick={() => onOpenEditTaskModal(task)}>
                  <span aria-hidden="true">✎</span> Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmationTaskId(task.id)}
                >
                  <i className="fa-solid fa-trash-can" aria-hidden="true" />{" "}
                  Delete
                </button>
              </div>
            )}
            {deleteConfirmationTaskId === task.id && (
              <DeleteConfirmation
                taskId={task.id}
                handleDeleteTask={handleDeleteTask}
                setDeleteConfirmationTaskId={setDeleteConfirmationTaskId}
                setOpenMenuId={setOpenMenuId}
              />
            )}
          </article>
        );
      })}
    </>
  );
}
