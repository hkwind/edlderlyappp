import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { InfoCard } from "../../components/cards/InfoCard";
import { useAppStore } from "../../app/store";
import type { Destination } from "../../types/domain";

function createBlankDestination(): Destination {
  return {
    id: `destination-${crypto.randomUUID()}`,
    label: "",
    address: "",
    note: "",
    isHome: false
  };
}

export function CaregiverDestinationsPage() {
  const destinations = useAppStore((state) => state.destinations);
  const saveDestination = useAppStore((state) => state.saveDestination);
  const deleteDestination = useAppStore((state) => state.deleteDestination);
  const [selectedId, setSelectedId] = useState(destinations[0]?.id ?? "");
  const [draft, setDraft] = useState<Destination>(destinations[0] ?? createBlankDestination());
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const nextDraft = destinations.find((destination) => destination.id === selectedId);

    if (nextDraft) {
      setDraft(nextDraft);
    }
  }, [destinations, selectedId]);

  return (
    <AppShell
      mode="caregiver"
      title="管理地點"
      subtitle="設定屋企同常去地方。"
      actions={
        <Link className="secondary-button" to="/caregiver">
          返回總覽
        </Link>
      }
    >
      <div className="editor-layout">
        <InfoCard title="已儲存地點">
          <div className="stack-list">
            {destinations.map((destination) => (
              <button
                key={destination.id}
                className={`list-link-card list-link-card--button ${
                  selectedId === destination.id ? "is-selected" : ""
                }`}
                type="button"
                onClick={() => setSelectedId(destination.id)}
              >
                <strong>{destination.label}</strong>
                <span>{destination.address}</span>
                <span>{destination.isHome ? "屋企" : "其他地點"}</span>
              </button>
            ))}
            <button
              className="secondary-button"
              type="button"
              onClick={() => {
                const blank = createBlankDestination();
                setSelectedId(blank.id);
                setDraft(blank);
                setFeedback("正在新增新地點。");
              }}
            >
              新增地點
            </button>
          </div>
        </InfoCard>

        <InfoCard title="編輯地點">
          <form
            className="form-stack"
            onSubmit={(event) => {
              event.preventDefault();
              saveDestination(draft);
              setSelectedId(draft.id);
              setFeedback(`已儲存「${draft.label || "未命名地點"}」。`);
            }}
          >
            <label className="field">
              <span>名稱</span>
              <input
                value={draft.label}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, label: event.target.value }))
                }
              />
            </label>

            <label className="field">
              <span>地址</span>
              <textarea
                rows={3}
                value={draft.address}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, address: event.target.value }))
                }
              />
            </label>

            <label className="field">
              <span>提示</span>
              <textarea
                rows={3}
                value={draft.note}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, note: event.target.value }))
                }
              />
            </label>

            <label className="checkbox-field">
              <input
                checked={Boolean(draft.isHome)}
                type="checkbox"
                onChange={(event) =>
                  setDraft((current) => ({ ...current, isHome: event.target.checked }))
                }
              />
              <span>設為屋企</span>
            </label>

            <div className="inline-actions">
              <button className="primary-button" type="submit">
                儲存地點
              </button>
              {!draft.isHome && destinations.some((destination) => destination.id === draft.id) ? (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => {
                    deleteDestination(draft.id);
                    const fallback = destinations.find((destination) => destination.id !== draft.id);
                    setSelectedId(fallback?.id ?? "");
                    setDraft(fallback ?? createBlankDestination());
                    setFeedback("已刪除地點。");
                  }}
                >
                  刪除地點
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
