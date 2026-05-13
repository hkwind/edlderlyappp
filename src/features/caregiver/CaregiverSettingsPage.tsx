import { Link } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { InfoCard } from "../../components/cards/InfoCard";
import { useAppStore } from "../../app/store";

export function CaregiverSettingsPage() {
  const elderUiPreferences = useAppStore((state) => state.elderUiPreferences);
  const updateElderUiPreferences = useAppStore((state) => state.updateElderUiPreferences);

  return (
    <AppShell
      mode="caregiver"
      title="設定"
      subtitle="調整長者介面風格，並管理裝置連接。"
    >
      <InfoCard title="長者介面">
        <form className="form-stack">
          <label className="checkbox-field">
            <input
              checked={elderUiPreferences.largeText}
              type="checkbox"
              onChange={(event) =>
                updateElderUiPreferences({
                  largeText: event.target.checked
                })
              }
            />
            <span>更大字體</span>
          </label>

          <label className="checkbox-field">
            <input
              checked={elderUiPreferences.highContrast}
              type="checkbox"
              onChange={(event) =>
                updateElderUiPreferences({
                  highContrast: event.target.checked
                })
              }
            />
            <span>高對比模式</span>
          </label>

          <label className="field">
            <span>配色風格</span>
            <select
              value={elderUiPreferences.colorMode}
              onChange={(event) =>
                updateElderUiPreferences({
                  colorMode: event.target.value as "warm" | "vivid"
                })
              }
            >
              <option value="warm">柔和暖色</option>
              <option value="vivid">鮮明配色</option>
            </select>
          </label>
        </form>
      </InfoCard>

      <InfoCard title="裝置連接">
        <div className="stack-list">
          <Link className="list-link-card" to="/settings/pair-elder">
            <strong>長者顯示 QR / 連接連結</strong>
            <span>讓照顧者掃描或複製長者邀請連結</span>
          </Link>
          <Link className="list-link-card" to="/settings/pair-caregiver">
            <strong>照顧者掃描長者 QR / 輸入連結</strong>
            <span>接收長者邀請，產生回傳設定的連結或 QR</span>
          </Link>
        </div>
      </InfoCard>

      <InfoCard title="切換版本">
        <div className="inline-actions">
          <Link className="secondary-button" to="/">
            看長者版
          </Link>
          <Link className="secondary-button" to="/settings">
            通用設定頁
          </Link>
        </div>
      </InfoCard>
    </AppShell>
  );
}
