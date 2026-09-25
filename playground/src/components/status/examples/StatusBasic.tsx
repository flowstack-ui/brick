import { Status } from "@flowstack-ui/brick";
export function StatusBasic() {
  return (
    <Status.Root tone="success">
      <Status.Indicator />
      Available
    </Status.Root>
  );
}
