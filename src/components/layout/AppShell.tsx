import { useEffect, type PropsWithChildren, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppStore } from "../../app/store";
import { AppIcon } from "../icons/AppIcon";
import { CaregiverBottomNav } from "./CaregiverBottomNav";

interface AppShellProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  mode?: "elder" | "caregiver";
  heroClassName?: string;
  showTopbar?: boolean;
}

export function AppShell({
  title,
  subtitle,
  actions,
  children,
  mode = "elder",
  heroClassName,
  showTopbar
}: AppShellProps) {
  const { pathname } = useLocation();
  const reminders = useAppStore((state) => state.reminders);
  const activeMedicineAlert = useAppStore((state) => state.activeMedicineAlert);
  const syncMedicineAlerts = useAppStore((state) => state.syncMedicineAlerts);
  const clearActiveMedicineAlert = useAppStore((state) => state.clearActiveMedicineAlert);
  const elderUiPreferences = useAppStore((state) => state.elderUiPreferences);
  const activeReminder = reminders.find((reminder) => reminder.id === activeMedicineAlert?.reminderId);
  const shouldShowTopbar = showTopbar ?? mode === "caregiver";
  const shouldShowAlertBanner = mode === "elder" && (pathname === "/" || pathname === "/medicine");
  const shellClassName = [
    "app-shell",
    `app-shell--${mode}`,
    mode === "elder" && elderUiPreferences.largeText ? "app-shell--elder-large-text" : "",
    mode === "elder" && elderUiPreferences.highContrast ? "app-shell--elder-high-contrast" : "",
    mode === "elder" && elderUiPreferences.colorMode === "vivid" ? "app-shell--elder-vivid" : ""
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    if (mode !== "elder") {
      return undefined;
    }

    syncMedicineAlerts();

    const intervalId = window.setInterval(() => {
      syncMedicineAlerts();
    }, 30_000);

    return () => window.clearInterval(intervalId);
  }, [mode, syncMedicineAlerts]);

  return (
    <div className={shellClassName}>
      {shouldShowTopbar ? (
        <header className="app-topbar">
          <Link className="app-brand" to="/">
            腦友所依
          </Link>
        </header>
      ) : null}

      <main className="app-frame">
        <section className={`page-hero page-hero--${mode}${heroClassName ? ` ${heroClassName}` : ""}`}>
          <div className="page-hero-head">
            <div>
              <p className="eyebrow">{mode === "elder" ? "長者模式" : "照顧者模式"}</p>
              <h1>{title}</h1>
              {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
            </div>
            {actions ? <div className="page-actions">{actions}</div> : null}
          </div>
        </section>

        {shouldShowAlertBanner && activeReminder ? (
          <section className="alert-banner" aria-label="食藥提醒">
            <span className="alert-banner-icon">
              <AppIcon name="medicine" />
            </span>
            <div className="alert-banner-copy">
              <p className="alert-banner-title">食藥提醒</p>
              <p className="alert-banner-text">
                {activeReminder.time} {activeReminder.medicineName}
              </p>
            </div>
            <Link
              className="primary-button"
              to={`/medicine?reminderId=${activeReminder.id}&fromAlert=1`}
              onClick={clearActiveMedicineAlert}
            >
              查看提醒
            </Link>
            <button className="secondary-button" type="button" onClick={clearActiveMedicineAlert}>
              稍後再看
            </button>
          </section>
        ) : null}

        {children}
      </main>
      {mode === "caregiver" ? <CaregiverBottomNav /> : null}
    </div>
  );
}
