import { getAnalyticsData } from "@/lib/queries";
import { PageShell } from "@/components/cms/page-shell";
import { CmsDataPreviewSection } from "@/components/cms/data-preview-section";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function asText(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function AnalyticsPage({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getAnalyticsData();

  return (
    <PageShell
      title="Analytics"
      success={asText(params.success)}
      error={asText(params.error)}
      configError={data.configError}
      dataError={data.dataError}
    >
      <CmsDataPreviewSection counts={data.counts} />
    </PageShell>
  );
}
