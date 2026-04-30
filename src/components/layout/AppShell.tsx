import type { PropsWithChildren, ReactNode } from "react";
import { Link } from "react-router-dom";

interface AppShellProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  mode?: "elder" | "caregiver";
}

export function AppShell({
  title,
  subtitle,
  actions,
  children,
  mode = "elder"
}: AppShellProps) {
  const utilityLink = { to: "/settings", label: "設定" };

  return (
    <div className={`app-shell app-shell--${mode}`}>
      <header className="app-topbar">
        <Link className="app-brand" to="/">
          腦友所依
        </Link>
        <Link className="app-link" to={utilityLink.to}>
          {utilityLink.label}
        </Link>
      </header>

      <main className="app-frame">
        <section className={`page-hero page-hero--${mode}`}>
          <div>
            <p className="eyebrow">{mode === "elder" ? "長者模式" : "照顧者模式"}</p>
            <h1>{title}</h1>
            {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
          </div>
          {actions ? <div className="page-actions">{actions}</div> : null}
        </section>

        {children}
      </main>
    </div>
  );
}
