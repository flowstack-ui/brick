import { Badge } from "@flowstack-ui/brick";

export function SpecimenLabel({ children }: { children: string }) {
  return (
    <Badge
      className="playground-specimen-label"
      data-playground-specimen-label=""
      shape="rounded"
      size="sm"
      tone="neutral"
      variant="soft"
    >
      {children}
    </Badge>
  );
}
