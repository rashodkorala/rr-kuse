import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Textarea } from "@rr-kuse/ui";
import { createSpecialOffering, upsertVenueContent } from "@/app/actions";
import { FileField, VenueTagSelect } from "./shared-fields";

export function CmsOfferingsContentSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Create Special Offering</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createSpecialOffering} className="space-y-3">
            <VenueTagSelect />
            <select
              name="offeringType"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
              defaultValue="private_events"
            >
              <option value="bus_crawl">Bus Crawl</option>
              <option value="pub_crawl">Pub Crawl</option>
              <option value="private_events">Private Events</option>
              <option value="patio">Patio</option>
            </select>
            <Input name="title" placeholder="Title" required />
            <Textarea name="description" placeholder="Description" required />
            <FileField id="offering-image-file" name="imageFile" label="Offering Image (upload)" />
            <Input name="imageUrl" placeholder="or image URL" type="url" />
            <Input name="ctaText" placeholder="CTA text" />
            <Input name="ctaLink" placeholder="CTA link" />
            <Input name="displayOrder" type="number" defaultValue={0} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isActive" defaultChecked />
              Active
            </label>
            <Button type="submit">Create Offering</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Static Content Editor</CardTitle>
          <CardDescription>Use keys like `about`, `lost_and_found_policy`, `patio_info`.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={upsertVenueContent} className="space-y-3">
            <VenueTagSelect />
            <Input name="contentKey" placeholder="content key" required />
            <Input name="label" placeholder="Label (optional)" />
            <Textarea name="content" placeholder="Content body" required />
            <Button type="submit">Save Content</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
