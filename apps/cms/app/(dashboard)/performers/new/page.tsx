import Link from "next/link";
import { Button, Input, Label, Textarea } from "@rr-kuse/ui";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/cms/page-shell";
import { createPerformer } from "@/app/actions";
import { FileField } from "@/components/cms/shared-fields";

export default function NewPerformerPage() {
  return (
    <PageShell title="New Performer">
      <div className="max-w-2xl space-y-6">
        <Link
          href="/performers"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Performers
        </Link>

        <form action={createPerformer} className="space-y-8">
          <div>
            <h4 className="text-sm font-medium mb-4">Basic Information</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="performer-name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="performer-name"
                  name="name"
                  placeholder="e.g., DJ Nova"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="performer-type">Type</Label>
                <select
                  id="performer-type"
                  name="performerType"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  defaultValue="dj"
                >
                  <option value="dj">DJ</option>
                  <option value="band">Band</option>
                  <option value="solo_artist">Solo Artist</option>
                </select>
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="performer-venue-tag">Venue Scope</Label>
                <select
                  id="performer-venue-tag"
                  name="venueTag"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  defaultValue="both"
                >
                  <option value="both">Both Venues</option>
                  <option value="rob_roy">Rob Roy Only</option>
                  <option value="konfusion">Konfusion Only</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  Konfusion is DJ-only. For band or solo artist, use Rob Roy only.
                </p>
              </div>
              <div className="sm:col-span-2 flex gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="isFeatured" className="rounded" />
                  Featured performer
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="isAlumni" className="rounded" />
                  Alumni
                </label>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Content</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="performer-bio">
                  Bio <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="performer-bio"
                  name="bio"
                  placeholder="Describe the performer's style, background, and what to expect..."
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="performer-genre">Genre</Label>
                <Input
                  id="performer-genre"
                  name="genre"
                  placeholder="e.g., House, Indie Rock"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Profile & Links</h4>
            <div className="space-y-4">
              <FileField
                id="performer-image-file"
                name="profileImageFile"
                label="Profile Image"
              />
              <div className="space-y-2">
                <Label htmlFor="performer-image-url">or image URL</Label>
                <Input
                  id="performer-image-url"
                  name="profileImageUrl"
                  type="url"
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="performer-instagram">Instagram handle</Label>
                <Input
                  id="performer-instagram"
                  name="instagramHandle"
                  placeholder="@username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="performer-spotify">Spotify URL</Label>
                <Input
                  id="performer-spotify"
                  name="spotifyUrl"
                  type="url"
                  placeholder="https://open.spotify.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="performer-soundcloud">SoundCloud URL</Label>
                <Input
                  id="performer-soundcloud"
                  name="soundcloudUrl"
                  type="url"
                  placeholder="https://soundcloud.com/..."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button type="submit">Create Performer</Button>
            <Link href="/performers">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
    </PageShell>
  );
}
