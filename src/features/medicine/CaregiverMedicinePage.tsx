import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { InfoCard } from "../../components/cards/InfoCard";
import { useAppStore } from "../../app/store";
import type { MedicineReminder, MedicineState } from "../../types/domain";

function createBlankReminder(): MedicineReminder {
  return {
    id: `reminder-${crypto.randomUUID()}`,
    medicineName: "",
    time: "08:00",
    dosageNote: "",
    active: true,
    state: "upcoming"
  };
}

const stateOptions: MedicineState[] = ["upcoming", "done", "missed"];

const stateLabel: Record<MedicineState, string> = {
  upcoming: "即將到來",
  done: "已完成",
  missed: "錯過"
};

export function CaregiverMedicinePage() {
  const reminders = useAppStore((state) => state.reminders);
  const saveReminder = useAppStore((state) => state.saveReminder);
  const deleteReminder = useAppStore((state) => state.deleteReminder);
  const [selectedId, setSelectedId] = useState(reminders[0]?.id ?? "");
  const [draft, setDraft] = useState<MedicineReminder>(reminders[0] ?? createBlankReminder());
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const nextDraft = reminders.find((reminder) => reminder.id === selectedId);

    if (nextDraft) {
      setDraft(nextDraft);
    }
  }, [reminders, selectedId]);

  return (
    <AppShell
      mode="caregiver"
      title="管理食藥提醒"
      subtitle="用簡單格式設定今日提醒。"
      actions={
        <Link className="secondary-button" to="/caregiver">
          返回總覽
        </Link>
      }
    >
      <div className="editor-layout">
        <InfoCard title="提醒列表">
          <div className="stack-list">
            {reminders.map((reminder) => (
              <button
                key={reminder.id}
                className={`list-link-card list-link-card--button ${
                  selectedId === reminder.id ? "is-selected" : ""
                }`}
                type="button"
                onClick={() => setSelectedId(reminder.id)}
              >
                <strong>{reminder.medicineName}</strong>
                <span>{reminder.time}</span>
                <span>{stateLabel[reminder.state]}</span>
              </button>
            ))}
            <button
              className="secondary-button"
              type="button"
              onClick={() => {
                const blank = createBlankReminder();
                setSelectedId(blank.id);
                setDraft(blank);
                setFeedback("正在新增新提醒。");
              }}
            >
              新增提醒
            </button>
          </div>
        </InfoCard>

        <InfoCard title="編輯提醒">
          <form
            className="form-stack"
            onSubmit={(event) => {
              event.preventDefault();
              saveReminder(draft);
              setSelectedId(draft.id);
              setFeedback(`已儲存「${draft.medicineName || "未命名提醒"}」。`);
            }}
          >
            <label className="field">
              <span>藥名</span>
              <input
                value={draft.medicineName}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, medicineName: event.target.value }))
                }
              />
            </label>

            <label className="field">
              <span>時間</span>
              <input
                type="time"
                value={draft.time}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, time: event.target.value }))
                }
              />
            </label>

            <label className="field">
              <span>份量提示</span>
              <textarea
                rows={3}
                value={draft.dosageNote}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, dosageNote: event.target.value }))
                }
              />
            </label>

            <label className="field">
              <span>狀態</span>
              <select
                value={draft.state}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    state: event.target.value as MedicineState
                  }))
                }
              >
                {stateOptions.map((state) => (
                  <option key={state} value={state}>
                    {stateLabel[state]}
                  </option>
                ))}
              </select>
            </label>

            <label className="checkbox-field">
              <input
                checked={draft.active}
                type="checkbox"
                onChange={(event) =>
                  setDraft((current) => ({ ...current, active: event.target.checked }))
                }
              />
              <span>啟用提醒</span>
            </label>

            <div className="inline-actions">
              <button className="primary-button" type="submit">
                儲存提醒
              </button>
              {reminders.some((reminder) => reminder.id === draft.id) ? (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => {
                    deleteReminder(draft.id);
                    const fallback = reminders.find((reminder) => reminder.id !== draft.id);
                    setSelectedId(fallback?.id ?? "");
                    setDraft(fallback ?? createBlankReminder());
                    setFeedback("已刪除提醒。");
                  }}
                >
                  刪除提醒
                </button>
              ) : null}
            </div>
            {feedback ? <p className="form-feedback">{feedback}</p> : null}
          </form>
        </InfoCard>
      </div>
    </AppShell>
  );
}
