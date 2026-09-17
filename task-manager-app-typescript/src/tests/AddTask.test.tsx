import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import dayjs from "dayjs";
import { AddTask } from "../components/AddTask";
import type { Task } from "../App";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

describe("AddTask componenting", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const onClose = vi.fn();
  const setTasks = vi.fn();
  const tasks: Task[] = [
    {
      id: "444",
      title: "bri",
      description: "call bri",
      priority: "MEDIUM",
      dueDate: dayjs().format("YYYY-MM-DD"),
      completed: false,
      createdAt: dayjs().toISOString(),
    },
    {
      id: "2222",
      title: "bro",
      description: "call bro",
      priority: "MEDIUM",
      dueDate: dayjs().format("YYYY-MM-DD"),
      completed: false,
      createdAt: dayjs().toISOString(),
    },
  ];
  function renderComponent() {
    render(
      <MemoryRouter>
        <AddTask onClose={onClose} setTasks={setTasks} tasks={tasks} />
      </MemoryRouter>,
    );
    return {
      form: screen.getByRole("dialog"),
      titleInput: screen.getByTestId("test-task-title"),
      descriptionInput: screen.getByTestId("test-task-description"),
      prioritySelect: screen.getByTestId("test-task-priority"),
      dueDateInput: screen.getByTestId("test-task-due-date"),
      addTaskBtn: screen.getByRole("button", { name: /add task/i }),
      cancel: screen.getByRole("button", { name: /cancel/i }),
    };
  }
  it("should render form for adding task", () => {
    const {
      form,
      addTaskBtn,
      cancel,
      titleInput,
      descriptionInput,
      prioritySelect,
      dueDateInput,
    } = renderComponent();
    expect(screen.getByText(/New Task/i)).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(prioritySelect).toBeInTheDocument();
    expect(dueDateInput).toBeInTheDocument();
    expect(addTaskBtn).toBeInTheDocument();
    expect(cancel).toBeInTheDocument();
  });
  it("should have default values for priority and due date", () => {
    const { prioritySelect, dueDateInput } = renderComponent();
    expect(prioritySelect).toHaveValue("MEDIUM");
    expect(dueDateInput).toHaveValue(dayjs().format("YYYY-MM-DD"));
  });
  it("should call onClose when cancel button is clicked", async () => {
    const { cancel } = renderComponent();
    const user = userEvent.setup();
    await user.click(cancel);
    expect(onClose).toHaveBeenCalled();
  });
  it("should call setTasks and onClose when form is submitted with valid data", async () => {
    const { addTaskBtn, titleInput, descriptionInput, prioritySelect } =
      renderComponent();
    const user = userEvent.setup();
    await user.type(titleInput, "New Task Title");
    await user.type(descriptionInput, "New Task Description");
    await user.selectOptions(prioritySelect, "HIGH");

    await user.click(addTaskBtn);
    expect(setTasks).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
  it("should show please fill out this field message when form is submitted with invalid data", async () => {
    const { addTaskBtn } = renderComponent();
    const user = userEvent.setup();
    await user.click(addTaskBtn);
    expect(setTasks).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });
  
});
