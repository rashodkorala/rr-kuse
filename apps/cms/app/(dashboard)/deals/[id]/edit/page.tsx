import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, Input, Label, Textarea } from "@rr-kuse/ui";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/cms/page-shell";
import { updateDeal } from "@/app/actions";
import { FileField, VenueTagSelect } from "@/components/cms/shared-fields";
import { getDealById } from "@/lib/queries";

export default async function EditDealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deal = await getDealById(id);
  if (!deal) redirect("/deals?error=Deal+not+found.");

  const s = (v: unknown) => (typeof v === "string" ? v : "");
  const n = (v: unknown) => (typeof v === "number" && !Number.isNaN(v) ? v : 0);

  return (
    <PageShell title="Edit Deal">
      <div className="max-w-2xl space-y-6">
        <Link
          href="/deals"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Deals
        </Link>

        <form action={updateDeal} className="space-y-8">
          <input type="hidden" name="id" value={String(deal.id ?? "")} />
          <div>
            <h4 className="text-sm font-medium mb-4">Basic Information</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label className="mb-2 block">Venue</Label>
                <VenueTagSelect defaultValue={typeof deal.venueTag === "string" ? deal.venueTag : "both"} />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="deal-title">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="deal-title"
                  name="title"
                  placeholder="e.g., $5 Draft Beer Tuesdays"
                  defaultValue={s(deal.title)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deal-day">Day of week</Label>
                <select
                  id="deal-day"
                  name="dayOfWeek"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  defaultValue={s(deal.dayOfWeek)}
                >
                  <option value="">Daily</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deal-order">Display order</Label>
                <Input
                  id="deal-order"
                  name="displayOrder"
                  type="number"
                  defaultValue={n(deal.displayOrder)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deal-start">Start time</Label>
                <Input
                  id="deal-start"
                  name="startTime"
                  placeholder="e.g., 5:00 PM"
                  defaultValue={s(deal.startTime)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deal-end">End time</Label>
                <Input
                  id="deal-end"
                  name="endTime"
                  placeholder="e.g., 10:00 PM"
                  defaultValue={s(deal.endTime)}
                />
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <input
                  id="deal-active"
                  name="isActive"
                  type="checkbox"
                  defaultChecked={deal.isActive !== false && deal.isActive !== 0 && deal.isActive !== ""}
                  className="rounded"
                />
                <Label htmlFor="deal-active" className="font-normal cursor-pointer">
                  Active deal
                </Label>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Content</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deal-description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="deal-description"
                  name="description"
                  placeholder="Describe the deal, what's included..."
                  rows={4}
                  defaultValue={s(deal.description)}
                  required
                />
              </div>
              <FileField id="deal-image-file" name="imageFile" label="Deal Image" />
              <div className="space-y-2">
                <Label htmlFor="deal-image-url">or image URL</Label>
                <Input
                  id="deal-image-url"
                  name="imageUrl"
                  type="url"
                  placeholder="https://..."
                  defaultValue={s(deal.imageUrl)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button type="submit">Update Deal</Button>
            <Link href="/deals">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
    </PageShell>
  );
}
