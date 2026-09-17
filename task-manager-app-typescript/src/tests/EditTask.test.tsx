import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import dayjs from "dayjs";
import type { Task } from "../App";
import userEvent from "@testing-library/user-event";
import { EditTask } from "../components/EditTask";

describe("EditTask component Tests", () => {
  let onClose: () => void;
  let setTasks: (tasks: Task[] | ((currentTasks: Task[]) => Task[])) => void;
  let task: Task;
  beforeEach(() => {
    onClose = vi.fn();
    setTasks = vi.fn();
    task = {
      id: "444",
      title: "bri",
      description: "call bri",
      priority: "MEDIUM",
      dueDate: dayjs().format("YYYY-MM-DD"),
      completed: false,
      createdAt: dayjs().toISOString(),
    };
  });
  function renderComponent() {
    render(<EditTask onClose={onClose} setTasks={setTasks} task={task} />);
    return {
      form: screen.getByRole("dialog"),
      titleInput: screen.getByTestId("test-edit-task-title"),
      descriptionInput: screen.getByTestId("test-edit-task-description"),
      prioritySelect: screen.getByTestId("test-edit-task-priority"),
      dueDateInput: screen.getByTestId("test-edit-task-due-date"),
      cancelButton: screen.getByRole("button", { name: /cancel/i }),
      saveButton: screen.getByRole("button", { name: /save/i }),
    };
  }
  it("should render form for editing task", () => {
    const {
      form,
      titleInput,
      descriptionInput,
      prioritySelect,
      dueDateInput,
      cancelButton,
      saveButton,
    } = renderComponent();
    expect(form).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(prioritySelect).toBeInTheDocument();
    expect(dueDateInput).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });
  it("should form should have pre-filled values", () => {
    const { titleInput, descriptionInput, prioritySelect, dueDateInput } =
      renderComponent();
    expect(titleInput).toHaveValue(task.title);
    expect(descriptionInput).toHaveValue(task.description);
    expect(prioritySelect).toHaveValue(task.priority);
    expect(dueDateInput).toHaveValue(task.dueDate);
  });
  it("should call onClose when cancel button is clicked", async () => {
    const { cancelButton } = renderComponent();
    await userEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it("should update the task when fields are changed and save button is clicked", async () => {
    const {
      titleInput,
      descriptionInput,
      prioritySelect,
      dueDateInput,
      saveButton,
    } = renderComponent();
    const user = userEvent.setup();
    const newTitle = "Updated Title";
    const newDescription = "Updated Description";
    const newPriority = "HIGH";
    const newDueDate = dayjs().add(1, "day").format("YYYY-MM-DD");
    await user.clear(titleInput);
    await user.type(titleInput, newTitle);
    await user.clear(descriptionInput);
    await user.type(descriptionInput, newDescription);
    await user.selectOptions(prioritySelect, newPriority);
    await user.clear(dueDateInput);
    await user.type(dueDateInput, newDueDate);
    await userEvent.click(saveButton);
    expect(setTasks).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it("should not save if title is empty", async () => {
    const { titleInput, saveButton } = renderComponent();
    const user = userEvent.setup();

    await user.clear(titleInput);
    await user.click(saveButton);

    expect(setTasks).not.toHaveBeenCalled();
  });
});
