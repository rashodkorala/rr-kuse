import { getPerformersData } from "@/lib/queries";
import { PageShell } from "@/components/cms/page-shell";
import { CmsPerformersSection } from "@/components/cms/performers-section";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function asText(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function PerformersPage({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getPerformersData();

  return (
    <PageShell
      title="Performers"
      success={asText(params.success)}
      error={asText(params.error)}
      configError={data.configError}
      dataError={data.dataError}
    >
      <CmsPerformersSection performers={data.performers} />
    </PageShell>
  );
}
