import { getGalleryData } from "@/lib/queries";
import { PageShell } from "@/components/cms/page-shell";
import { CmsGallerySection } from "@/components/cms/gallery-section";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function asText(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function GalleryPage({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getGalleryData();

  return (
    <PageShell
      title="Gallery"
      success={asText(params.success)}
      error={asText(params.error)}
      configError={data.configError}
      dataError={data.dataError}
    >
      <CmsGallerySection
        galleryImages={data.galleryImages}
        events={data.events}
      />
    </PageShell>
  );
}
