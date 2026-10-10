import { Spinner } from "@flowstack-ui/brick";
export function SpinnerTrack() {
  return (
    <Spinner
      tone="accent"
      style={{
        "--brick-spinner-track-color": "var(--brick-color-border-default)",
      }}
    />
  );
}
