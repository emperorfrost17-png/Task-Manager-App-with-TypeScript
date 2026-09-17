import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import dayjs from "dayjs";
import type { Task } from "../App";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { EditTask } from "../components/EditTask";

describe("EditTask component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const onClose = vi.fn();
  const setTasks = vi.fn();
  const task: Task = {
    id: "444",
    title: "bri",
    description: "call bri",
    priority: "MEDIUM",
    dueDate: dayjs().format("YYYY-MM-DD"),
    completed: false,
    createdAt: dayjs().toISOString(),
  };
  function renderComponent() {
    render(
      <MemoryRouter>
        <EditTask onClose={onClose} setTasks={setTasks} task={task} />
      </MemoryRouter>
    );
    
  }
});
