import { getPostsData } from "@/lib/queries";
import { PageShell } from "@/components/cms/page-shell";
import { CmsPostsSection } from "@/components/cms/posts-section";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function asText(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function PostsPage({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getPostsData();

  return (
    <PageShell
      title="Posts"
      success={asText(params.success)}
      error={asText(params.error)}
      configError={data.configError}
      dataError={data.dataError}
    >
      <CmsPostsSection posts={data.posts} />
    </PageShell>
  );
}
