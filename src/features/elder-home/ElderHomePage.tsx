import { Link } from "react-router-dom";
import { BigActionButton } from "../../components/buttons/BigActionButton";
import { AppIcon } from "../../components/icons/AppIcon";
import { AppShell } from "../../components/layout/AppShell";
import { useAppStore } from "../../app/store";
import type { CustomSlotConfig } from "../../types/domain";

function getCustomSlotIcon(slot: CustomSlotConfig) {
  if (slot.actionType === "callPerson") {
    return "call" as const;
  }

  if (slot.actionType === "openDestination") {
    return "place" as const;
  }

  return "note" as const;
}

export function ElderHomePage() {
  const patient = useAppStore((state) => state.patient);
  const customSlots = useAppStore((state) => state.customSlots);
  const visibleCustomSlots = customSlots.filter((slot) => slot.showOnHome);

  return (
    <AppShell
      mode="elder"
      title={`你好，${patient.displayName}`}
      subtitle="揀一個要做的事，慢慢來就可以。"
      heroClassName="page-hero--home"
      showTopbar={false}
      actions={
        <Link aria-label="設定" className="icon-button" to="/settings">
          <AppIcon name="settings" />
        </Link>
      }
    >
      <section className="grid-section">
        <div className="home-grid home-grid--primary" aria-label="elder quick actions">
          <BigActionButton to="/go-home" label="回家" icon="home" tone="home" />
          <BigActionButton to="/call" label="打電話" icon="call" tone="call" />
          <BigActionButton to="/medicine" label="食藥" icon="medicine" tone="medicine" />
          <BigActionButton to="/places" label="去其他地方" icon="place" tone="place" />

          {/* TODO: Revisit overflow behavior when remote caregiver config can enable multiple custom actions. */}
          {visibleCustomSlots.map((slot) => (
            <BigActionButton
              key={slot.slot}
              to={`/custom/${slot.slot.toLowerCase()}`}
              label={slot.label}
              icon={getCustomSlotIcon(slot)}
              tone="custom"
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
