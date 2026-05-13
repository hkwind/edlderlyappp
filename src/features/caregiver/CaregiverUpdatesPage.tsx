import { Link } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { InfoCard } from "../../components/cards/InfoCard";
import { AppIcon } from "../../components/icons/AppIcon";
import { useAppStore } from "../../app/store";

export function CaregiverUpdatesPage() {
  const destinations = useAppStore((state) => state.destinations);
  const contacts = useAppStore((state) => state.contacts);
  const reminders = useAppStore((state) => state.reminders);
  const customSlots = useAppStore((state) => state.customSlots);
  const homeDestination = destinations.find((destination) => destination.isHome);

  return (
    <AppShell
      mode="caregiver"
      title="更新資料"
      subtitle="集中管理位置、聯絡人、食藥和自訂動作。"
    >
      <InfoCard title="快速更新">
        <div className="stack-list">
          <Link className="list-link-card" to="/caregiver/destinations">
            <div className="card-title-with-icon">
              <span className="mini-icon-badge mini-icon-badge--place">
                <AppIcon name="place" />
              </span>
              <strong>位置與地點</strong>
            </div>
            <span>{homeDestination?.label ?? "未設定屋企"}｜{destinations.length} 個地點</span>
            <span>更新屋企地址與常去地方</span>
          </Link>

          <Link className="list-link-card" to="/caregiver/contacts">
            <div className="card-title-with-icon">
              <span className="mini-icon-badge mini-icon-badge--call">
                <AppIcon name="call" />
              </span>
              <strong>聯絡人</strong>
            </div>
            <span>{contacts.length} 位家人聯絡資料</span>
            <span>修改姓名、電話和右側照片</span>
          </Link>

          <Link className="list-link-card" to="/caregiver/medicine">
            <div className="card-title-with-icon">
              <span className="mini-icon-badge mini-icon-badge--medicine">
                <AppIcon name="medicine" />
              </span>
              <strong>食藥提醒</strong>
            </div>
            <span>{reminders.filter((item) => item.active).length} 項啟用中</span>
            <span>設定時間、用量與提醒狀態</span>
          </Link>

          <Link className="list-link-card" to="/caregiver/custom-slots">
            <div className="card-title-with-icon">
              <span className="mini-icon-badge">
                <AppIcon name="note" />
              </span>
              <strong>自訂功能</strong>
            </div>
            <span>{customSlots.length} 個快捷動作</span>
            <span>設定 A / B 自訂內容與是否顯示</span>
          </Link>
        </div>
      </InfoCard>
    </AppShell>
  );
}
