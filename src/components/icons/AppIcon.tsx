type IconName =
  | "home"
  | "place"
  | "call"
  | "medicine"
  | "note"
  | "person"
  | "clock"
  | "help"
  | "qr"
  | "settings"
  | "dashboard"
  | "edit";

interface AppIconProps {
  name: IconName;
}

export function AppIcon({ name }: AppIconProps) {
  const commonProps = {
    className: "app-icon-svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true
  };

  switch (name) {
    case "home":
      return (
        <svg {...commonProps}>
          <path d="M3.5 10.5 12 4l8.5 6.5" />
          <path d="M6.5 9.5V20h11V9.5" />
          <path d="M10 20v-4.5h4V20" />
        </svg>
      );
    case "place":
      return (
        <svg {...commonProps}>
          <path d="M12 20c4-4.1 6.2-7 6.2-10a6.2 6.2 0 1 0-12.4 0c0 3 2.2 5.9 6.2 10Z" />
          <path d="m10.1 10.2 1.4 1.4 2.6-2.6" />
        </svg>
      );
    case "call":
      return (
        <svg {...commonProps}>
          <path d="M7.1 4.7c.8-.8 2-.8 2.8 0l1.1 1.1c.6.6.8 1.6.3 2.4l-.9 1.5c.9 1.7 2.3 3.1 4 4l1.5-.9c.8-.5 1.8-.3 2.4.3l1.1 1.1c.8.8.8 2 0 2.8l-.8.8c-.9.9-2.2 1.2-3.4.7-4.1-1.7-7.4-5-9.1-9.1-.5-1.2-.2-2.5.7-3.4l.8-.8Z" />
        </svg>
      );
    case "medicine":
      return (
        <svg {...commonProps}>
          <path d="M8.2 8.2a3.4 3.4 0 0 1 4.8 0l2.8 2.8a3.4 3.4 0 1 1-4.8 4.8l-2.8-2.8a3.4 3.4 0 0 1 0-4.8Z" />
          <path d="m9.4 14.6 5.2-5.2" />
        </svg>
      );
    case "note":
      return (
        <svg {...commonProps}>
          <path d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v12a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5Z" />
          <path d="M8 9h8" />
          <path d="M8 12.5h8" />
          <path d="M8 16h4.6" />
        </svg>
      );
    case "person":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="8.2" r="3.2" />
          <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
        </svg>
      );
    case "clock":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 7.8v4.7l3 1.8" />
        </svg>
      );
    case "help":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="8" />
          <path d="M9.7 9.5a2.5 2.5 0 1 1 4.2 2c-.8.8-1.7 1.3-1.7 2.5" />
          <path d="M12 17h.01" />
        </svg>
      );
    case "qr":
      return (
        <svg {...commonProps}>
          <path d="M4.5 4.5h5v5h-5Z" />
          <path d="M14.5 4.5h5v5h-5Z" />
          <path d="M4.5 14.5h5v5h-5Z" />
          <path d="M15.5 15.5h1" />
          <path d="M18.5 15.5h1" />
          <path d="M15.5 18.5h4" />
          <path d="M18.5 16.5v3" />
        </svg>
      );
    case "settings":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="2.8" />
          <path d="M12 4.2v1.6" />
          <path d="M12 18.2v1.6" />
          <path d="m7 7 1.2 1.2" />
          <path d="m15.8 15.8 1.2 1.2" />
          <path d="M4.2 12h1.6" />
          <path d="M18.2 12h1.6" />
          <path d="m7 17 1.2-1.2" />
          <path d="m15.8 8.2 1.2-1.2" />
        </svg>
      );
    case "dashboard":
      return (
        <svg {...commonProps}>
          <path d="M4.5 5.5h6v5h-6Z" />
          <path d="M13.5 5.5h6v8h-6Z" />
          <path d="M4.5 13.5h6v5h-6Z" />
          <path d="M13.5 16.5h6v2h-6Z" />
        </svg>
      );
    case "edit":
      return (
        <svg {...commonProps}>
          <path d="m6 16.8 8.6-8.6 2.8 2.8-8.6 8.6-4 .8Z" />
          <path d="m13.8 9 2.8-2.8 2.2 2.2-2.8 2.8" />
        </svg>
      );
    default:
      return null;
  }
}
