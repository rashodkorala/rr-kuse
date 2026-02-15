import Link from "next/link";
import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@rr-kuse/ui";
import { Plus, RefreshCw, Wine } from "lucide-react";
import { deleteDeal } from "@/app/actions";
import { RowActions } from "./row-actions";

export function CmsDealsSection({
  deals,
}: {
  deals: Record<string, unknown>[];
}) {
  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-2xl font-semibold">{deals.length}</p>
        <p className="text-sm text-muted-foreground">Total Deals</p>
      </div>

      <div>
        <h3 className="text-lg font-medium">All Deals</h3>
        <p className="text-sm text-muted-foreground">Manage drink deals</p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-1.5 h-4 w-4" />
          Refresh
        </Button>
        <Link href="/deals/new">
          <Button size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            New Deal
          </Button>
        </Link>
      </div>

      {deals.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
          <Wine className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm font-medium">No deals yet</p>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Get started by adding your first drink deal.
          </p>
          <Link href="/deals/new">
            <Button size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Add Deal
            </Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((deal) => {
                const id = String(deal.id ?? "");
                const title = typeof deal.title === "string" ? deal.title : "";
                const description = typeof deal.description === "string" ? deal.description : null;
                const isActive = deal.isActive === true || (deal.isActive !== false && deal.isActive !== 0);
                return (
                  <TableRow key={id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Wine className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <p className="font-medium">{title}</p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[280px] truncate text-muted-foreground">
                      {description ?? "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={isActive ? "default" : "secondary"}>
                        {isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <RowActions
                        type="deal"
                        editHref={`/deals/${id}/edit`}
                        deleteAction={deleteDeal}
                        id={id}
                        previewData={{
                          title,
                          description: description ?? "",
                          dayOfWeek: typeof deal.dayOfWeek === "string" ? deal.dayOfWeek : null,
                          imageUrl: typeof deal.imageUrl === "string" ? deal.imageUrl : null,
                        }}
                      />
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
