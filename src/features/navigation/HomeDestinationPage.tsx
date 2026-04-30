import { PageHeader } from "../../components/layout/PageHeader";
import { AppShell } from "../../components/layout/AppShell";
import { InfoCard } from "../../components/cards/InfoCard";
import { AppIcon } from "../../components/icons/AppIcon";
import { useAppStore } from "../../app/store";

export function HomeDestinationPage() {
  const destinations = useAppStore((state) => state.destinations);
  const home = destinations.find((destination) => destination.isHome);

  return (
    <AppShell mode="elder" title="回家" subtitle="跟住下面地址，搵人幫手都可以。">
      <PageHeader />
      <section className="elder-task-banner" aria-label="home guidance">
        <span className="elder-task-banner-icon">
          <AppIcon name="home" />
        </span>
        <div>
          <p className="elder-task-banner-title">俾人睇呢個地址</p>
          <p className="elder-task-banner-copy">如果唔識路，可以直接俾店員或途人睇。</p>
        </div>
      </section>
      {home ? (
        <InfoCard title={home.label}>
          <p className="big-copy">{home.address}</p>
          <p>{home.note}</p>
        </InfoCard>
      ) : (
        <InfoCard title="未設定屋企">
          <p>照顧者可以之後加返屋企地址。</p>
        </InfoCard>
      )}
    </AppShell>
  );
}
