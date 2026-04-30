import { Link, useParams } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { AppIcon } from "../../components/icons/AppIcon";
import { PageHeader } from "../../components/layout/PageHeader";
import { InfoCard } from "../../components/cards/InfoCard";
import { useAppStore } from "../../app/store";

export function DestinationDetailPage() {
  const { destinationId } = useParams();
  const destination = useAppStore((state) =>
    state.destinations.find((item) => item.id === destinationId)
  );

  return (
    <AppShell
      mode="elder"
      title={destination?.label ?? "地點"}
      subtitle="睇住資料，慢慢去。"
    >
      <PageHeader backTo="/places" />
      <section className="elder-task-banner" aria-label="destination guidance">
        <span className="elder-task-banner-icon">
          <AppIcon name="place" />
        </span>
        <div>
          <p className="elder-task-banner-title">睇住地址慢慢去</p>
          <p className="elder-task-banner-copy">如果唔肯定點行，可以撳下面搵屋企人。</p>
        </div>
      </section>
      {destination ? (
        <InfoCard title={destination.label}>
          <p className="big-copy">{destination.address}</p>
          <p>{destination.note}</p>
          <Link className="primary-button" to="/call">
            需要幫手就打電話
          </Link>
        </InfoCard>
      ) : (
        <InfoCard title="找不到地點">
          <p>請返回上一頁，再揀一次。</p>
        </InfoCard>
      )}
    </AppShell>
  );
}
