import { Link, useParams } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { PageHeader } from "../../components/layout/PageHeader";
import { InfoCard } from "../../components/cards/InfoCard";
import { useAppStore } from "../../app/store";

function getSlotLabel(slotKey?: string) {
  return slotKey?.toUpperCase() === "B" ? "B" : "A";
}

export function CustomActionPage() {
  const { slotId } = useParams();
  const slotLabel = getSlotLabel(slotId);
  const customSlot = useAppStore((state) =>
    state.customSlots.find((slot) => slot.slot === slotLabel)
  );
  const targetDestination = useAppStore((state) =>
    state.destinations.find((destination) => destination.id === customSlot?.targetId)
  );
  const targetContact = useAppStore((state) =>
    state.contacts.find((contact) => contact.id === customSlot?.targetId)
  );

  return (
    <AppShell
      mode="elder"
      title={customSlot?.label ?? `自訂 ${slotLabel}`}
      subtitle="照顧者設定的快捷動作。"
    >
      <PageHeader />
      <InfoCard title={customSlot?.label ?? `自訂 ${slotLabel}`}>
        {customSlot?.actionType === "openDestination" && targetDestination ? (
          <>
            <p className="big-copy">{targetDestination.address}</p>
            <p>{targetDestination.note}</p>
            <p className="card-meta">照住地址去，如果唔肯定就打電話俾屋企人。</p>
          </>
        ) : null}

        {customSlot?.actionType === "callPerson" && targetContact ? (
          <>
            <p className="big-copy">{targetContact.name}</p>
            <p>{targetContact.relationship}</p>
            <p>{targetContact.phone}</p>
            <p className="card-meta">原型示意：呢個快捷格會直接開始聯絡。</p>
          </>
        ) : null}

        {customSlot?.actionType === "showNote" ? <p className="big-copy">{customSlot.note}</p> : null}

        {customSlot?.actionType === "openDestination" && targetDestination ? (
          <Link className="primary-button" to="/call">
            我要搵屋企人
          </Link>
        ) : null}

        {customSlot?.actionType === "callPerson" && targetContact ? (
          <Link className="primary-button" to="/call">
            現在聯絡
          </Link>
        ) : null}

        {!customSlot || (customSlot.actionType !== "showNote" && !customSlot.targetId) ? (
          <p>照顧者未完整設定這個功能。</p>
        ) : null}

        <div className="inline-actions">
          <Link className="primary-button" to="/">
            返回主頁
          </Link>
          <Link className="secondary-button" to="/caregiver">
            去照顧者設定
          </Link>
        </div>
      </InfoCard>
    </AppShell>
  );
}
