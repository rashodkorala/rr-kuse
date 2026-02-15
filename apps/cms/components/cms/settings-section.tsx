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
import { VenueTagSelect } from "./shared-fields";

export function CmsSettingsSection({
  operatingHours,
}: {
  operatingHours: Record<string, unknown>[];
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
              {operatingHours.map((row) => {
                const id = String(row.id ?? "");
                const dayOfWeek = typeof row.dayOfWeek === "string" ? row.dayOfWeek : "";
                const openTime = typeof row.openTime === "string" ? row.openTime : null;
                const closeTime = typeof row.closeTime === "string" ? row.closeTime : null;
                const isClosed = row.isClosed === true;
                return (
                  <TableRow key={id}>
                    <TableCell className="font-medium">{dayOfWeek}</TableCell>
                    <TableCell>{openTime ?? "-"}</TableCell>
                    <TableCell>{closeTime ?? "-"}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {isClosed ? "Closed" : "Open"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}
