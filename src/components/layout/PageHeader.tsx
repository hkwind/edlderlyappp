import { Link } from "react-router-dom";

interface PageHeaderProps {
  backTo?: string;
  backLabel?: string;
  homeLabel?: string;
}

export function PageHeader({
  backTo = "/",
  backLabel = "返回上一頁",
  homeLabel = "回主頁"
}: PageHeaderProps) {
  return (
    <nav className="page-header-row" aria-label="頁面導覽">
      <Link className="secondary-button" to={backTo}>
        {backLabel}
      </Link>
      <Link className="secondary-button" to="/">
        {homeLabel}
      </Link>
    </nav>
  );
}
