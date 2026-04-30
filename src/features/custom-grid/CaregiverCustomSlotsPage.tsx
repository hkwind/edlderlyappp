import { useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { InfoCard } from "../../components/cards/InfoCard";
import { useAppStore } from "../../app/store";
import type { CustomActionType, CustomSlotConfig } from "../../types/domain";

const actionLabels: Record<CustomActionType, string> = {
  callPerson: "打電話俾某人",
  openDestination: "開啟一個地點",
  showNote: "顯示一段提示"
};

export function CaregiverCustomSlotsPage() {
  const customSlots = useAppStore((state) => state.customSlots);
  const contacts = useAppStore((state) => state.contacts);
  const allDestinations = useAppStore((state) => state.destinations);
  const destinations = allDestinations.filter((item) => !item.isHome);
  const saveCustomSlot = useAppStore((state) => state.saveCustomSlot);
  const [feedback, setFeedback] = useState("");
  const [drafts, setDrafts] = useState<Record<"A" | "B", CustomSlotConfig>>({
    A: customSlots.find((slot) => slot.slot === "A") ?? {
      slot: "A",
      label: "自訂 A",
      actionType: "showNote",
      note: ""
    },
    B: customSlots.find((slot) => slot.slot === "B") ?? {
      slot: "B",
      label: "自訂 B",
      actionType: "showNote",
      note: ""
    }
  });

  function updateDraft(slot: "A" | "B", next: Partial<CustomSlotConfig>) {
    setDrafts((current) => ({
      ...current,
      [slot]: {
        ...current[slot],
        ...next
      }
    }));
  }

  return (
    <AppShell
      mode="caregiver"
      title="管理自訂格"
      subtitle="設定 A、B 兩個快捷功能。"
      actions={
        <Link className="secondary-button" to="/caregiver">
          返回總覽
        </Link>
      }
    >
      <div className="editor-layout">
        {(["A", "B"] as const).map((slot) => {
          const draft = drafts[slot];

          return (
            <InfoCard key={slot} title={`自訂 ${slot}`}>
              <form
                className="form-stack"
                onSubmit={(event) => {
                  event.preventDefault();
                  saveCustomSlot(draft);
                  setFeedback(`已儲存自訂 ${slot}。`);
                }}
              >
                <label className="field">
                  <span>按鈕名稱</span>
                  <input
                    value={draft.label}
                    onChange={(event) => updateDraft(slot, { label: event.target.value })}
                  />
                </label>

                <label className="field">
                  <span>動作類型</span>
                  <select
                    value={draft.actionType}
                    onChange={(event) =>
                      updateDraft(slot, {
                        actionType: event.target.value as CustomActionType,
                        targetId: "",
                        note: ""
                      })
                    }
                  >
                    {Object.entries(actionLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>

                {draft.actionType === "callPerson" ? (
                  <label className="field">
                    <span>對象</span>
                    <select
                      value={draft.targetId ?? ""}
                      onChange={(event) => updateDraft(slot, { targetId: event.target.value })}
                    >
                      <option value="">請選擇</option>
                      {contacts.map((contact) => (
                        <option key={contact.id} value={contact.id}>
                          {contact.name}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}

                {draft.actionType === "openDestination" ? (
                  <label className="field">
                    <span>地點</span>
                    <select
                      value={draft.targetId ?? ""}
                      onChange={(event) => updateDraft(slot, { targetId: event.target.value })}
                    >
                      <option value="">請選擇</option>
                      {destinations.map((destination) => (
                        <option key={destination.id} value={destination.id}>
                          {destination.label}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}

                {draft.actionType === "showNote" ? (
                  <label className="field">
                    <span>提示內容</span>
                    <textarea
                      rows={4}
                      value={draft.note ?? ""}
                      onChange={(event) => updateDraft(slot, { note: event.target.value })}
                    />
                  </label>
                ) : null}

                <button className="primary-button" type="submit">
                  儲存自訂格
                </button>
              </form>
            </InfoCard>
          );
        })}
        {feedback ? <p className="form-feedback">{feedback}</p> : null}
      </div>
    </AppShell>
  );
}
