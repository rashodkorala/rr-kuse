import { getEventsData } from "@/lib/queries";
import { PageShell } from "@/components/cms/page-shell";
import { CmsEventsSection } from "@/components/cms/events-section";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function asText(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function EventsPage({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getEventsData();

  return (
    <PageShell
      title="Events"
      success={asText(params.success)}
      error={asText(params.error)}
      configError={data.configError}
      dataError={data.dataError}
    >
      <CmsEventsSection
        events={data.events}
        performers={data.performers}
      />
    </PageShell>
  );
}
