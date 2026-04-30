import { BigActionButton } from "../../components/buttons/BigActionButton";
import { AppIcon } from "../../components/icons/AppIcon";
import { AppShell } from "../../components/layout/AppShell";
import { useAppStore } from "../../app/store";

export function ElderHomePage() {
  const patient = useAppStore((state) => state.patient);
  const customSlots = useAppStore((state) => state.customSlots);

  return (
    <AppShell
      mode="elder"
      title={`你好，${patient.displayName}`}
      subtitle="慢慢來。揀一個你而家要做嘅事。"
    >
      <section className="info-strip" aria-label="home guidance">
        <div className="info-strip-head">
          <span className="info-strip-icon">
            <AppIcon name="help" />
          </span>
          <div>
            <p className="info-strip-label">今日重點</p>
            <p className="info-strip-copy">所有主要功能都喺下面 6 格，一按就到。</p>
          </div>
        </div>
      </section>
      <section className="elder-support-card" aria-label="support reminder">
        <span className="elder-support-icon">
          <AppIcon name="call" />
        </span>
        <div>
          <p className="elder-support-title">唔肯定點做？</p>
          <p className="elder-support-copy">撳「打電話」就可以搵屋企人。</p>
        </div>
      </section>
      <section className="grid-section">
        <div className="home-grid" aria-label="elder quick actions">
          <BigActionButton to="/go-home" label="回家" helper="返去屋企" icon="home" tone="home" />
          <BigActionButton
            to="/places"
            label="去其他地方"
            helper="已儲存地點"
            icon="place"
            tone="place"
          />
          <BigActionButton to="/call" label="打電話" helper="搵屋企人" icon="call" tone="call" />
          <BigActionButton
            to="/medicine"
            label="食藥"
            helper="今日藥單"
            icon="medicine"
            tone="medicine"
          />
          <BigActionButton
            to="/custom/a"
            label={customSlots[0]?.label ?? "自訂 A"}
            helper="自訂功能"
            icon="note"
            tone="custom"
          />
          <BigActionButton
            to="/custom/b"
            label={customSlots[1]?.label ?? "自訂 B"}
            helper="自訂功能"
            icon="note"
            tone="custom"
          />
        </div>
      </section>
    </AppShell>
  );
}
