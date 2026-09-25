import { Spinner } from "@flowstack-ui/brick";
export function SpinnerCustomColor() {
  return (
    <Spinner
      style={{ "--brick-spinner-color": "var(--brick-color-warning-solid)" }}
    />
  );
}
