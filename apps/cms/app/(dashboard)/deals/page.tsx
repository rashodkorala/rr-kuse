import { getDealsData } from "@/lib/queries";
import { PageShell } from "@/components/cms/page-shell";
import { CmsDealsSection } from "@/components/cms/deals-section";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function asText(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function DealsPage({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getDealsData();

  return (
    <PageShell
      title="Deals"
      success={asText(params.success)}
      error={asText(params.error)}
      configError={data.configError}
      dataError={data.dataError}
    >
      <CmsDealsSection deals={data.deals} />
    </PageShell>
  );
}
