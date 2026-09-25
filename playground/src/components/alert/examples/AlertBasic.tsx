import { Alert } from "@flowstack-ui/brick";
export function AlertBasic() {
  return (
    <Alert.Root>
      <Alert.Indicator />
      <Alert.Title>Your workspace is ready.</Alert.Title>
    </Alert.Root>
  );
}
