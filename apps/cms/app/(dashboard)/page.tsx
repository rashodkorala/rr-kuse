import { getDashboardOverview } from "@/lib/queries";
import { PageShell } from "@/components/cms/page-shell";
import { CmsOverviewSection } from "@/components/cms/overview-section";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function asText(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function DashboardPage({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getDashboardOverview();

  return (
    <PageShell
      title="Dashboard"
      success={asText(params.success)}
      error={asText(params.error)}
      configError={data.configError}
      dataError={data.dataError}
    >
      <CmsOverviewSection counts={data.counts} />
    </PageShell>
  );
}
