import { Status } from "@flowstack-ui/brick";
export function StatusResponsive() {
  return (
    <Status.Root size={{ sm: "sm", md: "lg", lg: "md" }} tone="info">
      <Status.Indicator />
      Processing
    </Status.Root>
  );
}
