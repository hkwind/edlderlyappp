import type { ReactNode } from "react";

interface StatusCardProps {
  title: string;
  value: string;
  tone?: "default" | "good" | "alert";
  meta?: string;
  children?: ReactNode;
}

export function StatusCard({
  title,
  value,
  tone = "default",
  meta,
  children
}: StatusCardProps) {
  return (
    <article className={`status-card status-card--${tone}`}>
      <p className="card-label">{title}</p>
      <p className="status-value">{value}</p>
      {meta ? <p className="card-meta">{meta}</p> : null}
      {children}
    </article>
  );
}
