import { Link } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { AppIcon } from "../../components/icons/AppIcon";
import { PageHeader } from "../../components/layout/PageHeader";
import { InfoCard } from "../../components/cards/InfoCard";
import { useAppStore } from "../../app/store";

export function DestinationsPage() {
  const destinations = useAppStore((state) => state.destinations);
  const otherDestinations = destinations.filter((destination) => !destination.isHome);

  return (
    <AppShell mode="elder" title="去其他地方" subtitle="揀一個已儲存地方。">
      <PageHeader />
      <section className="elder-task-banner" aria-label="place guidance">
        <span className="elder-task-banner-icon">
          <AppIcon name="place" />
        </span>
        <div>
          <p className="elder-task-banner-title">先揀地方</p>
          <p className="elder-task-banner-copy">揀完之後會見到清楚地址同提示。</p>
        </div>
      </section>
      <div className="stack-list">
        {otherDestinations.map((destination) => (
          <Link className="list-link-card" key={destination.id} to={`/places/${destination.id}`}>
            <div className="card-title-with-icon">
              <span className="mini-icon-badge mini-icon-badge--place">
                <AppIcon name="place" />
              </span>
              <strong>{destination.label}</strong>
            </div>
            <span>{destination.address}</span>
          </Link>
        ))}
      </div>
      {!otherDestinations.length ? (
        <InfoCard title="未有其他地方">
          <p>照顧者可以加入常去地點。</p>
        </InfoCard>
      ) : null}
    </AppShell>
  );
}
