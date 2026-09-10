import "./AddTask.css";
import { useState } from "react";
import dayjs from "dayjs";
import type { ChangeEvent } from "react";
import type { FormEvent } from "react";
import type { Task } from "../App";
import { useNavigate } from "react-router";
interface AddTaskProps {
  onClose: () => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}
export function AddTask({ onClose, tasks, setTasks }: AddTaskProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [dueDate, setDueDate] = useState(dayjs().format("YYYY-MM-DD")); // Set default due date to today

  function savedTaskTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }
  function savedTaskDescription(event: ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }
  function savedTaskPriority(event: ChangeEvent<HTMLSelectElement>) {
    setPriority(event.target.value as "LOW" | "MEDIUM" | "HIGH");
  }
  function savedTaskDueDate(event: ChangeEvent<HTMLInputElement>) {
    setDueDate(event.target.value);
  }
  const addNewTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create a new task object with the current state values and a unique ID, then update the tasks state and close the modal.
    if (!title || !priority || !dueDate) {
      alert("Please fill in mandatory fields before adding a task.");
      return;
    }
    const newTask = [
      {
        id: crypto.randomUUID(),
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate,
        completed: false,
        createdAt: dayjs().toISOString(),
      },
      ...tasks,
    ];
    setTasks(newTask);
    onClose();
    navigate("/");
  };

  return (
    <>
      <form className="add-task-page" onSubmit={addNewTask}>
        <section
          className="add-task-modal"
          role="dialog"
          aria-labelledby="add-task-title"
        >
          <div className="add-task-heading">
            <div>
              <p className="add-task-eyebrow">Make room</p>
              <h1 id="add-task-title">New task</h1>
            </div>
            <button
              className="close-task-button"
              type="button"
              aria-label="Close"
              //This button will call the onClose function passed as a prop when clicked, allowing the parent component to handle the closing of the AddTask modal.
              onClick={onClose}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="task-field task-title-field">
            <label htmlFor="task-title">What needs your attention?</label>
            <input
              required
              value={title}
              onChange={savedTaskTitle}
              id="task-title"
              type="text"
              placeholder="Give it a clear, kind name"
            />
          </div>

          <div className="task-field">
            <label htmlFor="task-notes">
              Notes <em>optional</em>
            </label>
            <textarea
              id="task-notes"
              placeholder="A little context for future you"
              rows={3}
              value={description}
              onChange={savedTaskDescription}
            />
          </div>

          <div className="task-form-row">
            <div className="task-field">
              <label htmlFor="task-priority">Priority</label>
              <select
                id="task-priority"
                value={priority}
                onChange={savedTaskPriority}
              >
                <option value="LOW">Low - gentle pace</option>
                <option value="MEDIUM">Medium - worth attention</option>
                <option value="HIGH">High - needs focus</option>
              </select>
            </div>

            <div className="task-field">
              <label htmlFor="task-due-date">Due date</label>
              <input
                id="task-due-date"
                type="date"
                placeholder="27/08/2026"
                value={dueDate}
                onChange={savedTaskDueDate}
              />
            </div>
          </div>

          <div className="add-task-actions">
            <button
              className="cancel-task-button"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button className="save-task-button" type="submit">
              Add task
            </button>
          </div>
        </section>
      </form>
    </>
  );
}
