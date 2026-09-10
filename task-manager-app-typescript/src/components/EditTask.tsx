import "./EditTasks.css";
import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import type { Task } from "../App";

interface EditTaskProps {
  onClose: () => void;
  setTasks: (tasks: Task[] | ((currentTasks: Task[]) => Task[])) => void;
  task: Task | null;
}

export function EditTask({ onClose, setTasks, task }: EditTaskProps) {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPriority, setNewPriority] = useState<"LOW" | "MEDIUM" | "HIGH">(
    "MEDIUM",
  );
  const [newDueDate, setNewDueDate] = useState("");

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(event.target.value);
  };

  const handlePriorityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setNewPriority(event.target.value as "LOW" | "MEDIUM" | "HIGH");
  };

  const handleDueDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewDueDate(event.target.value);
  };
  // Use useEffect to initialize the form fields with the current task's data when the component mounts or when the task prop changes.
  useEffect(() => {
    if (task) {
      setNewTitle(task.title);
      setNewDescription(task.description);
      setNewPriority(task.priority);
      setNewDueDate(task.dueDate);
    }
  }, [task]);
  const handleSaveChanges = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!task || !newTitle || !newPriority || !newDueDate) {
      alert("Please fill in mandatory fields before saving changes.");
      return;
    }
    // Update the task in the tasks state by mapping through the current tasks and replacing the task with the matching ID with the updated values.
    setTasks((currentTasks: Task[]) =>
      currentTasks.map((t) =>
        t.id === task.id
          ? {
              ...t,
              title: newTitle,
              description: newDescription,
              priority: newPriority,
              dueDate: newDueDate,
            }
          : t,
      ),
    );
    onClose();
  };
  return (
    <div className="edit-task-page">
      <form
        className="edit-task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-task-title"
        onSubmit={handleSaveChanges}
      >
        <div className="edit-task-heading">
          <div>
            <p className="edit-task-eyebrow">Refine the plan</p>
            <h1 id="edit-task-title">Edit task</h1>
          </div>
          <button
            className="edit-task-close"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="edit-task-field">
          <label htmlFor="edit-task-name">What needs your attention?</label>
          <input
            required
            id="edit-task-name"
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>

        <div className="edit-task-field">
          <label htmlFor="edit-task-notes">
            Notes <em>optional</em>
          </label>
          <textarea
            id="edit-task-notes"
            rows={3}
            value={newDescription}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>

        <div className="edit-task-form-row">
          <div className="edit-task-field">
            <label htmlFor="edit-task-priority">Priority</label>
            <select
              id="edit-task-priority"
              value={newPriority}
              onChange={handlePriorityChange}
            >
              <option value="LOW">Low - gentle pace</option>
              <option value="MEDIUM">Medium - worth attention</option>
              <option value="HIGH">High - needs focus</option>
            </select>
          </div>

          <div className="edit-task-field">
            <label htmlFor="edit-task-due-date">Due date</label>
            <input
              id="edit-task-due-date"
              type="date"
              value={newDueDate}
              onChange={handleDueDateChange}
            />
          </div>
        </div>

        <div className="edit-task-actions">
          <button className="edit-task-cancel" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="edit-task-save" type="submit">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
