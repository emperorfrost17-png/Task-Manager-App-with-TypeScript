import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import dayjs from "dayjs";
import { AddTask } from "../components/AddTask";
import type { Task } from "../App";
import { MemoryRouter } from "react-router";

describe("group", () => {
  it("should", () => {
    const onClose = vi.fn();
    const setTasks = vi.fn();
    const tasks: Task[] = [
      {
        id: "ew",
        title: "bro",
        description: "call bro",
        priority: "MEDIUM",
        dueDate: dayjs().format("YYYY-MM-DD"),
        completed: false,
        createdAt: dayjs().toISOString(),
      },
    ];
    render(
      <MemoryRouter>
        <AddTask onClose={onClose} setTasks={setTasks} tasks={tasks} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/New Task/i)).toBeInTheDocument();
  });
});
