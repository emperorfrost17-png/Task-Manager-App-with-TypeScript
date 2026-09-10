import "./DeleteConfirmation.css";

interface DeleteConfirmationProps {
  taskId: string;
  handleDeleteTask: (taskId: string) => void;
  setDeleteConfirmationTaskId: (taskId: string | null) => void;
  setOpenMenuId: (taskId: string | null) => void;
}

export function DeleteConfirmation({
  taskId,
  handleDeleteTask,
  setDeleteConfirmationTaskId,
  setOpenMenuId,
}: DeleteConfirmationProps) {
  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation-modal">
        <div className="delete-confirmation-icon">
          <i className="fas fa-trash-alt"></i>
        </div>

        <h2 className="delete-confirmation-title">Delete task?</h2>
        <p className="delete-confirmation-message">
          This action cannot be undone. Are you sure you want to delete this
          task?
        </p>

        <div className="delete-confirmation-buttons">
          <button
            type="button"
            className="btn-cancel"
            onClick={() => {
              // Handle cancellation logic here

              setDeleteConfirmationTaskId(null);
              setOpenMenuId(null);
            }}
          >
            No, keep it
          </button>
          <button
            type="button"
            className="btn-delete"
            onClick={() => {
              // Handle task deletion logic here
              handleDeleteTask(taskId);
              setDeleteConfirmationTaskId(null);
              setOpenMenuId(null);
            }}
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}
