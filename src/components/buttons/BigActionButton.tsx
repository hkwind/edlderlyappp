import { Link } from "react-router-dom";
import { AppIcon } from "../icons/AppIcon";

type BigActionTone = "home" | "place" | "call" | "medicine" | "custom";

interface BigActionButtonProps {
  to: string;
  label: string;
  helper?: string;
  icon: "home" | "place" | "call" | "medicine" | "note";
  tone?: BigActionTone;
}

export function BigActionButton({
  to,
  label,
  helper,
  icon,
  tone = "custom"
}: BigActionButtonProps) {
  return (
    <Link className={`big-action-button big-action-button--${tone}`} to={to}>
      <span className="big-action-top">
        <span className={`big-action-icon big-action-icon--${tone}`}>
          <AppIcon name={icon} />
        </span>
        <span className="big-action-label">{label}</span>
      </span>
      {helper ? <span className="big-action-helper">{helper}</span> : null}
    </Link>
  );
}
