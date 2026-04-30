import { Link } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { InfoCard } from "../../components/cards/InfoCard";
import { AppIcon } from "../../components/icons/AppIcon";

export function SettingsPage() {
  return (
    <AppShell
      mode="elder"
      title="設定"
      subtitle="揀要開邊個版本，或者處理手機連接。"
    >
      <InfoCard title="選擇版本">
        <div className="stack-list">
          <Link className="list-link-card" to="/">
            <div className="card-title-with-icon">
              <span className="mini-icon-badge">
                <AppIcon name="person" />
              </span>
              <strong>長者版</strong>
            </div>
            <span>大按鈕、低認知負擔介面</span>
          </Link>
          <Link className="list-link-card" to="/caregiver">
            <div className="card-title-with-icon">
              <span className="mini-icon-badge mini-icon-badge--call">
                <AppIcon name="settings" />
              </span>
              <strong>照顧者版</strong>
            </div>
            <span>管理地點、藥單、自訂格與連接設定</span>
          </Link>
        </div>
      </InfoCard>

      <InfoCard title="手機連接">
        <div className="stack-list">
          <Link className="list-link-card" to="/settings/pair-elder">
            <div className="card-title-with-icon">
              <span className="mini-icon-badge mini-icon-badge--place">
                <AppIcon name="qr" />
              </span>
              <strong>長者顯示 QR / 連接連結</strong>
            </div>
            <span>喺長者手機打開，顯示畀照顧者掃描或者複製</span>
          </Link>
          <Link className="list-link-card" to="/settings/pair-caregiver">
            <div className="card-title-with-icon">
              <span className="mini-icon-badge mini-icon-badge--medicine">
                <AppIcon name="qr" />
              </span>
              <strong>照顧者掃描長者 QR / 輸入連結</strong>
            </div>
            <span>照顧者掃描長者顯示的 QR，再產生更新連結給長者手機</span>
          </Link>
        </div>
      </InfoCard>
    </AppShell>
  );
}
