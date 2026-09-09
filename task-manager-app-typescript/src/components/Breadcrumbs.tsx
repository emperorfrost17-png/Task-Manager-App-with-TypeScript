interface BreadcrumbsProps {
  currentPage: string;
}
export function Breadcrumbs({ currentPage }: BreadcrumbsProps) {
  return (
    <div className="breadcrumb" aria-label="Current location">
      <span className="breadcrumb-dot" aria-hidden="true" />
      <span>Personal space</span>
      <span className="breadcrumb-separator">/</span>
      <span>{currentPage}</span>
    </div>
  );
}
