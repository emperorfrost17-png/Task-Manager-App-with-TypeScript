interface DeleteConfirmationProps {
  taskId: string;
}
export function DeleteConfirmation({
  taskId,
}: DeleteConfirmationProps) {
  return (
    <div className="delete-confirmation">
      <p>Are you sure you want to delete this task?</p>
      <div className="delete-confirmation-buttons">
        <button
          type="button"
          onClick={() => {
            // Handle task deletion logic here
            console.log(`Task with ID ${taskId} deleted.`);
          }}
        >
          Yes, delete
        </button>
        <button
          type="button"
          onClick={() => {
            // Handle cancellation logic here
            console.log(`Task deletion for ID ${taskId} cancelled.`);
          }}
        >
          No, keep it
        </button>
      </div>
    </div>
  );
}