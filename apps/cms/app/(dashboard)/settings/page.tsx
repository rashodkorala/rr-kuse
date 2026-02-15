import { getSettingsData } from "@/lib/queries";
import { PageShell } from "@/components/cms/page-shell";
import { CmsSettingsSection } from "@/components/cms/settings-section";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function asText(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function SettingsPage({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getSettingsData();

  return (
    <PageShell
      title="Settings"
      success={asText(params.success)}
      error={asText(params.error)}
      configError={data.configError}
      dataError={data.dataError}
    >
      <CmsSettingsSection operatingHours={data.operatingHours} />
    </PageShell>
  );
}
