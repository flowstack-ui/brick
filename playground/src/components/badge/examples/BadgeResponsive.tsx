import { Badge } from "@flowstack-ui/brick";
export function BadgeResponsive() {
  return (
    <Badge
      size={{ sm: "xs", md: "sm", lg: "lg", xl: "md" }}
      variant={{ sm: "solid", md: "outline", lg: "plain", xl: "soft" }}
      tone="accent"
    >
      Responsive
    </Badge>
  );
}
