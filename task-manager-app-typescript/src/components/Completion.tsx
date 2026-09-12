import dayjs from "dayjs";
import type { Task } from "../App";
interface CompletionProps {
  tasks: Task[];
}
export function Completion({ tasks }: CompletionProps) {
  const completedTasks = tasks.filter((task) => task.completed);
  const totalTasks = tasks.length;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  return (
    <aside className="body-side">
      <div className="day-progress">
        <div
          className="progress-ring"
          style={
            {
              "--completion": `${completionPercentage}%`,
            } as React.CSSProperties
          }
          aria-label={`${completionPercentage}% complete`}
        >
          <span className="progress-text">{completionPercentage}%</span>
        </div>
        <div>
          <p>YOUR DAY</p>
          <strong>
            {completedTasks.length} of {totalTasks} complete
          </strong>
        </div>
      </div>
      <div className="rhythm-card">
        <p className="panel-label">TODAY'S RHYTHM</p>
        <h2>
          Focus, then
          <br />
          let go.
        </h2>
        <div className="progress-row">
          <span>Progress</span>
          <strong>{completionPercentage}%</strong>
        </div>
        <div className="progress-track">
          <span style={{ width: `${completionPercentage}%` }} />
        </div>
        <p className="panel-copy">
          Pick one thing to begin. Momentum follows clarity.
        </p>
      </div>
      <div className="upcoming-card">
        <div className="upcoming-header">
          <p className="panel-label upcoming-label">
            <span className="calendar-icon" aria-hidden="true" />
            <span className="upcoming-label-text">COMING UP</span>
          </p>
        </div>
        {tasks.filter((task) => !task.completed).length === 0 && (
          <p className="upcoming-empty">
            The horizon is clear. Nice work keeping it that way.
          </p>
        )}
        {tasks
          .filter((task) => !task.completed)
          .slice(0, 2)
          .map((task) => (
            <div className="upcoming-event" key={task.id}>
              <h3>{task.title}</h3>
              <p>{dayjs(task.dueDate).format("dddd, MMMM D")}</p>
            </div>
          ))}
      </div>
    </aside>
  );
}
