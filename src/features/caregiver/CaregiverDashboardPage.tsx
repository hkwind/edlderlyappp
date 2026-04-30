import { Link } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { StatusCard } from "../../components/cards/StatusCard";
import { InfoCard } from "../../components/cards/InfoCard";
import { useAppStore } from "../../app/store";

function getSafeZoneTone(state: "inside" | "outside" | "unknown") {
  if (state === "inside") {
    return "good";
  }

  if (state === "outside") {
    return "alert";
  }

  return "default";
}

function getSafeZoneLabel(state: "inside" | "outside" | "unknown") {
  if (state === "inside") {
    return "安全範圍內";
  }

  if (state === "outside") {
    return "安全範圍外";
  }

  return "未確認";
}

export function CaregiverDashboardPage() {
  const reminders = useAppStore((state) => state.reminders);
  const destinations = useAppStore((state) => state.destinations);
  const customSlots = useAppStore((state) => state.customSlots);
  const locationStatus = useAppStore((state) => state.locationStatus);
  const deviceStatus = useAppStore((state) => state.deviceStatus);
  const homeDestination = destinations.find((destination) => destination.isHome);
  const nextReminder = reminders.find((reminder) => reminder.active && reminder.state !== "done");

  return (
    <AppShell
      mode="caregiver"
      title="照顧者總覽"
      subtitle="快速查看長者設定與模擬狀態。"
      actions={
        <Link className="secondary-button" to="/">
          回長者主頁
        </Link>
      }
    >
      <section className="status-grid">
        <StatusCard
          title="食藥提醒"
          value={`${reminders.filter((item) => item.active).length} 項啟用中`}
          meta="可稍後編輯提醒"
        />
        <StatusCard
          title="已儲存地點"
          value={`${destinations.length} 個`}
          meta="包括屋企"
        />
        <StatusCard
          title="自訂功能"
          value={`${customSlots.length} 個`}
          meta="A / B 快捷格"
        />
        <StatusCard
          title="安全區"
          value={getSafeZoneLabel(locationStatus.safeZoneState)}
          tone={getSafeZoneTone(locationStatus.safeZoneState)}
          meta={`最後更新：${locationStatus.lastUpdated}`}
        />
        <StatusCard
          title="目前位置"
          value={locationStatus.currentLocationLabel}
          meta="Mock UI only"
        />
        <StatusCard
          title="電量"
          value={`${deviceStatus.batteryLevel}%`}
          meta={`${deviceStatus.connectionLabel}｜${deviceStatus.lastUpdated}`}
        />
      </section>

      <InfoCard title="管理設定">
        <div className="inline-actions">
          <Link className="primary-button" to="/caregiver/destinations">
            管理地點
          </Link>
          <Link className="primary-button" to="/caregiver/medicine">
            管理食藥
          </Link>
          <Link className="primary-button" to="/caregiver/custom-slots">
            管理自訂格
          </Link>
        </div>
      </InfoCard>

      <InfoCard title="快速預覽">
        <div className="stack-list">
          <div className="list-link-card">
            <strong>屋企地點</strong>
            <span>{homeDestination?.label ?? "未設定"}</span>
            <span>{homeDestination?.address ?? "可到管理地點設定"}</span>
          </div>
          <div className="list-link-card">
            <strong>下一個食藥項目</strong>
            <span>{nextReminder?.medicineName ?? "未有進行中提醒"}</span>
            <span>{nextReminder ? `${nextReminder.time}｜${nextReminder.dosageNote}` : "可到管理食藥加入"}</span>
          </div>
          <div className="list-link-card">
            <strong>長者首頁自訂格</strong>
            <span>{customSlots.map((slot) => `${slot.slot}: ${slot.label}`).join(" ｜ ")}</span>
            <span>可直接到管理自訂格修改</span>
          </div>
        </div>
      </InfoCard>
    </AppShell>
  );
}
