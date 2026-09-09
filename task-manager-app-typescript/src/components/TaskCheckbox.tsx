interface TaskCheckboxProps {
  completed: boolean;
  title: string;
  onToggle: () => void;
}
export function TaskCheckbox({
  completed,
  title,
  onToggle,
}: TaskCheckboxProps) {
  return (
    <button
      type="button"
      className={completed ? "task-complete-icon" : "task-checkbox"}
      role="checkbox"
      aria-checked={completed}
      aria-label={`Mark "${title}" as ${completed ? "not complete" : "complete"}`}
      onClick={onToggle}
    >
      {completed && <i className="fa-solid fa-check" aria-hidden="true" />}
    </button>
  );
}
