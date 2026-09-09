import "./Sorting.css";
interface SortingProps {
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sortBy: string;
}
export function Sorting({ handleSortChange, sortBy }: SortingProps) {

  

  return (
    <div className="sortby" aria-label="Sort tasks">
      <label htmlFor="sort" className="sortby-label">
        Sort by
      </label>

      <div className="sortby-select-wrap">
        <select id="sort"  aria-label="Sort tasks by" value={sortBy} onChange={handleSortChange}>
          <option value="dateCreated" >
            Created At
          </option>
          <option value="priority" >
            Priority
          </option>
          <option value="dueDate" >
            Due date
          </option>
          <option value="title">
            Title
          </option>
        </select>
      </div>
    </div>
  );
}
