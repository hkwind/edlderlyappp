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
  const locationStatus = useAppStore((state) => state.locationStatus);
  const deviceStatus = useAppStore((state) => state.deviceStatus);
  const nextReminder = reminders.find((reminder) => reminder.active && reminder.state !== "done");
  const doneCount = reminders.filter((reminder) => reminder.active && reminder.state === "done").length;
  const totalActiveCount = reminders.filter((reminder) => reminder.active).length;
  const homeDestination = destinations.find((destination) => destination.isHome);

  return (
    <AppShell
      mode="caregiver"
      title="照顧者總覽"
      subtitle="一眼查看長者位置、食藥狀態和今日重點。"
    >
      <section className="status-grid">
        <StatusCard
          title="目前位置"
          value={locationStatus.currentLocationLabel}
          meta={`最後更新：${locationStatus.lastUpdated}`}
        />
        <StatusCard
          title="安全區"
          value={getSafeZoneLabel(locationStatus.safeZoneState)}
          tone={getSafeZoneTone(locationStatus.safeZoneState)}
          meta="Mock 定位狀態"
        />
        <StatusCard
          title="食藥完成"
          value={`${doneCount}/${totalActiveCount || 0}`}
          meta={nextReminder ? `下一項：${nextReminder.time} ${nextReminder.medicineName}` : "今天沒有下一項提醒"}
        />
        <StatusCard
          title="手機電量"
          value={`${deviceStatus.batteryLevel}%`}
          meta={`${deviceStatus.connectionLabel}｜${deviceStatus.lastUpdated}`}
        />
      </section>

      <InfoCard title="今日重點">
        <div className="stack-list">
          <div className="list-link-card">
            <strong>屋企地點</strong>
            <span>{homeDestination?.label ?? "未設定"}</span>
            <span>{homeDestination?.address ?? "可到更新頁設定屋企地址"}</span>
          </div>
          <div className="list-link-card">
            <strong>食藥狀態</strong>
            <span>{doneCount} 項已完成</span>
            <span>
              {nextReminder
                ? `下一項是 ${nextReminder.time} ${nextReminder.medicineName}`
                : "所有啟用中的提醒都已完成或未設定"}
            </span>
          </div>
        </div>
      </InfoCard>

      <InfoCard title="快捷控制">
        <div className="inline-actions">
          <Link className="primary-button" to="/caregiver/updates">
            更新資料
          </Link>
          <Link className="secondary-button" to="/caregiver/medicine">
            去食藥編輯
          </Link>
          <Link className="secondary-button" to="/">
            看長者版
          </Link>
        </div>
      </InfoCard>
    </AppShell>
  );
}
