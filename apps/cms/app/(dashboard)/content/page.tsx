import { getContentData } from "@/lib/queries";
import { PageShell } from "@/components/cms/page-shell";
import { CmsOfferingsContentSection } from "@/components/cms/offerings-content-section";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function asText(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function ContentPage({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getContentData();

  return (
    <PageShell
      title="Content"
      success={asText(params.success)}
      error={asText(params.error)}
      configError={data.configError}
      dataError={data.dataError}
    >
      <CmsOfferingsContentSection />
    </PageShell>
  );
}
