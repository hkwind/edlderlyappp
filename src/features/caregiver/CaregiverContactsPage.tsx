import { useEffect, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { InfoCard } from "../../components/cards/InfoCard";
import { useAppStore } from "../../app/store";
import type { Contact } from "../../types/domain";

export function CaregiverContactsPage() {
  const contacts = useAppStore((state) => state.contacts);
  const saveContact = useAppStore((state) => state.saveContact);
  const [selectedId, setSelectedId] = useState(contacts[0]?.id ?? "");
  const [draft, setDraft] = useState<Contact>(contacts[0] ?? createBlankContact());
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const nextDraft = contacts.find((contact) => contact.id === selectedId);

    if (nextDraft) {
      setDraft(nextDraft);
    }
  }, [contacts, selectedId]);

  async function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const photoDataUrl = await readFileAsDataUrl(file);
    setDraft((current) => ({ ...current, photoDataUrl }));
    setFeedback(`已加入 ${draft.name || "聯絡人"} 的照片。`);
  }

  return (
    <AppShell
      mode="caregiver"
      title="管理聯絡人"
      subtitle="設定打電話名單與照片，長者版會顯示在聯絡卡右邊。"
      actions={
        <Link className="secondary-button" to="/caregiver">
          返回總覽
        </Link>
      }
    >
      <div className="editor-layout">
        <InfoCard title="聯絡人列表">
          <div className="stack-list">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                className={`list-link-card list-link-card--button ${
                  selectedId === contact.id ? "is-selected" : ""
                }`}
                type="button"
                onClick={() => setSelectedId(contact.id)}
              >
                <strong>{contact.name}</strong>
                <span>{contact.relationship}</span>
                <span>{contact.phone}</span>
              </button>
            ))}
          </div>
        </InfoCard>

        <InfoCard title="編輯聯絡人">
          <form
            className="form-stack"
            onSubmit={(event) => {
              event.preventDefault();
              saveContact(draft);
              setFeedback(`已儲存 ${draft.name || "聯絡人"}。`);
            }}
          >
            <div className="contact-photo-editor">
              <div className="contact-photo-preview">
                {draft.photoDataUrl ? (
                  <img alt={`${draft.name || "聯絡人"}照片`} src={draft.photoDataUrl} />
                ) : (
                  <span>{draft.name.slice(0, 1) || "人"}</span>
                )}
              </div>
              <label className="secondary-button contact-photo-upload">
                上載照片
                <input accept="image/*" className="visually-hidden" type="file" onChange={handlePhotoChange} />
              </label>
              {draft.photoDataUrl ? (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => {
                    setDraft((current) => ({ ...current, photoDataUrl: undefined }));
                    setFeedback("已移除照片。");
                  }}
                >
                  移除照片
                </button>
              ) : null}
            </div>

            <label className="field">
              <span>姓名</span>
              <input
                value={draft.name}
                onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
              />
            </label>

            <label className="field">
              <span>關係</span>
              <input
                value={draft.relationship}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, relationship: event.target.value }))
                }
              />
            </label>

            <label className="field">
              <span>電話</span>
              <input
                inputMode="tel"
                value={draft.phone}
                onChange={(event) => setDraft((current) => ({ ...current, phone: event.target.value }))}
              />
            </label>

            <label className="field">
              <span>排序</span>
              <input
                min="1"
                type="number"
                value={draft.priority}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    priority: Number(event.target.value) || current.priority
                  }))
                }
              />
            </label>

            <button className="primary-button" type="submit">
              儲存聯絡人
            </button>
            {feedback ? <p className="form-feedback">{feedback}</p> : null}
          </form>
        </InfoCard>
      </div>
    </AppShell>
  );
}

function createBlankContact(): Contact {
  return {
    id: "",
    name: "",
    relationship: "",
    phone: "",
    priority: 1
  };
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Could not read image."));
    };

    reader.onerror = () => reject(reader.error ?? new Error("Could not read image."));
    reader.readAsDataURL(file);
  });
}
