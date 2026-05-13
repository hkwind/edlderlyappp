import { useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { InfoCard } from "../../components/cards/InfoCard";
import { AppIcon } from "../../components/icons/AppIcon";
import { PageHeader } from "../../components/layout/PageHeader";
import { useAppStore } from "../../app/store";

export function CallPage() {
  const contacts = useAppStore((state) => state.contacts);
  const orderedContacts = [...contacts].sort((left, right) => left.priority - right.priority);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const selectedContact = orderedContacts.find((contact) => contact.id === selectedContactId);

  return (
    <AppShell mode="elder" title="打電話" subtitle="揀一位屋企人。">
      <PageHeader />
      <section className="elder-task-banner" aria-label="calling guidance">
        <span className="elder-task-banner-icon">
          <AppIcon name="call" />
        </span>
        <div>
          <p className="elder-task-banner-title">只要揀一個人</p>
          <p className="elder-task-banner-copy">撳相片或者名字，之後再按打電話。</p>
        </div>
      </section>
      {selectedContact ? (
        <InfoCard title="正在準備打電話">
          <div className="call-summary-row">
            <div>
              <p className="big-copy">{selectedContact.name}</p>
              <p>{selectedContact.relationship}</p>
              <p>{selectedContact.phone}</p>
            </div>
            <ContactPhoto contact={selectedContact} />
          </div>
          <a className="primary-button" href={getCallLink(selectedContact.phone)}>
            立即打電話
          </a>
          <p className="card-meta">會打開你手機的撥號功能。</p>
        </InfoCard>
      ) : null}
      <div className="stack-list">
        {orderedContacts.map((contact) => (
          <button
            aria-pressed={selectedContactId === contact.id}
            className={`call-card ${selectedContactId === contact.id ? "is-selected" : ""}`}
            key={contact.id}
            type="button"
            onClick={() => setSelectedContactId(contact.id)}
          >
            <div className="call-card-row">
              <div className="call-card-copy">
                <strong>{contact.name}</strong>
                <span>{contact.relationship}</span>
                <span>{contact.phone}</span>
                <span className="call-card-note">
                  {selectedContactId === contact.id ? "已選擇，按下面就打電話" : "按一下就聯絡家人"}
                </span>
              </div>
              <ContactPhoto contact={contact} />
            </div>
          </button>
        ))}
      </div>
    </AppShell>
  );
}

function ContactPhoto({ contact }: { contact: { name: string; photoDataUrl?: string } }) {
  if (contact.photoDataUrl) {
    return (
      <span className="contact-photo contact-photo--image">
        <img alt={`${contact.name} 照片`} src={contact.photoDataUrl} />
      </span>
    );
  }

  return <span className="contact-photo">{contact.name.slice(0, 1) || "人"}</span>;
}

function getCallLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
