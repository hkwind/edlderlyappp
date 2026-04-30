import type { PropsWithChildren } from "react";

interface InfoCardProps extends PropsWithChildren {
  title: string;
}

export function InfoCard({ title, children }: InfoCardProps) {
  return (
    <section className="info-card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
