import { Link } from "react-router-dom";

interface PageHeaderProps {
  backTo?: string;
  backLabel?: string;
  homeLabel?: string;
}

export function PageHeader({
  backTo = "/",
  backLabel = "返回上頁",
  homeLabel = "回主頁"
}: PageHeaderProps) {
  const showsBackLink = backTo !== "/";

  return (
    <nav className="page-header-row" aria-label="頁面導覽">
      {showsBackLink ? (
        <Link className="secondary-button" to={backTo}>
          {backLabel}
        </Link>
      ) : null}
      <Link className={showsBackLink ? "primary-button" : "primary-button page-header-home-only"} to="/">
        {homeLabel}
      </Link>
    </nav>
  );
}
