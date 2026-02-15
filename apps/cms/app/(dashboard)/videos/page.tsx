import { getVideosData } from "@/lib/queries";
import { PageShell } from "@/components/cms/page-shell";
import { CmsVideosSection } from "@/components/cms/videos-section";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function asText(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function VideosPage({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getVideosData();

  return (
    <PageShell
      title="Videos"
      success={asText(params.success)}
      error={asText(params.error)}
      configError={data.configError}
      dataError={data.dataError}
    >
      <CmsVideosSection
        videos={data.videos}
        events={data.events}
        performers={data.performers}
      />
    </PageShell>
  );
}
