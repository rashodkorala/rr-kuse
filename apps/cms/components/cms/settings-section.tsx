import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@rr-kuse/ui";
import { createOperatingHour } from "@/app/actions";
import type { operatingHours } from "@/lib/db/schema";
import { VenueTagSelect } from "./shared-fields";

type HoursRow = typeof operatingHours.$inferSelect;

export function CmsSettingsSection({
  operatingHours,
}: {
  operatingHours: HoursRow[];
}) {
  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Set Operating Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createOperatingHour} className="space-y-3">
            <VenueTagSelect />
            <Input name="dayOfWeek" placeholder="Day of week" required />
            <Input name="openTime" placeholder="Open time" />
            <Input name="closeTime" placeholder="Close time" />
            <Input name="displayOrder" type="number" defaultValue={0} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isClosed" />
              Closed
            </label>
            <Button type="submit">Save Operating Hours</Button>
          </form>
        </CardContent>
      </Card>

      {operatingHours.length > 0 && (
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Open</TableHead>
                <TableHead>Close</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operatingHours.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.dayOfWeek}</TableCell>
                  <TableCell>{row.openTime ?? "-"}</TableCell>
                  <TableCell>{row.closeTime ?? "-"}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.isClosed ? "Closed" : "Open"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}
