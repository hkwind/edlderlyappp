import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { AppIcon } from "../../components/icons/AppIcon";
import { PageHeader } from "../../components/layout/PageHeader";
import { useAppStore } from "../../app/store";

const stateLabel = {
  upcoming: "即將到來",
  done: "已完成",
  missed: "錯過"
} as const;

export function ElderMedicinePage() {
  const [searchParams] = useSearchParams();
  const reminders = useAppStore((state) => state.reminders);
  const updateReminderState = useAppStore((state) => state.updateReminderState);
  const clearActiveMedicineAlert = useAppStore((state) => state.clearActiveMedicineAlert);
  const activeReminders = reminders.filter((reminder) => reminder.active);
  const reminderId = searchParams.get("reminderId");
  const fromAlert = searchParams.get("fromAlert") === "1";

  const orderedReminders = useMemo(() => {
    if (!reminderId) {
      return activeReminders;
    }

    return [...activeReminders].sort((left, right) => {
      if (left.id === reminderId) {
        return -1;
      }

      if (right.id === reminderId) {
        return 1;
      }

      return left.time.localeCompare(right.time);
    });
  }, [activeReminders, reminderId]);

  return (
    <AppShell mode="elder" title="今日食藥" subtitle="跟住時間，一項一項做。">
      <PageHeader />
      <section className="elder-task-banner" aria-label="medicine guidance">
        <span className="elder-task-banner-icon">
          <AppIcon name="medicine" />
        </span>
        <div>
          <p className="elder-task-banner-title">食完先按確認</p>
          <p className="elder-task-banner-copy">
            {fromAlert ? "你剛剛打開咗食藥提醒，睇清楚再按完成。" : "食完藥之後，按「我已經食咗」。"}
          </p>
        </div>
      </section>
      <div className="stack-list">
        {orderedReminders.map((reminder) => {
          const isHighlighted = reminder.id === reminderId;

          return (
            <article
              className={`medicine-card${isHighlighted ? " medicine-card--highlighted" : ""}`}
              key={reminder.id}
            >
              <div className="medicine-row">
                <div className="card-title-with-icon">
                  <span className="mini-icon-badge mini-icon-badge--medicine">
                    <AppIcon name="medicine" />
                  </span>
                  <strong>{reminder.medicineName}</strong>
                </div>
                <span className="pill">{stateLabel[reminder.state]}</span>
              </div>
              <p className="medicine-time">
                <span className="inline-icon-text">
                  <span className="mini-inline-icon">
                    <AppIcon name="clock" />
                  </span>
                  {reminder.time}
                </span>
              </p>
              <p>{reminder.dosageNote}</p>
              <p className="card-meta">{reminder.alertEnabled ? "已開提醒" : "手動查看"}</p>
              <div className="inline-actions">
                {reminder.state !== "done" ? (
                  <button
                    className="primary-button"
                    type="button"
                    onClick={() => {
                      updateReminderState(reminder.id, "done");
                      if (isHighlighted) {
                        clearActiveMedicineAlert();
                      }
                    }}
                  >
                    我已經食咗
                  </button>
                ) : null}
                {reminder.state === "done" ? (
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => updateReminderState(reminder.id, "upcoming")}
                  >
                    改回未完成
                  </button>
                ) : null}
              </div>
            </article>
          );
        })}
        {!orderedReminders.length ? (
          <article className="medicine-card">
            <div className="card-title-with-icon">
              <span className="mini-icon-badge mini-icon-badge--medicine">
                <AppIcon name="medicine" />
              </span>
              <strong>今日冇啟用中藥單</strong>
            </div>
            <p>照顧者可以之後再加入提醒。</p>
          </article>
        ) : null}
      </div>
    </AppShell>
  );
}
