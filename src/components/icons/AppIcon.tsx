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
  | "settings";

interface AppIconProps {
  name: IconName;
}

export function AppIcon({ name }: AppIconProps) {
  const commonProps = {
    className: "app-icon-svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
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
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "place":
      return (
        <svg {...commonProps}>
          <path d="M12 20c4-4.2 6-7.1 6-10a6 6 0 1 0-12 0c0 2.9 2 5.8 6 10Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      );
    case "call":
      return (
        <svg {...commonProps}>
          <path d="M7.2 4.8c.7-.7 1.8-.7 2.5 0l1.3 1.3c.6.6.7 1.6.2 2.3l-1 1.4c1 2 2.6 3.6 4.6 4.6l1.4-1c.7-.5 1.7-.4 2.3.2l1.3 1.3c.7.7.7 1.8 0 2.5l-.9.9c-.8.8-2 .9-3 .4C10.6 18 6 13.4 4.8 8.7c-.4-1 .6-2.2 1.4-3l1-.9Z" />
        </svg>
      );
    case "medicine":
      return (
        <svg {...commonProps}>
          <path d="M9 4.5h6" />
          <path d="M9.5 4.5v4a2.5 2.5 0 0 1-2.5 2.5H7a2.5 2.5 0 0 1-2.5-2.5v-1a3 3 0 0 1 3-3h2Z" />
          <path d="M14.5 4.5v4A2.5 2.5 0 0 0 17 11h0a2.5 2.5 0 0 1 2.5 2.5v1A5.5 5.5 0 0 1 14 20H10a5.5 5.5 0 0 1-5.5-5.5v-1A2.5 2.5 0 0 1 7 11h0a2.5 2.5 0 0 0 2.5-2.5v-4" />
          <path d="M10 14h4" />
          <path d="M12 12v4" />
        </svg>
      );
    case "note":
      return (
        <svg {...commonProps}>
          <path d="M6 4.5h12a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 18 19.5H6A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5Z" />
          <path d="M8 9h8" />
          <path d="M8 12.5h8" />
          <path d="M8 16h5" />
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
          <path d="M16 14.5v2" />
          <path d="M14.5 17.5h2" />
          <path d="M18.5 14.5v5" />
          <path d="M14.5 19.5h5" />
        </svg>
      );
    case "settings":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3.8v1.7" />
          <path d="M12 18.5v1.7" />
          <path d="m6.2 6.2 1.2 1.2" />
          <path d="m16.6 16.6 1.2 1.2" />
          <path d="M3.8 12h1.7" />
          <path d="M18.5 12h1.7" />
          <path d="m6.2 17.8 1.2-1.2" />
          <path d="m16.6 7.4 1.2-1.2" />
        </svg>
      );
    default:
      return null;
  }
}
