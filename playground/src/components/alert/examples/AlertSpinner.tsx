import { Alert, Spinner } from "@flowstack-ui/brick";
export function AlertSpinner() {
  return (
    <Alert.Root accentStart align="center">
      <Alert.Indicator>
        <Spinner size="inherit" />
      </Alert.Indicator>
      <Alert.Title>Preparing your export…</Alert.Title>
    </Alert.Root>
  );
}
