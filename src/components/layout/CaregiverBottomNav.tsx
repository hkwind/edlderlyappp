import { NavLink } from "react-router-dom";
import { AppIcon } from "../icons/AppIcon";

export function CaregiverBottomNav() {
  return (
    <nav className="caregiver-bottom-nav" aria-label="照顧者底部導覽">
      <NavLink
        className={({ isActive }) =>
          `caregiver-tab-link${isActive ? " caregiver-tab-link--active" : ""}`
        }
        end
        to="/caregiver"
      >
        <span className="caregiver-tab-icon">
          <AppIcon name="dashboard" />
        </span>
        <span>總覽</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `caregiver-tab-link${isActive ? " caregiver-tab-link--active" : ""}`
        }
        to="/caregiver/updates"
      >
        <span className="caregiver-tab-icon">
          <AppIcon name="edit" />
        </span>
        <span>更新</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `caregiver-tab-link${isActive ? " caregiver-tab-link--active" : ""}`
        }
        to="/caregiver/settings"
      >
        <span className="caregiver-tab-icon">
          <AppIcon name="settings" />
        </span>
        <span>設定</span>
      </NavLink>
    </nav>
  );
}
