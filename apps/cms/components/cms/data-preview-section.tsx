import { BarChart3 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@rr-kuse/ui";

type Counts = {
  events: number;
  deals: number;
  gallery: number;
  videos: number;
  posts: number;
  operatingHours: number;
  specialOfferings: number;
  venueContent: number;
} | null;

export function CmsDataPreviewSection({ counts }: { counts: Counts }) {
  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Data Overview</h3>
        <p className="text-sm text-muted-foreground">Content counts by section</p>
      </div>
      {counts ? (
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Section</TableHead>
                <TableHead>Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>Events</TableCell><TableCell>{counts.events}</TableCell></TableRow>
              <TableRow><TableCell>Deals</TableCell><TableCell>{counts.deals}</TableCell></TableRow>
              <TableRow><TableCell>Gallery</TableCell><TableCell>{counts.gallery}</TableCell></TableRow>
              <TableRow><TableCell>Videos</TableCell><TableCell>{counts.videos}</TableCell></TableRow>
              <TableRow><TableCell>Posts</TableCell><TableCell>{counts.posts}</TableCell></TableRow>
              <TableRow><TableCell>Operating Hours</TableCell><TableCell>{counts.operatingHours}</TableCell></TableRow>
              <TableRow><TableCell>Special Offerings</TableCell><TableCell>{counts.specialOfferings}</TableCell></TableRow>
              <TableRow><TableCell>Static Content</TableCell><TableCell>{counts.venueContent}</TableCell></TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No data available.</p>
      )}
    </section>
  );
}
