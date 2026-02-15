import { Input, Label } from "@rr-kuse/ui";

export function VenueTagSelect({
  name = "venueTag",
  defaultValue = "both",
}: {
  name?: string;
  defaultValue?: string;
}) {
  return (
    <select
      name={name}
      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
      defaultValue={defaultValue}
    >
      <option value="both">Both Venues</option>
      <option value="rob_roy">Rob Roy</option>
      <option value="konfusion">Konfusion</option>
    </select>
  );
}

export function FileField({
  id,
  name,
  label,
}: {
  id: string;
  name: string;
  label: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} type="file" accept="image/*" />
    </div>
  );
}
