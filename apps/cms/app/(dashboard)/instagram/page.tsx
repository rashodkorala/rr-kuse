import { getInstagramData } from "@/lib/queries";
import { PageShell } from "@/components/cms/page-shell";
import { CmsInstagramSection } from "@/components/cms/instagram-section";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function asText(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function InstagramPage({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getInstagramData();

  return (
    <PageShell
      title="Instagram"
      success={asText(params.success)}
      error={asText(params.error)}
      configError={data.configError}
      dataError={data.dataError}
    >
      <CmsInstagramSection instagramPosts={data.instagramPosts} />
    </PageShell>
  );
}
